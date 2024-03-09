import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

import { IMovieDetails } from '../../types/domain';
import MovieItem from './MovieItem';

interface IMovieListProps {
  data: IMovieDetails[];
  onSelectMovie: (id: string) => void;
}
const { height, width } = Dimensions.get('window');
const numColumns = Math.floor(width / (125 + 5 * 2));

const MovieList = ({ data, onSelectMovie }: IMovieListProps) => {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={data}
        numColumns={numColumns}
        keyExtractor={(item: IMovieDetails) => `${item.id}`}
        renderItem={({ item }) => (
          <MovieItem onSelectMovie={onSelectMovie} {...item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SourceSansPro-Black',
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
