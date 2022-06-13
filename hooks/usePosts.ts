/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchPosts, savePosts } from "../api/posts";

export const usePosts = () => {
  return useQuery(["getPosts"], () => fetchPosts());
};

export const createPost = () => {
  const queryClient = useQueryClient();
  return useMutation(savePosts, {
    onSuccess: async (data) => {
      await queryClient.cancelQueries("getPosts");
      return queryClient.invalidateQueries(["getPosts"]);
    },
    onError: async (data, variables, context) => {},
  });
};
