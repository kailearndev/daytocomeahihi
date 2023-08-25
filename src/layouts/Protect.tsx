import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
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
  const token = Cookies.get("_TOKEN");

  return token ? <>{children}</> : <Navigate to={"/login"} replace={true} />;
};

export default Protect;
