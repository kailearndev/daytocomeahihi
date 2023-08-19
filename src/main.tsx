import ReactDOM from "react-dom/client";

import LayoutApp from "./layouts/LayoutApp";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
