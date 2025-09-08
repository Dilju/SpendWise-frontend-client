import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3050";

export const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
