import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import { IMovieListItem } from '../../types/movie';
import MovieItem from './MovieItem';

interface IMovieListProps {
  data: IMovieListItem[];
  onSelectMovie: (id: string) => void;
  fetchMoreMovies: () => void;
  isLoading: boolean;
}
const { width } = Dimensions.get('window');
const numColumns = Math.floor(width / (125 + 5 * 2));

const MovieList = ({
  data,
  onSelectMovie,
  fetchMoreMovies,
  isLoading,
}: IMovieListProps) => (
  <View style={styles.flatListContainer}>
    <FlatList
      data={data}
      numColumns={numColumns}
      keyExtractor={(item: IMovieListItem) => `${item.id}`}
      renderItem={({ item }) => (
        <MovieItem onSelectMovie={onSelectMovie} {...item} />
      )}
      showsVerticalScrollIndicator={false}
      onEndReached={fetchMoreMovies}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isLoading ? <ActivityIndicator size="large" /> : null
      }
    />
  </View>
);

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
});

export default MovieList;
