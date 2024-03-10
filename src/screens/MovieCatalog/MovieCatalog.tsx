/**
 * @fileoverview MovieCatalog component displays a catalog of movies.
 * It fetches movie data using a lazy query, displays loading indicator
 * while fetching data, and renders either the list of movies or a
 * "Not Found" component based on the fetched data.
 */
import { ActivityIndicator } from 'react-native';
import { useCallback, useEffect } from 'react';

import { useLazyGetMoviesQuery } from '~/api/slices/movieSlice';
import { MovieList } from '~/components';
import { NotFound } from '~/components/common';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { addMovies } from '~/store/slices/MovieSlice';
import { ApplicationScreenProps } from '~/types/navigation';

/**
 * MovieCatalog component
 * @param {ApplicationScreenProps} navigation - Navigation props.
 * @returns {JSX.Element} - Rendered component.
 */
const MovieCatalog = ({ navigation }: ApplicationScreenProps): JSX.Element => {
  const [getMovies, { isLoading }] = useLazyGetMoviesQuery();
  const { movieList, movieListPage } = useAppSelector(state => state.movie);
  const dispatch = useAppDispatch();

  /**
   * Callback function to navigate to MovieDetails screen.
   * @param {string} id - ID of the selected movie.
   */
  const onSelectMovie = (id: string) => {
    navigation.navigate('MovieDetails', { id });
  };

  const fetchMovieList = useCallback(async () => {
    // Fetching next page of movies
    const result = await getMovies(movieListPage + 1);
    if (result?.data?.results) {
      // Adding fetched movies to Redux store
      dispatch(addMovies(result.data?.results));
    }
  }, [dispatch, getMovies, movieListPage]);

  // Fetching movie list on component mount
  useEffect(() => {
    fetchMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rendering loading indicator while fetching data
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return movieList && movieList.length > 0 ? (
    <MovieList
      data={movieList}
      onSelectMovie={onSelectMovie}
      fetchMoreMovies={fetchMovieList}
      isLoading
    />
  ) : (
    <NotFound />
  );
};

export default MovieCatalog;
