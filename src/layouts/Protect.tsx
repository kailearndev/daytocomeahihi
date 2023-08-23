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
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const token = Cookies.get("_TOKEN");
  
  useEffect(() => {
    const handleVerifyToken = async () => {
      const res = await AuthService.tokenVerify(token);
      if (res) {
        setIsLogged(true);
        Cookies.set('UserInfo', JSON.stringify(res))
      }
    };
    handleVerifyToken();
    
    
  }),
    [];

  return token && isLogged ? (
    <>{children}</>
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

export default Protect;
