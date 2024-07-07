import axios from 'axios';
import store from '../store'; 

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
