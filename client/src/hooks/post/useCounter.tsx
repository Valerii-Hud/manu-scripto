import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, HttpMethod } from '../../api/api';
import type { Id, IPost, IUser } from '../../types/interfaces';
import { useState } from 'react';

const useCounter = ({ post }: { post: IPost }) => {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData<IUser>(['authUser']);
  const [isUpdated, setIsUpdated] = useState(false);

  interface UpdateCounterProps {
    postId: Id;
    updateType: string;
  }

  function generateApiRequest(updateType: string) {
    switch (updateType) {
      case 'likes':
        return { type: 'like' };
      case 'saves':
        return { type: 'save' };
      case 'dislike':
        return { type: 'dislike' };
    }
  }

  const { mutate: updateCounter, isPending: isUpdatingCounter } = useMutation({
    mutationFn: async ({ postId, updateType }: UpdateCounterProps) => {
      const apiRequestData = generateApiRequest(updateType);

      if (!apiRequestData) return;

      return await api({
        data: {
          type: apiRequestData.type,
        },
        method: HttpMethod.PUT,
        endpoint: `/api/v1/posts/counter/${postId}`,
      });
    },
    // TODO: refactor it
    onSuccess: ({
      postUpdatedCounter,
      postId,
    }: {
      postUpdatedCounter: string[];
      postId: string;
    }) => {
      if (isUpdatingCounter) {
        authUser?.likedPosts.filter((postId) => postId !== post._id);
        setIsUpdated(false);
      } else {
        authUser?.likedPosts.push(postId);
        setIsUpdated(true);
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
  return { updateCounter, isUpdatingCounter, isUpdated, setIsUpdated };
};
export default useCounter;
