import axios from "../utils/axios";

export const fetchUsers = () =>
  axios.get(`/api/account/personal`).then(({ data }: any) => data);
