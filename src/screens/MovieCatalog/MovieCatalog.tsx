/**
 * @fileoverview MovieCatalog component displays a catalog of movies.
 * It fetches movie data using a lazy query, displays loading indicator
 * while fetching data, and renders either the list of movies or a
 * "Not Found" component based on the fetched data.
 */
import { ActivityIndicator } from 'react-native';
import { useEffect, useMemo } from 'react';

import {
  useLazyGetMoviesQuery,
  useLazySearchMoviesQuery,
} from '~/api/slices/movieSlice';
import { MovieList } from '~/components';
import { NotFound } from '~/components/common';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setSearchQuery } from '~/store/slices/movieSlice';
import { ApplicationScreenProps } from '~/types/navigation';
import debounce from '~/utils/debounce';

/**
 * MovieCatalog component
 * @param {ApplicationScreenProps} navigation - Navigation props.
 * @returns {JSX.Element} - Rendered component.
 */
const MovieCatalog = ({ navigation }: ApplicationScreenProps): JSX.Element => {
  const [getMovies, { isLoading }] = useLazyGetMoviesQuery();
  const [getSearchedMovie] = useLazySearchMoviesQuery();
  const { movieList, movieListPage, searchQuery } = useAppSelector(
    state => state.movie,
  );
  const dispatch = useAppDispatch();
  const debouncedSearch = useMemo(
    () =>
      debounce(
        (query: string) => getSearchedMovie({ searchTerm: query, page: 1 }),
        400,
      ),
    [getSearchedMovie],
  );

  /**
   * Callback function to navigate to MovieDetails screen.
   * @param {string} id - ID of the selected movie.
   */
  const onSelectMovie = (id: string) => {
    navigation.navigate('MovieDetails', { id });
  };

  const onSearchMovie = (query: string) => {
    dispatch(setSearchQuery(query));
    if (query) {
      debouncedSearch(query);
    } else {
      getMovies(movieListPage + 1);
    }
  };

  const fetchMovieList = async () => {
    // Fetching next page of movies
    if (searchQuery) {
      getSearchedMovie({ searchTerm: searchQuery, page: movieListPage + 1 });
    } else {
      getMovies(movieListPage + 1);
    }
  };

  // Fetching movie list on component mount
  useEffect(() => {
    if (!searchQuery) {
      if (!movieListPage) {
        fetchMovieList();
      }
    } else {
      getSearchedMovie({ searchTerm: searchQuery, page: movieListPage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rendering loading indicator while fetching data
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return movieList && movieList.length > 0 ? (
    <MovieList
      data={movieList}
      fetchMoreMovies={fetchMovieList}
      isLoading
      onSearchMovie={onSearchMovie}
      onSelectMovie={onSelectMovie}
    />
  ) : (
    <NotFound />
  );
};

export default MovieCatalog;
