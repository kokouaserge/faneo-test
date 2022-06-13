import axios from "../utils/axios";

export const fetchPosts = () =>
  axios.get(`/api/account/personal`).then(({ data }: any) => data);

export const savePosts = (params: object) =>
  axios.post(`/api/account/personal`, params).then(({ data }: any) => data);
