import axiosInstance from "../config/apiConfig";
import type { AxiosRequestConfig } from "axios";

export const apiService = {
  get: async <T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.get<T>(url, {
      params,
      ...config,
    });
    return res.data;
  },

  post: async <T, D = unknown>(
    url: string,
    body?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.post<T>(url, body, config);
    return res.data;
  },

  put: async <T, D = unknown>(
    url: string,
    body?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.put<T>(url, body, config);
    return res.data;
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.delete<T>(url, config);
    return res.data;
  },
};