import axios, { AxiosInstance, AxiosError } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: "http://localhost:3000", // Replace with your backend URL
  baseURL: "https://jwt-authentication-app-be-1.onrender.com", // Replace with your backend URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export axios instance and isAxiosError
export const isAxiosError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error);

export default axiosInstance;
