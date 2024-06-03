import axios from 'axios';
import { BASE_URL } from '../constants/url';

const instance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.log(error);
  },
);

export default instance;
