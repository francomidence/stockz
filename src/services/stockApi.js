import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://www.alphavantage.co/';
const apiKey = process.env.API_KEY;

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
          `query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=${timePeriod}&apikey=${apiKey}`
        ),
    }),
    getSearchEndpoint: builder.query({
      query: (searchTerm) =>
        createRequest(
          `query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${apiKey}`
        ),
    }),
  }),
});

export const { useGetIntradayQuery, useGetSearchEndpointQuery } = stockApi;
