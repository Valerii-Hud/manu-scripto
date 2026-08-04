import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, HttpMethod, type ApiData, type Endpoint } from '../api/api';
import type { IUser } from '../types/interfaces';

interface UseAuthProps {
  data?: ApiData | undefined;
  endpoint: 'signup' | 'login' | 'logout';
}

const useAuth = () => {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(['authUser']) as IUser;
  const {
    mutate: auth,
    error: authenticationError,
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
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });
  return {
    auth,
    isAuthentication,
    authenticationError,
    isAuthenticationError,
    authUser,
  };
};

export default useAuth;
