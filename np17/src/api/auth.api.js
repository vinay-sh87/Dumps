import tokenService from "../services/token.service";
import axiosInstance from "./axios";

const login = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  if (response.data.token) {
    tokenService.set(response.data.token);
  }
};

const logout = async () => {
  await axiosInstance.post("/auth/logout");
  tokenService.clear();
};

const register = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response;
};

const refreshToken = async () => {
  const response = await axiosInstance.post("/auth/refresh");
  if (response.data.token) {
    tokenService.set(response.data.token);
  }
};

export default {
  login,
  logout,
  register,
  refreshToken,
};
