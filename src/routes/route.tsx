import Cookies from "js-cookie";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import UserInfo from "../auth/UserInfo";
import ErrorPage from "../layouts/Error";
import LayoutApp from "../layouts/LayoutApp";
import Protect from "../layouts/Protect";
import Information from "../pages/Information";
import User from "../pages/User";

const ProtectApp = () => {
  const token = Cookies.get("_TOKEN");

  return token ? (
    <>
      <LayoutApp />
      <UserInfo />
    </>
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

const router = createBrowserRouter([
  {
    element: <ProtectApp />,
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <Information />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },
  {
    element: <Login />,

    path: "/login",
  },
]);

export default router;
