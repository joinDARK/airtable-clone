import axios from "axios";
import type { AxiosError } from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;
const token = localStorage.getItem("jwt");

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "1",
    Authorization: `Bearer ${token}`,
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
  getByOrderId: (orderId: number) =>
    axiosInstance.get(`/files/order/${orderId}`),
  uploadMultiple: (formData: FormData) =>
    axiosInstance.post(`/files/upload-multiple`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "1",
      },
    }),
  deleteById: (fileId: string) => axiosInstance.delete(`/files/id/${fileId}`),
  updateById: (fileId: string, data: { originalname: string }) =>
    axiosInstance.put(`/files/${fileId}`, data),
  getAll: () => axiosInstance.get("/files"),
};
