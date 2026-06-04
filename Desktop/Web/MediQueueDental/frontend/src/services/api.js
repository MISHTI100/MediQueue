import axios from "axios";

const API = axios.create({
  baseURL: "https://mediqueue-5q7s.onrender.com/api"
});

export default API;