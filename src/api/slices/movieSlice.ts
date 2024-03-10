/**
 * @fileoverview API queries for fetching movie data from TMdb server.
 * The image urls from server have only the id, so they are transformed
 * and image path is prepended to the keys
 * so they can be used directly in the UI elements
 */
import config from '~/config';
import { IFetchMoviesResponse, IMovieListItem } from '~/types/movie';
import { IFetchMovieDetailsResponse, IMovieData } from '~/types/movieDetails';
import baseApi from '../baseApi';

export const extendedMovieQuery = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Endpoint to fetch a list of movies.
     * @type {function}
     */
    getMovies: builder.query<IFetchMoviesResponse, number>({
      query: (page = 1) => `discover/movie?page=${page}`,
      /**
       * Transform function to process the response data.
       * @param {IFetchMoviesResponse} response - response with movie data.
       * @returns {IFetchMoviesResponse} - Returns transformed response object.
       */
      transformResponse: (response: IFetchMoviesResponse) => ({
        ...response,
        results: response.results.map((movie: IMovieListItem) => ({
          ...movie,
          poster_path: `${config.IMAGE_API_ENDPOINT}w500${movie.poster_path}`,
          backdrop_path: `${config.IMAGE_API_ENDPOINT}w500${movie.backdrop_path}`,
        })),
      }),
    }),
    /**
     * Endpoint to fetch movie details.
     * @type {function}
     */
    getMovieDetails: builder.query<IMovieData, number>({
      query: movieId =>
        `movie/${movieId}?language=en-US&append_to_response=credits`,
      /**
       * Transform function to process the response data.
       * @param {IFetchMovieDetailsResponse} response - response with
       * movie details.
       * @returns {IMovieData} - Returns transformed movie details object.
       * Here the images of cast members are also transformed and Image
       * endpoint is prepended
       */
      transformResponse: (response: IFetchMovieDetailsResponse) => ({
        ...response,
        poster_path: `${config.IMAGE_API_ENDPOINT}w500${response.poster_path}`,
        backdrop_path: `${config.IMAGE_API_ENDPOINT}w500${response.backdrop_path}`,
        casts: response.credits.cast.map((cast: any) => ({
          ...cast,
          ...(cast.profile_path && {
            profile_path: `${config.IMAGE_API_ENDPOINT}w500${cast.profile_path}`,
          }),
        })),
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useLazyGetMoviesQuery,
  useGetMovieDetailsQuery,
  useLazyGetMovieDetailsQuery,
} = extendedMovieQuery;
