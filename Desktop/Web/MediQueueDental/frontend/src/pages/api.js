import axios from "axios";

const API = axios.create({
  // Replace with your actual backend URL
  baseURL: "https://mediqueue-5q7s.onrender.com/api", 
});

// Optional: Add an interceptor to automatically add the token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;