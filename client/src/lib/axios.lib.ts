import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC__API_URL || "http://localhost:9000",
  withCredentials: true,
});

export const api = instance;