/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AxiosResponse } from "axios";
import apiSetting from "./api";

const getList = async (param?: string) => {
  const respone: AxiosResponse = await apiSetting.get(`day`, {
    params: param,
  });
  return respone.data;
};
const getId = async (id: number) => {
  const respone: AxiosResponse = await apiSetting.get(`day/${id}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return respone.data;
};
const updateDateTime = async (
  id: number,
  body: { date: string; isLate: number; detail: string }
) => {
  try {
    const respone: AxiosResponse = await apiSetting.put(
      `day/${id}`,
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
      `day/create`,
      body
    );
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
  getList,
  getId,
  updateDateTime,
  deleteDay,
  createDateTime,
};

export default ListService;
