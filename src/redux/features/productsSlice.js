import baseApi from "../api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProductGet: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useAllTransactionGetQuery, useAllProductGetQuery } = productsApi;
