import axios, { AxiosError, AxiosResponse } from "axios";
const api = "https://kailearndev.io.vn/";
const apiSetting = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
    Accept: "*",
  },
});
// const getErrorMessageApi = () => {
//   const
//   return (

//   )
// }
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

    return Promise.reject(error.response?.data);
  }
);

export default apiSetting;
