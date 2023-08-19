import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import ErrorPage from "../layouts/Error";
import LayoutApp from "../layouts/LayoutApp";
import Protect from "../layouts/Protect";
import Information from "../pages/Information";

const router = createBrowserRouter([
  {
    element: (
      <Protect>
        <LayoutApp />
      </Protect>
    ),
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
       
        element: <Information />,
      },
    ],
  },
  {
    
    element: <Login />,
    
    path: "/login",
  },
]);

export default router;
