/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AxiosResponse } from "axios";
import apiSetting from "./api";

const getList = async (param?: string) => {
  const respone: AxiosResponse = await apiSetting.get(`daytocome`, {
    params: param,
  });
  return respone.data;
};
const getId = async (id: number) => {
  const respone: AxiosResponse = await apiSetting.get(`daytocome/${id}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return respone.data;
};
const updateDateTime = async (
  id: number,
  body: { date: string; isLate: number; detail: string }
) => {
  try {
    const respone: AxiosResponse = await apiSetting.put(
      `daytocome/${id}`,
      body
    );
    return respone.data;
  } catch (error) {
    error;
  }
};
const createDateTime = async (
 
  body: { date: string; isLate: number; detail: string }
) => {
  try {
    const respone: AxiosResponse = await apiSetting.post(
      `daytocome/create`,
      body
    );
    return respone.data;
  } catch (error) {
    error;
  }
};
const deleteDay = async (id: number) => {
  try {
    const respone: AxiosResponse = await apiSetting.delete(`daytocome/${id}`);
    return respone.data;
  } catch (error: any) {
    error;
  }
};
const ListService = {
  getList,
  getId,
  updateDateTime,
  deleteDay,
  createDateTime,
};

export default ListService;
