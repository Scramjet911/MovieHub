/**
 * @fileoverview MovieOverview component displays movie details
 * like release date, runtime, and ratings.
 */

import { StyleSheet, Text, View } from 'react-native';

import { colors } from '~/theme';

interface MovieOverviewProps {
  date: string;
  runtime?: number;
  ratings?: number;
}

/**
 * MovieOverview component
 * @param {MovieOverviewProps} props - props containing the details of the movie
 * @returns {JSX.Element} - A JSX.Element - the MovieOverview component.
 */
const MovieOverview: React.FC<MovieOverviewProps> = ({
  date,
  runtime,
  ratings,
}) => (
  <View style={style.container}>
    {/* Displaying release date in a readable format (March 2, 2024) */}
    <View style={style.infoItems}>
      <Text style={style.infoText}>
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
    </View>
    {runtime && (
      <View style={style.infoItems}>
        <Text style={style.infoText}>{runtime} Min</Text>
      </View>
    )}
    <View style={style.infoItems}>
      <Text style={style.infoText}>
        Rating:
        {ratings}
      </Text>
    </View>
  </View>
);

const style = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: 6,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
  },
  infoItems: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 24,
    paddingLeft: 3,
  },
  titleText: {
    fontSize: 18,
    color: colors.white,
  },
});

export default MovieOverview;
