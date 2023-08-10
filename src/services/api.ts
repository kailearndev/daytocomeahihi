import axios, { AxiosError, AxiosResponse } from "../../node_modules/axios/index";

const api = "https://be.kailearndev.io.vn/api/";
const apiSetting = axios.create({
  
  baseURL: api,
  // timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*",

  },
});




// // Add a response interceptor
// apiSetting.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // Modify the request config if needed
//     // For example, you can add headers or perform authentication
//     return config;
//   },
//   (error: AxiosError) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

// Response interceptor
apiSetting.interceptors.response.use(
  (response: AxiosResponse) => {
    // Process the response data if needed
    return response;
  },
  (error: AxiosError) => {
    // Handle response errors
    return Promise.reject(error);
  }
);


export default apiSetting;
