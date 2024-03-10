import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../theme';
import { IMovieListItem } from '../../types/movie';

interface IMovieItem extends IMovieListItem {
  onSelectMovie: (id: string) => void;
}

const MovieItem = ({
  onSelectMovie,
  poster_path,
  vote_average,
  id,
}: IMovieItem) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => onSelectMovie(`${id}`)}>
      <Image style={styles.moviePoster} source={{ uri: poster_path }} />
      <View style={styles.movieInfo}>
        <Text style={styles.votes} ellipsizeMode="tail" numberOfLines={1}>
          {vote_average}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    elevation: 4,
    margin: 10,
    width: 125,
    height: 230,
  },
  movieInfo: {
    alignItems: 'center',
    backgroundColor: colors.blue800,
    justifyContent: 'center',
    height: 30,
    flexDirection: 'row',
  },
  moviePoster: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: 200,
    width: 125,
  },
  votes: {
    color: colors.gray100,
    marginLeft: 5,
  },
});

export default MovieItem;
