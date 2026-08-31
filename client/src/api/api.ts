import { axiosInstance } from '../lib/axios';
import { HttpMethod, type Api } from '../types/interfaces';

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
