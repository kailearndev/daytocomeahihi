import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { UserReponse } from "../types/login.interface";

interface PrivateProps {
  children: ReactNode;
  // isLogged: boolean
}

const Protect: FC<PrivateProps> = (props) => {
  const [isLogged, setIsLogged] = useState<UserReponse>()
  const { children } = props;
  const token = localStorage.getItem("_TOKEN");
  return (token) ? <>{children}</> : <Navigate to={"/login"} replace={true} />;
};

export default Protect;
