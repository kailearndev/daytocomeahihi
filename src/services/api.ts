import axios, { AxiosError, AxiosResponse } from "axios";

const api =
  "http://ec2-54-251-181-115.ap-southeast-1.compute.amazonaws.com:4900/api/";
const apiSetting = axios.create({
  baseURL: api,
  // timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
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
