import React, { FC, ReactNode, useEffect, useState } from "react";
import Login from "../auth/Login";
import SidebarApp from "./LayoutApp";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Layout from "./LayoutApp";
import LayoutApp from "./LayoutApp";
import apiSetting from "../services/api";
import AuthService from "../services/auth.service";
import { tokenRespone } from "../types/login.interface";
import { useSelector } from "react-redux";
import { getToken } from "../redux/Login/login.slice";

interface PrivateProps {
  children: ReactNode;
  // isLogged: boolean
}

const Protect: FC<PrivateProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const gotoLogin = () => navigate("/login");
  const token = localStorage.getItem("_TOKEN");
  useEffect(() => {
    if (!token) gotoLogin();
  }, [token]);

  return <>{children}</>;
};

export default Protect;
