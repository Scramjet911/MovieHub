import {
  ActivityIndicator,
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { colors } from '~/theme';

interface AsyncImageProps extends ImageProps {
  source: { uri: string };
  style?: StyleProp<ImageStyle>;
}

const AsyncImage = ({ source, style, ...props }: AsyncImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isError = error && source;
  const isLoading = loading || !source;

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
      {isLoading ? (
        <View style={[Styles.image, style]}>
          <ActivityIndicator
            style={Styles.loadingIndicator}
            size="large"
            color={colors.gray100}
          />
        </View>
      ) : (
        isError && <Text style={Styles.errorText}>Error loading image</Text>
      )}
      <Image
        source={source}
        /* Hiding the image if it is loading, since it might show before the 
        state has updated */
        style={[Styles.image, style, isLoading && Styles.hidden]}
        onLoad={handleOnLoad}
        onError={handleOnError}
        {...props}
      />
    </>
  );
};

const Styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
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
