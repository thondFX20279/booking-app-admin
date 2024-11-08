import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://booking-app-server-ze5e.onrender.com/api",
  timeout: 10000,
  withCredentials: true,
});

export default axiosClient;
