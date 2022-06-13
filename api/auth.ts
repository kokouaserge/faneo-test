import axios from "../utils/axios";

export const fetchUserLogged = () =>
  axios.get(`/api/account/personal`).then(({ data }: any) => data);

export const logginUser = (params: object) =>
  axios.post(`/api/account/login`, params).then(({ data }: any) => data);

export const registerUser = (params: object) =>
  axios.post(`/api/account/register`, params).then(({ data }: any) => data);
