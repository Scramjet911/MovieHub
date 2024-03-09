import React from 'react';
import { Image, Text, ScrollView, View, StyleSheet } from 'react-native';
import { ICast } from '../../types/domain';
import { text } from '../../theme';
import AsyncImage from '../AsyncImage/AsyncImage';
import { FlatList } from 'react-native-gesture-handler';

interface CastListProps {
  title: string;
  items: ICast[];
}

const CastList = ({ title, items }: CastListProps) => {
  return (
    <View>
      <Text style={[text.baseColor, text.headingText]}>{title}</Text>
      <FlatList
        horizontal
        data={items}
        renderItem={({ item }) => (
          <View style={Style.castImageContainer}>
            {item.profile_path ? (
              <AsyncImage
                style={Style.castImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
                }}
              />
            ) : null}
            <Text
              style={[text.baseColor, text.normalText, Style.castImageText]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.name}
            </Text>
          </View>
        )}></FlatList>
    </View>
  );
};

const Style = StyleSheet.create({
  titleText: {
    marginTop: 15,
    marginBottom: 4,
  },
  castImageContainer: {
    alignItems: 'center',
  },
  castImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  castImageText: {
    maxWidth: 90,
    textAlign: 'center',
  },
});

export default CastList;
