
import apiClient from "./axiosClient";

export const login = (credentials) =>
  apiClient.post("/api/auth/login", credentials).then((res) => res.data);


export const signup = (payload) =>
  apiClient.post("/api/auth/register", payload).then((res) => res.data);

export const fetchCurrentUser = () =>
  apiClient.get("/api/user/me").then((res) => res.data);

