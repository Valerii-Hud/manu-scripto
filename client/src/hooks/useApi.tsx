import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, HttpMethod, type ApiData, type Endpoint } from '../api/api';

interface IRequest {
  endpoint: string;
  searchString?: string;
  data?: ApiData;
  invalidateQueries?: string[];
}

interface IGenerateApiRequest {
  method?: HttpMethod;
  endpoint: Endpoint;
  successMessage?: string;
  errorMessage?: string;
  showError?: boolean;
  queryKey?: string[];
  invalidateQueries?: string[];
}

function generateApiRequest({
  endpoint,
  searchString,
}: IRequest): IGenerateApiRequest {
  const { POST, PUT, DELETE } = HttpMethod;
  const BASE_URL = '/api/v1';

  switch (endpoint) {
    case 'getUserProfile':
      return {
        queryKey: [String(searchString), 'profile'],

        endpoint: `${BASE_URL}/users/profile/${searchString}`,
      };
    case 'getSuggestedUsers':
      return {
        queryKey: ['suggestedUsers'],

        endpoint: `${BASE_URL}/users/suggested`,
      };
    case 'getMyPoints':
      return {
        queryKey: ['myPoints'],

        endpoint: `${BASE_URL}/users/points/`,
      };
    case 'followUnfollowUser':
      return {
        method: POST,
        endpoint: `${BASE_URL}/users/follow/${searchString}`,
      };
    case 'changePointsByUserId':
      return {
        method: PUT,
        endpoint: `${BASE_URL}/users/points/${searchString}`,
      };
    case 'getAllVerifiedUsers':
      return {
        queryKey: ['allVerifiedUsers'],

        endpoint: `${BASE_URL}/verify/all`,
      };
    case 'verifyUnverifyUser':
      return {
        method: POST,
        endpoint: `${BASE_URL}/verify/${searchString}`,
      };
    case 'updateUser':
      return {
        method: PUT,
        endpoint: `${BASE_URL}/users/update`,
      };
    case 'changeUserType':
      return {
        method: PUT,
        endpoint: `${BASE_URL}/users/type/${searchString}`,
      };
    case 'getAllReports':
      return {
        queryKey: ['allReports'],

        endpoint: `${BASE_URL}/reports/all`,
      };
    case 'getUserReports':
      return {
        queryKey: [String(searchString), 'reports'],

        endpoint: `${BASE_URL}/reports/${searchString}`,
      };
    case 'sendReport':
      return {
        method: POST,
        endpoint: `${BASE_URL}/reports/${searchString}`,
      };
    case 'getNotifications':
      return {
        queryKey: ['notifications'],

        endpoint: `${BASE_URL}/notifications/all`,
      };
    case 'deleteNotifications':
      return {
        method: DELETE,
        endpoint: `${BASE_URL}/notifications/all`,
      };
    case 'deleteNotificationById':
      return {
        method: DELETE,
        endpoint: `${BASE_URL}/notifications/${searchString}`,
      };
    case 'checkAuth':
      return {
        queryKey: ['authUser'],

        endpoint: `${BASE_URL}/auth/check-auth`,
      };
    case 'signup':
      return {
        method: POST,
        endpoint: `${BASE_URL}/auth/signup`,
      };
    case 'login':
      return {
        method: POST,
        endpoint: `${BASE_URL}/auth/login`,
      };
    case 'logout':
      return {
        method: POST,
        endpoint: `${BASE_URL}/auth/logout`,
      };
    case 'getAllPosts':
      return {
        queryKey: ['allPosts'],

        endpoint: `${BASE_URL}/posts/all`,
      };
    case 'getLikedPosts':
      return {
        queryKey: ['likedPosts'],

        endpoint: `${BASE_URL}/posts/likes/${searchString}`,
      };
    case 'getFollowingPosts':
      return {
        queryKey: ['followingPosts'],

        endpoint: `${BASE_URL}/posts/following`,
      };
    case 'getUserPosts':
      return {
        queryKey: [String(searchString), 'posts'],

        endpoint: `${BASE_URL}/posts/user/${searchString}`,
      };
    case 'createPost':
      return {
        method: POST,
        endpoint: `${BASE_URL}/posts/create`,
      };
    case 'commentOnPost':
      return {
        method: POST,
        endpoint: `${BASE_URL}/posts/comment/${searchString}`,
        invalidateQueries: ['allPosts'],
      };
    case 'changePostCounter':
      return {
        method: PUT,
        endpoint: `${BASE_URL}/posts/counter/${searchString}`,
      };
    case 'deleteComment':
      return {
        method: DELETE,
        endpoint: `${BASE_URL}/posts/${searchString}`,
        successMessage: 'Post deleted successfully',
        invalidateQueries: ['allPosts'],
      };
    default:
      return {
        queryKey: ['authUser'],
        endpoint: `${BASE_URL}/auth/check-auth`,
      };
  }
}

const useApiQuery = ({ endpoint, searchString }: IRequest) => {
  const apiRequestData = generateApiRequest({ endpoint, searchString });
  const { data, isLoading } = useQuery({
    queryKey: [...(apiRequestData.queryKey || 'unknown')],
    queryFn: async () => {
      const { GET } = HttpMethod;
      return api({
        method: GET,
        endpoint: apiRequestData.endpoint,
      });
    },
  });
  return { data, isLoading };
};

const useApiMutation = ({
  endpoint,
  searchString,
  data,
  invalidateQueries,
}: IRequest) => {
  const apiRequestData = generateApiRequest({ endpoint, searchString });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api({
        data: data || undefined,
        method: apiRequestData?.method,
        endpoint: apiRequestData?.endpoint,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...(invalidateQueries || 'unknown')],
      });
    },
  });
  return { mutate, isPending };
};

export { useApiQuery, useApiMutation };
