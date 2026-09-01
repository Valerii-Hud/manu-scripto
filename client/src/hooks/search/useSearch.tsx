import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpMethod } from '../../types/interfaces';
import { api } from '../../api/api';

interface UseSearchProps {
  data: {
    searchString: string;
  };
}

const useSearch = () => {
  const queryClient = useQueryClient();
  const { mutate: search, isPending: isSearching } = useMutation({
    mutationFn: async ({ data }: UseSearchProps) => {
      const res = await api({
        data: data || undefined,
        method: HttpMethod.POST,
        endpoint: '/api/v1/search',
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchResults'] });
    },
  });
  return { search, isSearching };
};

export default useSearch;
