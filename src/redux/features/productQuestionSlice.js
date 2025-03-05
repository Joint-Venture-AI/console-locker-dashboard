// import baseApi from "../api/baseApi";

// export const productQuestionApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     productQuestionPost: builder.mutation({
//       query: (question) => ({
//         url: "/admin/question/buy/create",
//         method: "POST",
//         body: question,
//         formData: true,
//       }),
//       invalidatesTags: ["Question"],
//     }),
//   }),
// });

// export const { useProductQuestionPostMutation } = productQuestionApi;

import baseApi from "../api/baseApi";

export const productQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productQuestionPost: builder.mutation({
      query: (formData) => ({
        url: "/admin/question/buy/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Question"],
    }),

    productQuestionDelete: builder.mutation({
      query: (_id) => ({
        url: `/admin/question/buy/${_id}/delete`,
        // /admin/question/buy/679da9839879d96e943f4937/delete
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),

    sellProductGet: builder.query({
      query: () => ({
        url: "/sell/products",
        method: "GET",
      }),
      providesTags: ["Question"],
    }),

    productQuestionEdit: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/question/buy/${id}/edit`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Question"],
    }),

    sellProductSingle: builder.query({
      query: (id) => ({
        url: `/sell/products/${id}`,
        // /sell/products/67bdf1bac5d443f48472fa1f
        method: "GET",
      }),
      providesTags: ["Question"],
    })

  }),
});

export const {
  useProductQuestionPostMutation,
  useProductQuestionDeleteMutation,
  useSellProductGetQuery, 
  useSellProductSingleQuery,
  useProductQuestionEditMutation
} = productQuestionApi;
