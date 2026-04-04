import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ============================
// 🔹 REQUEST INTERCEPTOR
// ============================
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ============================
// 🔹 RESPONSE INTERCEPTOR
// ============================
let isRefreshing = false;
let queue: {
  resolve: () => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error?: unknown) => {
  queue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  queue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: () => resolve(axiosInstance(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refresh");

        processQueue();

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err);

        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ============================
// 🔥 GENERIC API LAYER
// ============================
export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await axiosInstance.get<T>(url, config);
    return res.data;
  },

  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.post<T>(url, data, config);
    return res.data;
  },

  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.put<T>(url, data, config);
    return res.data;
  },

  patch: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.patch<T>(url, data, config);
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

export default axiosInstance;