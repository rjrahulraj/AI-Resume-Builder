import axios from "axios";
const BACKENED_URL = import.meta.env.VITE_BACKENED_URL;

const axiosInstance = axios.create({
  baseURL: BACKENED_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      } else if (error.response.status === 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
