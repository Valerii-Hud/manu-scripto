import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, HttpMethod } from '../api/api';
import useGetData from './useFetch';

const useNotification = (
  { notificationId }: { notificationId?: string } = { notificationId: 'all' }
) => {
  const queryClient = useQueryClient();
  const { data: notifications, isLoading: isFetching } = useGetData({
    queryKey: 'notifications',
  });

  const { mutate: deleteNotification, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api({
        endpoint: `/api/v1/notifications/${notificationId}`,
        method: HttpMethod.DELETE,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
  const deleteNotifications = () => {
    deleteNotification();
  };
  return { notifications, isFetching, deleteNotifications, isDeleting };
};

export default useNotification;
