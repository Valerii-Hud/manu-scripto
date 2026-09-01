import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  HttpMethod,
  type ApiData,
  type Endpoint,
  type IUser,
} from '../../types/interfaces';
import { api } from '../../api/api';

export interface UseAuthProps {
  data?: ApiData;
  endpoint: 'signup' | 'login' | 'logout' | 'check';
}

const useAuth = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as IUser;

  const {
    mutate: auth,
    isPending: isAuthentication,
    isError: isAuthenticationError,
  } = useMutation({
    mutationFn: async ({ data, endpoint }: UseAuthProps) => {
      const httpEndpoint: Endpoint = `/api/v1/auth/${endpoint}`;

      const res = await api({
        data: data || undefined,
        method: HttpMethod.POST,
        endpoint: httpEndpoint,
      });

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  return {
    auth,
    isAuthentication,
    isAuthenticationError,
    user,
  };
};

export default useAuth;
