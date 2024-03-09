import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import MovieOverview from '../../components/MovieOverview/MovieOverview';
import CastList from '../../components/CastList/CastList';
import { movieDetails } from './test';
import { colors, text } from '../../theme';
import AsyncImage from '../../components/AsyncImage/AsyncImage';

const MovieDetails = () => {
  const {
    title,
    release_date,
    runtime,
    vote_average,
    overview,
    poster_path,
    casts,
  } = movieDetails;
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
  detailsContainer: { flex: 1, backgroundColor: colors.gray900 },
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
