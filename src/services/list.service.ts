/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AxiosResponse } from "axios";
import apiSetting from "./api";

const getListFromUser = async (id?: number) => {
  const respone: AxiosResponse = await apiSetting.get(`user/${id}`);
  return respone.data;
};
const getId = async (id: number) => {
  const respone: AxiosResponse = await apiSetting.get(`day/${id}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return respone.data;
};
const updateDateTime = async (
  id: number,
  body: { date: string; isLate: boolean; detail: string }
) => {
  try {
    const respone: AxiosResponse = await apiSetting.put(`day/${id}`, body);
    return respone.data;
  } catch (error) {
    error;
  }
};
const createDateTime = async (body: {
  date: string;
  isLate: boolean;
  detail: string;
  userId: number;
}) => {
  try {
    const respone: AxiosResponse = await apiSetting.post(`day`, body);
    return respone.data;
  } catch (error) {
    error;
  }
};
const deleteDay = async (id: number) => {
  try {
    const respone: AxiosResponse = await apiSetting.delete(`day/${id}`);
    return respone.data;
  } catch (error) {
    error;
  }
};
const ListService = {
  getListFromUser,
  getId,
  updateDateTime,
  deleteDay,
  createDateTime,
};

export default ListService;
