import { AxiosResponse } from "axios";
import apiSetting from "./api";

const getUserInfo = async (id?: number) => {
  const respone: AxiosResponse = await apiSetting.get(`user/${id}`);
  return respone.data;
};
const updateUser = async (
  id?: number,
  body?: {
    username: string;
    password: string;
    avatar: string;
    avatarName: string;
  }
) => {
  const respone: AxiosResponse = await apiSetting.put(`user/${id}`, body);
  return respone.data;
};

const UserService = {
  getUserInfo,
  updateUser,
};

export default UserService;
