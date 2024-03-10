import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { text } from '../../theme';
import { ICast } from '../../types/movieDetails';
import AsyncImage from '../AsyncImage/AsyncImage';

const defaultProfilePath = require('../../assets/images/profile_avatar.png');

interface CastListProps {
  title: string;
  items: ICast[];
}

const CastList = ({ title, items }: CastListProps) => (
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
                uri: `${item.profile_path}`,
              }}
            />
          ) : (
            <Image style={Style.castImage} source={defaultProfilePath} />
          )}
          <Text
            style={[text.baseColor, text.normalText, Style.castImageText]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>
      )}
    />
  </View>
);

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
