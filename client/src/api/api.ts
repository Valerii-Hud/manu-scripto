import { axiosInstance } from '../lib/axios';
// import { AxiosError } from 'axios';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface SignupData {
  email: string;
  userName: string;
  password: string;
  // fullName: string;
  // phoneNumber: string;
  // confirmPassword: string;
}

export interface LoginData {
  userName: string;
  password: string;
}

export interface CreatePostData {
  image?: string;
  text?: string;
  isHidden?: boolean;
}

export interface PostCounterTypeData {
  type: string;
}

export interface PostCommentData {
  isHidden: boolean;
  text: string;
}

export interface ProfileUpdateData {
  coverImage?: string;
  profileImage?: string;
  fullName?: string;
  username?: string;
  email?: string;
  bio?: string;
  link?: string;
  newPassword?: string;
  currentPassword?: string;
}

export type ApiData =
  | SignupData
  | LoginData
  | CreatePostData
  | PostCounterTypeData
  | ProfileUpdateData
  | PostCommentData;

type StaticEndpoint =
  | '/api/v1/auth/signup'
  | '/api/v1/auth/login'
  | '/api/v1/auth/logout'
  | '/api/v1/auth/check'
  | '/api/v1/users/suggested';

type DynamicEndpoint =
  | `/api/v1/users/${string}`
  | `/api/v1/verify/${string}`
  | `/api/v1/reports/${string}`
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
  // successMessage,
  // errorMessage,
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

    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
