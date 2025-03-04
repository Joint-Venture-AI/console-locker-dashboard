import baseApi from "../api/baseApi";

export const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    postBlog: builder.mutation({
      query: (blog) => ({
        url: "/admin/blog/create",
        method: "POST",
        body: blog,
        formData: true,
      }),
      invalidatesTags: ["Blogs"],
    }),

    getAllBlogs: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),

    singleBlogs: builder.query({
      query: (slug) => ({
        url: `/blogs/${slug}`,
        method: "GET",
      }),
      providesTags: ["Blogs"],
    })

  }),
});

export const {  usePostBlogMutation, useGetAllBlogsQuery , useSingleBlogsQuery} = blogsApi;
