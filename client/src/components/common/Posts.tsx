import Post from './Post';
import PostSkeleton from '../skeletons/PostSkeleton';
import { useQuery } from '@tanstack/react-query';
import { api, type Endpoint } from '../../api/api';
import type { IPost } from '../../types/interfaces';
import { useEffect } from 'react';

export type FeedType = 'following' | 'all';

interface PostsProps {
  feedType: FeedType;
}

const Posts = ({ feedType }: PostsProps) => {
  // const getPostEndpoint = () => {
  //   switch (feedType) {
  //     case 'all':
  //       return '/api/v1/posts/all';
  //     case 'following':
  //       return '/api/v1/posts/following';
  //   }
  // };

  const POSTS_ENDPOINT: Endpoint = `/api/v1/posts/${feedType}`;

  const {
    data: posts,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      return await api({ endpoint: POSTS_ENDPOINT, showError: false });
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch]);

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
