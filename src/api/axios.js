import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15-second timeout for graceful network error detection
});

// Automatically attach JWT token to protected API requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor for token expiry on protected routes
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If an existing session token has expired on a protected endpoint
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("/auth/")
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default api;
