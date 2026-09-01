import { useMutation, useQueryClient } from '@tanstack/react-query';
import useFetch from '../fetch/useFetch';
import { HttpMethod } from '../../types/interfaces';
import { api } from '../../api/api';

const useNotification = () => {
  const queryClient = useQueryClient();
  const { data: notifications, isLoading: isFetching } = useFetch({
    queryKey: 'notifications',
  });

  const { mutate: deleteNotification, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api({
        endpoint: `/api/v1/notifications/all`,
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
