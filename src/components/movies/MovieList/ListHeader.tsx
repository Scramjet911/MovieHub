import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Search } from '~/components/common';
import { useAppSelector } from '~/store/hooks';
import { colors } from '~/theme';

const titleImage = require('~/assets/images/camera.png');

type Props = { onSearchMovie: (searchTerm: string) => void };

const ListHeader = ({ onSearchMovie }: Props) => {
  const { searchQuery } = useAppSelector(state => state.movie);
  return (
    <View style={{ height: 70 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={Style.titleImage} source={titleImage} />
        <Text style={Style.titleText}>MovieHub</Text>
      </View>
      <Search
        placeholder="Search movies"
        onSearch={onSearchMovie}
        searchText={searchQuery}
      />
    </View>
  );
};

const Style = StyleSheet.create({
  titleImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.yellow500,
  },
});
export default ListHeader;
