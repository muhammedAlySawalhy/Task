import axios from "../auth/authaxios";

const API_URL = "api/users";
const getUsers = async () => {
  const response = await axios.get(`${API_URL}/get/users`);

  return response.data;
};
// frontend/src/features/user/userService.js
const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/get/user/${userId}`);
  return response.data;
};
const getDoctors = async () => {
  const response = await axios.get(`${API_URL}/get/doctors`);
  return response.data;
};
const editUserRole = async (user, role) => {
  const response = await axios.put(`${API_URL}/edit/user/${user._id}`, {
    role,
  });
  return response.data;
};
export { getUsers, getDoctors, editUserRole, getUserById };
