/**
 * @fileoverview MovieList component displays an infinitely loading
 * list of movies in a FlatList.
 */

import {
  ActivityIndicator,
  // Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import { IMovieListItem } from '~/types/movie';
import ListHeader from './ListHeader';
import MovieItem from './MovieItem';

interface IMovieListProps {
  data: IMovieListItem[];
  fetchMoreMovies: () => void;
  isLoading: boolean;
  onSelectMovie: (id: string) => void;
  onSearchMovie: (query: string) => void;
}
// const { width } = Dimensions.get('window');
// Calculating number of columns based on device width and item size
// const numColumns = Math.floor(width / (125 + 5 * 2));

/**
 * MovieList component
 * @param {IMovieListProps} props - props containing
 * data, onSelectMovie, fetchMoreMovies, and isLoading.
 * @returns {JSX.Element} - A JSX.Element - the MovieList component.
 */
const MovieList = ({
  data,
  fetchMoreMovies,
  isLoading,
  onSelectMovie,
  onSearchMovie,
}: IMovieListProps) => (
  <View style={styles.flatListContainer}>
    {/* FlatList to render a virtualized movie list for optimized rendering
    It also has the logic of infinite loading, the fetchMoreMovies function
    is called when the end is reached which allows for infinite loading */}
    <FlatList
      ListHeaderComponent={<ListHeader onSearchMovie={onSearchMovie} />}
      data={data}
      numColumns={3}
      keyExtractor={(item: IMovieListItem) => `${item.id}`}
      renderItem={({ item }) => (
        <MovieItem onSelectMovie={onSelectMovie} {...item} />
      )}
      showsVerticalScrollIndicator={false}
      onEndReached={fetchMoreMovies}
      // Keeping a small threshold since users might not hit the end
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
