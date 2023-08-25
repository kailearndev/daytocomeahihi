import axios, { AxiosError, AxiosProxyConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
const url = import.meta.env.VITE_API;
const apiSetting = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

apiSetting.interceptors.request.use(
  function (config) {
    if (Cookies.get("_TOKEN")) {
      config.headers["Authorization"] = "Bearer " + Cookies.get("_TOKEN");
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
apiSetting.interceptors.response.use(
  (response: AxiosResponse) => {
    // Process the response data if needed
    return response;
  },
  (error: AxiosError) => {
    // Handle response errors

    return Promise.reject(error.response?.data);
  }
);

export default apiSetting;
