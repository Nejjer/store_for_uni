import axios from 'axios';
import { appStore } from './components/WithStore/WithStore';

export const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error) {
      appStore.snackbarStore.showSnackBar('Что-то пошло не так😞');
      return Promise.reject(error);
    }
  }
);
