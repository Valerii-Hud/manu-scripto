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

export const api = async (
  method: HttpMethod = HttpMethod.POST,
  endpoint: string,
  data?: ApiData
) => {
  try {
    const res = await axiosInstance[method](endpoint, data).catch((error) => {
      if (error?.response) {
        toast.error(error.response.data.error);
      }
    });
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.error);
    }
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};
