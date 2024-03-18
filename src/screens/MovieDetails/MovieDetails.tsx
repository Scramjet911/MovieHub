/**
 * @fileoverview MovieDetails component shows detailed information for a movie.
 * It fetches movie details using a query, handles loading and error states,
 * and renders the movie poster, overview, and cast of the movie.
 */
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import { useGetMovieDetailsQuery } from '~/api/slices/movieSlice';
import { CastList, MovieOverview } from '~/components';
import { AsyncImage, NotFound } from '~/components/common';
import { colors, text } from '~/theme';
import { ApplicationScreenProps } from '~/types/navigation';

/**
 * MovieDetails component
 * @param {ApplicationScreenProps} route - Navigation route containing movie ID.
 * @returns {JSX.Element} - Rendered component.
 */
const MovieDetails = ({ route }: ApplicationScreenProps): JSX.Element => {
  const { id = '' } = route.params || {};

  const {
    data: movieDetails,
    isLoading,
    isError,
  } = useGetMovieDetailsQuery(parseInt(id));

  // Destructuring movie details
  const {
    title,
    release_date,
    runtime,
    vote_average,
    overview,
    poster_path,
    casts,
  } = movieDetails ?? {};

  // Handling invalid or missing movie ID
  if (!id || Number.isNaN(parseInt(id))) {
    return <NotFound />;
  }

  // Rendering loading indicator while fetching data
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

  // Handling error state
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
          {/* Displaying movie poster */}
          <AsyncImage
            source={{ uri: `${poster_path}` }}
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
