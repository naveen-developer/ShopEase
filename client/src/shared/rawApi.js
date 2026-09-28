import axios from "axios";

const rawApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default rawApi;
