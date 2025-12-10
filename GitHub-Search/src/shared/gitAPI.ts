import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../types/RepoType";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
  endpoints: (builder) => ({
    searchRepos: builder.query<ApiResponse, string>({
      query: (search) => `search/repositories?q=${search}`,
    }),
  }),
});

export const { useSearchReposQuery } = githubApi;
