import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { extendedMovieQuery } from '~/api/slices/movieSlice';
import { IMovieListItem } from '~/types/movie';

interface MovieState {
  searchQuery: string | null;
  movieList: IMovieListItem[] | null;
  movieListPage: number;
}

const initialState: MovieState = {
  searchQuery: null,
  movieList: null,
  movieListPage: 0,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.movieListPage = 0;
    },
    addMovies(state, action: PayloadAction<IMovieListItem[]>) {
      state.movieList = [...(state.movieList ?? []), ...action.payload];
      state.movieListPage += 1;
    },
    setMovies(state, action: PayloadAction<IMovieListItem[]>) {
      if (state.movieListPage === 0) {
        state.movieList = [...action.payload];
      } else {
        state.movieList = [...(state.movieList ?? []), ...action.payload];
      }
      state.movieListPage += 1;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      extendedMovieQuery.endpoints.getMovies.matchFulfilled,
      (state, action) => {
        const addMoviesAction: PayloadAction<IMovieListItem[]> = {
          ...action,
          payload: action.payload.results,
        };
        if (state.movieListPage === 0) {
          movieSlice.caseReducers.setMovies(state, addMoviesAction);
        } else {
          movieSlice.caseReducers.addMovies(state, addMoviesAction);
        }
      },
    );
    builder.addMatcher(
      extendedMovieQuery.endpoints.searchMovies.matchFulfilled,
      (state, action) => {
        const setMovieAction: PayloadAction<IMovieListItem[]> = {
          ...action,
          payload: action.payload.results,
        };
        movieSlice.caseReducers.setMovies(state, setMovieAction);
      },
    );
  },
});

export const { setSearchQuery, addMovies } = movieSlice.actions;
