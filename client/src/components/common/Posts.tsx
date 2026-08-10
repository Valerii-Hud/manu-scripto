import Post from './Post';
import PostSkeleton from '../skeletons/PostSkeleton';
import { useQuery } from '@tanstack/react-query';
import { api, type Endpoint } from '../../api/api';
import type { IPost } from '../../types/interfaces';
import { useEffect } from 'react';

export type FeedType = 'following' | 'all' | 'likes' | 'posts';

interface PostsProps {
  feedType?: FeedType;
  userName?: string;
}

const Posts = ({ feedType, userName }: PostsProps) => {
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

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!(isLoading || isRefetching) && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!(isLoading || isRefetching) && isError && (
        <p className="text-center my-4">Something went wrong </p>
      )}
      {!(isLoading || isRefetching || isError) && posts && (
        <div>
          {posts.map((post: IPost) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
