import axios from 'axios';

export interface HttpClient {
  get<T>(url: string): Promise<T>;
}

export const defaultHttpClient = (): HttpClient => {
  const axiosInstance = axios.create();

  return {
    get: async <T>(url: string): Promise<T> => {
      const response = await axiosInstance.get(url);

      if (response.status !== 200 || !response.data) {
        // better handle error
        throw new Error('Invalid response from service');
      }

      return response.data;
    },
  };
};
