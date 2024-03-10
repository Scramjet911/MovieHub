import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import { useGetMovieDetailsQuery } from '../../api/slices/movieSlice';
import AsyncImage from '../../components/AsyncImage/AsyncImage';
import CastList from '../../components/CastList/CastList';
import MovieOverview from '../../components/MovieOverview/MovieOverview';
import { colors, text } from '../../theme';
import { ApplicationScreenProps } from '../../types/navigation';
import NotFound from '../NotFound/NotFound';

const MovieDetails = ({ route }: ApplicationScreenProps) => {
  const { id = '' } = route.params || {};

  const {
    data: movieDetails,
    isLoading,
    isError,
  } = useGetMovieDetailsQuery(parseInt(id));

  const {
    title,
    release_date,
    runtime,
    vote_average,
    overview,
    poster_path,
    casts,
  } = movieDetails ?? {};

  if (!id || Number.isNaN(parseInt(id))) {
    return <NotFound />;
  }
  if (isLoading) {
    return (
      <View style={Styles.detailsContainer}>
        <ActivityIndicator
          style={Styles.loadingIndicator}
          size="large"
          color={colors.gray100}
        />
      </View>
    );
  }
  if (isError) {
    return (
      <View style={Styles.detailsContainer}>
        <Text>Could not get data from Movie DB</Text>
      </View>
    );
  }

  return (
    <View style={Styles.detailsContainer}>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <AsyncImage
            source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
            style={Styles.posterImage}
          />
        </View>
        <View style={Styles.movieDataContainer}>
          <Text style={[text.baseColor, text.titleText]}>{title}</Text>

          <MovieOverview
            date={release_date || ''}
            runtime={runtime || 100}
            ratings={vote_average}
          />

          <Text style={[text.baseColor, text.normalText]}>{overview}</Text>

          <CastList title="Cast" items={casts || []} />
        </View>
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: colors.gray900,
    justifyContent: 'center',
  },
  loadingIndicator: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 50,
  },
  posterImage: {
    width: '80%',
    height: 400,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  movieDataContainer: {
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default MovieDetails;
