import baseApi from "../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBuyProductGet: builder.query({
      query: () => ({
        url: "/admin/buy",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const {  useAllBuyProductGetQuery} = transactionApi;
