import axios from "axios";
import type { AxiosError } from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "1",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

export default {
  getAll: () => axiosInstance.get("/history"),
  getByName: (name: string) => axiosInstance.get(`/history/user/${name}`),
  deleteAll: () => axiosInstance.delete(`/history/all`),
  deleteByName: (name: string) => axiosInstance.delete(`/history/user/${name}`),
  deleteById: (id: number) => axiosInstance.delete(`/history/id/${id}`),
};
