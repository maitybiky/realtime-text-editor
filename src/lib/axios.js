import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true, // ✅ Ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Optional: If API requires manual token handling)
API.interceptors.request.use(
  (config) => {
    return config; // Cookies will be sent automatically, no need to manually attach token
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handle API errors globally)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
