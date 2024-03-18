import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';

import { SearchIcon } from '~/assets/icons';
import { colors } from '~/theme';

interface SearchProps {
  height?: number;
  fontSize?: number;
  backgroundColor?: string;
  placeholderTextColor?: string;
  shadowColor?: string;
  placeholder: string;
  animationSpeed?: number[];
  onOpened?: () => void;
  onClosed?: () => void;
  onOpening?: () => void;
  onClosing?: () => void;
  onSearch?: (searchTerm: string) => void;
  searchText?: string | null;
}

const Search = ({
  searchText,
  height = 48,
  fontSize = 16,
  backgroundColor = 'rgb(255,255,255)',
  placeholderTextColor = '#555555',
  shadowColor = 'rgba(2, 1, 1, 0.12)',
  placeholder,
  animationSpeed = [100, 150],
  onOpened,
  onClosed,
  onOpening,
  onClosing,
  onSearch,
}: SearchProps) => {
  const [isScaled, setIsScaled] = useState(false);
  const textInputAnimated = useRef(new Animated.Value(0)).current;
  const refTextInput = useRef<TextInput>(null);
  const [searchString, setSearchString] = useState(searchText ?? '');
  const open = () => {
    if (onOpening) {
      onOpening();
    }

    Animated.timing(textInputAnimated, {
      toValue: 1,
      duration: animationSpeed[0],
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsScaled(true);
      if (onOpened) {
        onOpened();
      }
      if (refTextInput.current) refTextInput.current.focus();
    });
  };

  const close = () => {
    if (onClosing) onClosing();
    setIsScaled(false);

    setTimeout(() => {
      Animated.timing(textInputAnimated, {
        toValue: 0,
        duration: animationSpeed[0],
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        if (onClosed) onClosed();
      });
    }, 125);
  };

  const onSearchChange = (searchStr: string) => {
    setSearchString(searchStr);
    if (onSearch) {
      onSearch(searchStr);
    }
  };

  return (
    <View style={styles.container}>
      {searchString && (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: colors.gray800,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: colors.gray700,
              paddingVertical: 4,
              paddingHorizontal: 10,
              width: '60%',
              alignItems: 'center',
            }}>
            <Text style={{ color: colors.gray100 }}>
              {searchString.charAt(0).toUpperCase() +
                searchString.slice(1).toLowerCase()}
            </Text>
          </View>
        </View>
      )}
      <Animated.ScrollView
        style={[
          styles.animatedContainer,
          {
            transform: [{ scaleX: textInputAnimated }],
          },
        ]}
        contentContainerStyle={{
          height: '100%',
        }}>
        <TextInput
          ref={refTextInput}
          placeholderTextColor={isScaled ? placeholderTextColor : 'transparent'}
          placeholder={placeholder}
          onBlur={close}
          onChangeText={onSearchChange}
          style={[
            styles.searchInput,
            {
              shadowColor,
              backgroundColor,
              height: '100%',
              fontSize,
              paddingLeft: height,
            },
          ]}
          value={searchString}
        />
        {isScaled ? (
          <View
            style={[styles.inputSearchIcon, { width: height, height: '100%' }]}>
            <SearchIcon />
          </View>
        ) : null}
      </Animated.ScrollView>

      {isScaled ? null : (
        <TouchableOpacity
          onPress={open}
          style={[styles.inputClosedSearchIcon, { width: height, height }]}>
          <SearchIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    zIndex: 10,
  },
  animatedContainer: {
    width: '100%',
    transformOrigin: 'right',
  },
  searchInput: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  inputSearchIcon: {
    position: 'absolute',
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputClosedSearchIcon: {
    position: 'absolute',
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;
