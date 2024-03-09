import React, { useState } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  ImageProps,
  StyleProp,
  ImageStyle,
  StyleSheet,
  Text,
} from 'react-native';
import { colors } from '../../theme';

interface AsyncImageProps extends ImageProps {
  source: { uri: string };
  style?: StyleProp<ImageStyle>;
}

const AsyncImage = ({ source, style, ...props }: AsyncImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleOnLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleOnError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <>
      {loading && (
        <ActivityIndicator
          style={Styles.loadingIndicator}
          size="large"
          color={colors.gray100}
        />
      )}
      {error && <Text style={Styles.errorText}>Error loading image</Text>}
      <Image
        source={source}
        style={[Styles.image, style]}
        onLoad={handleOnLoad}
        onError={handleOnError}
        {...props}
      />
    </>
  );
};

const Styles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 50,
  },
  errorText: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    opacity: 50,
    textAlign: 'center',
    color: 'red',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default AsyncImage;
