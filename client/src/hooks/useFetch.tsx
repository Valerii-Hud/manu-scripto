import { useQuery } from '@tanstack/react-query';
import { api, type Api } from '../api/api';

function getEndpoint(queryKey: string) {
  switch (queryKey) {
    case 'notifications':
      return '/api/v1/notifications/all';
    case 'authUser':
      return '/api/v1/auth/check';
    default:
      return '/api/v1/auth/check';
  }
}

interface UseFetch {
  queryKey: string;
  successMessage?: string;
  errorMessage?: string;
  showError?: boolean;
}

const useFetch = ({
  queryKey,
  successMessage,
  errorMessage,
  showError,
}: UseFetch) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const ENDPOINT = getEndpoint(queryKey);
      const DATA: Api = {
        endpoint: ENDPOINT,
        successMessage: successMessage || undefined,
        errorMessage: errorMessage || undefined,
        showError: showError || undefined,
      };

      const res = await api(DATA);

      if (!res) return null;
      return res;
    },
  });

  return { data, isLoading };
};

export default useFetch;
