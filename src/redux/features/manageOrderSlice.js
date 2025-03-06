import baseApi from "../api/baseApi";

export const manageOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    

    allManageOrders: builder.query({
      query: () => ({
        url: "/admin/order",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    shipOrder: builder.mutation({
        query: (orderId) => ({
          url: `/admin/order/${orderId}/shipped`,
          method: 'POST',
        }),
      }),
    

  }),
});

export const { useAllManageOrdersQuery ,useShipOrderMutation} = manageOrderApi;
