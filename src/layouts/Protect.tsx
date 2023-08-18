import React, { FC, useEffect, useState } from "react";
import Login from "../auth/Login";
import SidebarApp from "./LayoutApp";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "./LayoutApp";
import LayoutApp from "./LayoutApp";
import apiSetting from "../services/api";
import AuthService from "../services/auth.service";
import { tokenRespone } from "../types/login.interface";

interface PrivateProps {
  children: React.ReactNode;
  // isLogged: boolean
}

const Protect: FC<PrivateProps> = (props) => {
  const { children } = props;

  return <>{children}</>;
};

export default Protect;
