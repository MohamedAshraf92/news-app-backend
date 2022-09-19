import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

export default axiosInstance;
