import axios from "./publicAxios";

const API_URL = "api/users";

export const extractUserData = (data) => {
  return {
    _id: data._doc._id,
    name: data._doc.name,
    email: data._doc.email,
    role: data._doc.role,
    token: data.token,
  };
};
const register = async (user) => {
  const response = await axios.post(API_URL, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return extractUserData(response.data);
};

const logout = async () => {
  localStorage.removeItem("user");
};

const login = async (user) => {
  const response = await axios.post(`${API_URL}/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return extractUserData(response.data);
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
