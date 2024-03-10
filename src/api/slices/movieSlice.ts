import config from '../../config';
import { IFetchMoviesResponse, IMovieListItem } from '../../types/movie';
import {
  IFetchMovieDetailsResponse,
  IMovieData,
} from '../../types/movieDetails';
import baseApi from '../baseApi';

export const extendedMovieQuery = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMovies: builder.query<IFetchMoviesResponse, number>({
      query: (page = 1) => `discover/movie?page=${page}`,
      transformResponse: (response: IFetchMoviesResponse) => ({
        ...response,
        results: response.results.map((movie: IMovieListItem) => ({
          ...movie,
          poster_path: `${config.IMAGE_API_ENDPOINT}w500${movie.poster_path}`,
          backdrop_path: `${config.IMAGE_API_ENDPOINT}w500${movie.backdrop_path}`,
        })),
      }),
    }),
    getMovieDetails: builder.query<IMovieData, number>({
      query: movieId =>
        `movie/${movieId}?language=en-US&append_to_response=credits`,
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
