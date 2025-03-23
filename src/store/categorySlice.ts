import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Category = {
  id: string;
  name: string;
  color: string;
};

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://my-todo-api.glitch.me/" }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    fetchCategories: builder.query<Category[], void>({
      query: () => "categories",
      providesTags: ["Categories"],
    }),
  }),
});

export const { useFetchCategoriesQuery } = categoryApi;