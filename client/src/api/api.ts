import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { AxiosError } from 'axios';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface SignupData {
  email: string;
  userName: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
}

export interface LoginData {
  userName: string;
  password: string;
}

export interface CreatePostData {
  image?: string;
  text?: string;
}

export interface PostCounterTypeData {
  type: 'like' | 'dislike' | 'save';
}

export interface PostCommentData {
  isHidden: boolean;
  text: string;
}

export type ApiData =
  | SignupData
  | LoginData
  | CreatePostData
  | PostCounterTypeData
  | PostCommentData;
type StaticEndpoint =
  | '/api/v1/auth/signup'
  | '/api/v1/auth/login'
  | '/api/v1/auth/logout'
  | '/api/v1/auth/check-auth'
  | '/api/v1/users/suggested'
  | '/api/v1/posts/following'
  | '/api/v1/posts/all';

type DynamicEndpoint =
  | `/api/v1/users/follow/${string}`
  | `/api/v1/posts/${string}`
  | `/api/v1/notifications/${string}`;

export type Endpoint = StaticEndpoint | DynamicEndpoint;
export interface Api {
  endpoint: Endpoint;
  method?: HttpMethod;
  data?: ApiData;
  successMessage?: string;
  errorMessage?: string;
  showError?: boolean;
}
export const api = async ({
  method = HttpMethod.GET,
  endpoint,
  successMessage,
  errorMessage,
  showError = true,
  data,
}: Api) => {
  try {
    const res = await axiosInstance[method](endpoint, data).catch((error) => {
      console.log({ error });
      if (error?.response && showError) {
        throw new Error(error.response.data.error);
      }
    });
    if (successMessage) {
      toast.success(successMessage || 'OK');
    }

    return res?.data;
  } catch (error) {
    if (error instanceof AxiosError && showError) {
      toast.error(error.response?.data.error || errorMessage);
    }
    if (error instanceof Error && showError) {
      toast.error(error.message || 'Something went wrong');
    }
  }
};
