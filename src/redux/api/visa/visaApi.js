import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const visa = createApi({
  reducerPath: "visaAPI",
  baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_BASE_URL}),

  endpoints: (builder) => ({
    createVisa: builder.mutation({
      query: (visaData) => {
        return {
          url: `/visa`,
          method: "POST",
          body: visaData,
        };
      },
    }),

    getAllVisa: builder.query({
      query: ({page, limit}) => `/visa?page=${page}&limit=${limit}`,
    }),

    getSingleVisa: builder.query({
      query: (id) => `/visa/${id}`,
    }),

    updateVisa: builder.mutation({
      query: (visaData) => {
        return {
          url: `/visa/${visaData._id}`,
          method: "PATCH",
          body: visaData,
        };
      },
    }),

    deleteVisa: builder.mutation({
      query: (id) => {
        return {
          url: `/visa/${id}`,
          method: "DELETE",
        };
      },
    }),

  }),
});


export const {
  useGetAllVisaQuery,
  useGetSingleVisaQuery,
  useLazyGetSingleVisaQuery,
  useCreateVisaMutation,
  useUpdateVisaMutation,
  useDeleteVisaMutation

} = visa;
