import { Row, Col } from "antd";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import DataList from "./pages/Information";
import router from "./routes/route";

function App() {
  return <RouterProvider router={router} />;
}
export default App;
