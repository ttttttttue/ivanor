import axios from "axios";
import Toast from "vue-toastification";
import { API_URL, TOKEN } from "../config";

const baseInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Token: TOKEN,
  },
});

const handleError = (error) => {
  const message = error.response?.data?.message || "Произошла ошибка";
  Toast.error(`Ошибка: ${message}`);
  console.error("Ошибка API:", error);
  throw error;
};

export const getOrders = async (params) => {
  try {
    const response = await baseInstance.get("/orders", { params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getOrderByOrderNumber = async (orderNumber) => {
  try {
    const response = await baseInstance.get(`/order/${orderNumber}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
