import axios from "axios";
// import rawApi from "../lib/rawApi"; // adjust path to match your folder structure
import { useAuthContext } from "../auth/context/AuthProvider";
import rawApi from "./rawApi";

export default function useApi() {
  const authContext = useAuthContext();

  const api = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    if (authContext.accessToken) {
      config.headers.Authorization = `Bearer ${authContext.accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const res = await rawApi.post("/auth/refresh");

          authContext.setAccessToken(res.data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          authContext.setAccessToken(null);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
