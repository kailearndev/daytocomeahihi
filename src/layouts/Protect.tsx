import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { UserReponse } from "../types/login.interface";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getUserInfo, isLogged } from "../redux/Login/login.slice";
import { useSelector } from "react-redux";

interface PrivateProps {
  children: ReactNode;
  // isLogged: boolean
}

const Protect: FC<PrivateProps> = (props) => {
  const { children } = props;
  const logged = useSelector(isLogged)
  const token = Cookies.get("_TOKEN");
  const userName = Cookies.get("user");
  const dispatch = useDispatch();
  if (userName) {
    dispatch(getUserInfo(JSON.parse(userName)));
  }
  return (token)  ? <>{children}</> : <Navigate to={"/login"} replace={true} />;
};

export default Protect;
