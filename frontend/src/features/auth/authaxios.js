import axios from "axios";

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");

    const token = JSON.parse(user).token;
    if (token) {

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authAxios;
