import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/Login/login.slice";
import AuthService from "../services/auth.service";
import ListService from "../services/list.service";
import { UserInfoReponse } from "../types/login.interface";

const UserInfo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleVerifyToken = async () => {
      const res: UserInfoReponse = await AuthService.tokenVerify(
        Cookies.get("_Token")
      );
      dispatch(getUser(res));
    };
    handleVerifyToken();
  }, []);
  return <></>;
};
export default UserInfo;
