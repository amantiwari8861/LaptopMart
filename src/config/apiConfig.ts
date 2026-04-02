import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🔥 REQUIRED for cookies
});

// 👉 Request Interceptor (CLEAN)
axiosInstance.interceptors.request.use(
  (config) => {
    // ❌ No token handling here
    // Cookies are automatically sent by browser
    return config;
  },
  (error) => Promise.reject(error)
);

// 👉 Response Interceptor (AUTO REFRESH 🔥)
let isRefreshing = false;
let queue: any[] = [];

const processQueue = (error: any) => {
  queue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  queue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔥 Handle expired access token
    if (error.response?.status === 401 && !originalRequest._retry) {

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
        // 👉 Call refresh endpoint (cookie sent automatically)
        await axiosInstance.post("/auth/refresh");

        processQueue(null);

        // 🔁 Retry original request
        return axiosInstance(originalRequest);

      } catch (err) {
        processQueue(err);

        // 🔥 Logout flow
        window.location.href = "/login";
        return Promise.reject(err);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;