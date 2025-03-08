import baseApi from "../api/baseApi";

export const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    createReview: builder.mutation({
      query: (name) => ({
        url: "/admin/reviews/create",
        method: "POST",
        body: name,
        formData: true,
      }),
      invalidatesTags: ["Review"],
    }),

    

    singleReviewGet: builder.query({
      query: ({ name }) => ({
          method: "GET",
          url: `/reviews/${name}`
      }),
      providesTags: ["Review"],
    }),

    // updateReview: builder.mutation({
    //     query: (review, id) => ({
    //       url: `/admin/reviews/${id}/edit`,
    //     //   /admin/reviews/67c58ecc850db03e67ebb64b/edit
    //       method: "PATCH",
    //       body: review,
    //     }),
    //     invalidatesTags: ["Review"],
    //   }),

    updateReview: builder.mutation({
        query: ({ id, review }) => ({
          url: `/admin/reviews/${id}/edit`,
          method: "PATCH",
          body: review,
        }),
        invalidatesTags: ["Review"],
      }),
    

  }),
});

export const { useCreateReviewMutation, useSingleReviewGetQuery, useUpdateReviewMutation} = ReviewApi;
