import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true, // Enables sending cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Example: Using token for authentication
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
