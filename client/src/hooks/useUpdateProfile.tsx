import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, HttpMethod, type ApiData } from '../api/api';

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUserProfile, isPending: isUpdatingUserProfile } =
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
