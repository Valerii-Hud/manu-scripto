import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpMethod, type ApiData } from '../../types/interfaces';
import { api } from '../../api/api';

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateUserProfile, isPending: isUpdatingUserProfile } =
    useMutation({
      mutationFn: async (data: ApiData) => {
        return await api({
          data,
          successMessage: 'Profile Updated Successfully',
          method: HttpMethod.PUT,
          endpoint: '/api/v1/users/update',
        });
      },
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ['authUser'] }),
          queryClient.invalidateQueries({ queryKey: ['user'] }),
        ]);
      },
    });
  return { updateUserProfile, isUpdatingUserProfile };
};

export default useUpdateProfile;
