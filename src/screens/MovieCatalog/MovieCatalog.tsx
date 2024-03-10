import { ActivityIndicator } from 'react-native';
import { useCallback, useEffect } from 'react';

import { useLazyGetMoviesQuery } from '../../api/slices/movieSlice';
import MovieList from '../../components/MovieList/MovieList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addMovies } from '../../store/slices/MovieSlice';
import { ApplicationScreenProps } from '../../types/navigation';
import NotFound from '../NotFound/NotFound';

const MovieCatalog = ({ navigation }: ApplicationScreenProps) => {
  const [getMovies, { isLoading }] = useLazyGetMoviesQuery();
  const { movieList, movieListPage } = useAppSelector(state => state.movie);
  const dispatch = useAppDispatch();

  const onSelectMovie = (id: string) => {
    navigation.navigate('MovieDetails', { id });
  };

  const fetchMovieList = useCallback(async () => {
    const result = await getMovies(movieListPage + 1);
    if (result?.data?.results) {
      dispatch(addMovies(result.data?.results));
    }
  }, [dispatch, getMovies, movieListPage]);

  useEffect(() => {
    fetchMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
