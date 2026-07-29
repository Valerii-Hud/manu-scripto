import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { AxiosError } from 'axios';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
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

type ApiData = SignupData | LoginData;
type StaticEndpoint =
  | '/api/v1/auth/signup'
  | '/api/v1/auth/login'
  | '/api/v1/auth/logout'
  | '/api/v1/auth/check-auth'
  | '/api/v1/users/suggested';

type DynamicEndpoint = `/api/v1/posts/likes/:userId`;

type Endpoint = StaticEndpoint | DynamicEndpoint;
interface Api {
  endpoint: Endpoint;
  method?: HttpMethod;
  data?: ApiData;
  showError?: boolean;
}
export const api = async ({
  method = HttpMethod.GET,
  endpoint,
  showError = true,
  data,
}: Api) => {
  try {
    const res = await axiosInstance[method](endpoint, data).catch((error) => {
      if (error?.response && showError) {
        toast.error(error.response.data.error);
      }
    });
    return res;
  } catch (error) {
    if (error instanceof AxiosError && showError) {
      toast.error(error.response?.data.error);
    }
    if (error instanceof Error && showError) {
      toast.error(error.message);
    }
  }
};
