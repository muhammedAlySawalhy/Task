import axios from "axios";

// Create an instance for non-authenticated requests
const publicAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default publicAxios;
