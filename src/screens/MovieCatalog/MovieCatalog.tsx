import MovieList from '../../components/MovieList/MovieList';
import { ApplicationScreenProps } from '../../types/navigation';
import movieList from './dummyData';

const MovieCatalog = ({ navigation }: ApplicationScreenProps) => {
  const onSelectMovie = (id: string) => {
    console.log('Movie Selected');
    navigation.navigate('MovieDetails', { id });
  };

  return <MovieList data={movieList} onSelectMovie={onSelectMovie} />;
};

export default MovieCatalog;
