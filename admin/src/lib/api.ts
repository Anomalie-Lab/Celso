import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000",
});

instance.interceptors.request.use((config) => {
  if (config.url?.startsWith('/admin')) {
    const adminToken = btoa(import.meta.env.VITE_ADMIN_CREDENTIALS!);
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  return config;
});

export default instance;