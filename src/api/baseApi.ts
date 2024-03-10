/**
 * @fileoverview baseApi module creates an API instance using
 * createApi from @reduxjs/toolkit/query/react. It configures
 * a base query for fetching data from a given API endpoint
 * with required authorization headers.
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import config from '~/config';

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.FETCH_API_ENDPOINT}/`,
  // Setting authorization header
  prepareHeaders(headers) {
    headers.set('Authorization', `Bearer ${config.ACCESS_TOKEN}` || '');
    return headers;
  },
});

// Creating API instance using createApi
const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['MovieList', 'MovieDetails'],
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
});

export default baseApi;
