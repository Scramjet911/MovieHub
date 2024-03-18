/**
 * @fileoverview baseApi module creates an API instance using
 * createApi from @reduxjs/toolkit/query/react. It configures
 * a base query for fetching data from a given API endpoint
 * with required authorization headers.
 */
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react';

import config from '~/config';

const baseQueryWithRetries = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: `${config.FETCH_API_ENDPOINT}/`,
      // Setting authorization header
      prepareHeaders(headers) {
        headers.set('Authorization', `Bearer ${config.ACCESS_TOKEN}` || '');
        return headers;
      },
    })(args, api, extraOptions);

    // bail out of re-tries immediately if unauthorized,
    // because we know successive re-retries would be redundant
    if (result.error?.status === 401) {
      retry.fail(result.error);
    }

    return result;
  },
  { maxRetries: 3 },
);

// Creating API instance using createApi
const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetries,
  endpoints: () => ({}),
  tagTypes: ['MovieList', 'MovieDetails', 'SearchMovie'],
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
});

export default baseApi;
