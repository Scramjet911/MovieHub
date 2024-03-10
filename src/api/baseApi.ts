import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import config from '../config';

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.FETCH_API_ENDPOINT}/`,
  prepareHeaders(headers) {
    headers.set('Authorization', `Bearer ${config.ACCESS_TOKEN}` || '');
    return headers;
  },
});

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['MovieList', 'MovieDetails'],
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
});

export default baseApi;
