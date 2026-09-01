import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpMethod } from '../../types/interfaces';
import { api } from '../../api/api';

const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: follow, isPending: isFollowing } = useMutation({
    mutationFn: async (userId: string) => {
      return await api({
        method: HttpMethod.POST,
        endpoint: `/api/v1/users/follow/${userId}`,
      });
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['authUser'] }),
        queryClient.invalidateQueries({ queryKey: ['user'] }),
        queryClient.invalidateQueries({ queryKey: ['users'] }),
        queryClient.invalidateQueries({ queryKey: ['suggestedUsers'] }),
      ]);
    },
  });
  return { follow, isFollowing };
};

export default useFollow;
