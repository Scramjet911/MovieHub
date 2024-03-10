import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMovieListItem } from '../../types/movie';

interface MovieState {
  selectedMovie: IMovieListItem | null;
  searchQuery: string | null;
  movieList: IMovieListItem[] | null;
  movieListPage: number;
}

const initialState: MovieState = {
  selectedMovie: null,
  searchQuery: null,
  movieList: null,
  movieListPage: 0,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    selectMovie(state, action: PayloadAction<IMovieListItem>) {
      state.selectedMovie = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    addMovies(state, action: PayloadAction<IMovieListItem[]>) {
      if (!state.movieList) {
        state.movieList = [];
      }
      state.movieList = [...state.movieList, ...action.payload];
      state.movieListPage += 1;
    },
  },
});

export const { selectMovie, setSearchQuery, addMovies } = movieSlice.actions;
export default movieSlice.reducer;
