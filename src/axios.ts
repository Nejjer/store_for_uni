import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
