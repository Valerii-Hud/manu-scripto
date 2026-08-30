POST:

const [comment, setComment] = useState('');
const [isHidden, setIsHidden] = useState(false);
const postOwner = post.user;
const queryClient = useQueryClient();
const authUser = queryClient.getQueryData(['authUser']) as IUser;
const { mutate: deletePost, isPending: isDeleting } = useMutation({
mutationFn: async (postId: string) => {
return await api({
method: HttpMethod.DELETE,
endpoint: `/api/v1/posts/${postId}`,
successMessage: 'Post deleted successfully',
});
},
onSuccess: async () => {
queryClient.invalidateQueries({ queryKey: ['posts'] });
},
});
const { mutate: commentPost, isPending: isCommenting } = useMutation({
mutationFn: async (postId: string) => {
return await api({
data: {
isHidden,
text: comment,
},
method: HttpMethod.POST,
endpoint: `/api/v1/posts/comment/${postId}`,
});
},
onSuccess: () => {
setComment('');
setIsHidden(false);
queryClient.invalidateQueries({ queryKey: ['posts'] }); // TODO: optimize it
},
});

const [isLiked, setIsLiked] = useState(
authUser.likedPosts.includes(post._id)
);
const isMyPost = authUser?._id === post.user?._id;
const { mutate: likePost, isPending: isLiking } = useMutation({
mutationFn: async (postId: Id) => {
return await api({
data: {
type: 'like',
},
method: HttpMethod.PUT,
endpoint: `/api/v1/posts/counter/${postId}`,
});
},
onSuccess: ({
postUpdatedCounter,
postId,
}: {
postUpdatedCounter: string[];
postId: string;
}) => {
if (isLiked) {
authUser.likedPosts.filter((postId) => postId !== post._id);
setIsLiked(false);
} else {
authUser.likedPosts.push(postId);
setIsLiked(true);
}
queryClient.setQueryData(['posts'], (oldData: IPost[]) => {
return oldData.map((p: IPost) => {
if (p._id === post._id)
return {
...p,
likes: postUpdatedCounter,
};
return p;
});
});
},
});
const formattedDate = formatPostDate(post.createdAt);
const handleDeletePost = () => {
deletePost(post._id);
};
const handlePostComment = (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();
if (isCommenting) return;
commentPost(post._id);
};
const handleLikePost = () => {
if (isLiking) return;
likePost(post._id);
};

POSTS:

const POSTS_ENDPOINT: Endpoint =
feedType !== 'likes' && feedType !== 'posts'
? `/api/v1/posts/${feedType}`
: feedType === 'likes'
? `/api/v1/posts/likes/${userName}`
: `/api/v1/posts/user/${userName}`;
const {
data: posts,
isLoading,
isError,
refetch,
isRefetching,
} = useQuery({
queryKey: ['posts', feedType, userName],
queryFn: async () => {
return await api({
endpoint: POSTS_ENDPOINT,
showError: false,
});
},
});

useEffect(() => {
refetch();
}, [feedType, refetch, userName]);

const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
if (!e.target || !e.target.files)
return { error: 'Please Provide Any Files' };

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

};
