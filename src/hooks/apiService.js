import axiosInstance from "../config/apiConfig";

export const apiService = {
  get: async (url, params = {}) => {
    const res = await axiosInstance.get(url, { params });
    return res.data;
  },

  post: async (url, body = {}) => {
    const res = await axiosInstance.post(url, body);
    return res.data;
  },

  put: async (url, body = {}) => {
    const res = await axiosInstance.put(url, body);
    return res.data;
  },

  delete: async (url) => {
    const res = await axiosInstance.delete(url);
    return res.data;
  },
};