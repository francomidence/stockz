import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://www.alphavantage.co/';

const createRequest = (url) => ({
  url,
});

export const stockApi = createApi({
  reducerPath: 'stockApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getIntraday: builder.query({
      query: (timePeriod) =>
        createRequest(
          `query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=${timePeriod}&apikey=QL2SV9CZ9HQWGP3W`
        ),
    }),
  }),
});

export const { useGetIntradayQuery } = stockApi;
