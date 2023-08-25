import Cookies from "js-cookie";
import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import ErrorPage from "../layouts/Error";
import LayoutApp from "../layouts/LayoutApp";
import Protect from "../layouts/Protect";
import Information from "../pages/Information";
import User from "../pages/User";

const ProtectApp = () => {
  return (
    <Protect>
      <LayoutApp />
    </Protect>
  );
};

const router = createBrowserRouter([
  {
    element: <ProtectApp />,
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
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
