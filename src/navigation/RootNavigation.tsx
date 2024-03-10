/**
 * @fileoverview RootNavigation component handles the navigation stack
 * for the app. It utilizes React Navigation library for navigation management.
 */
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MovieCatalog, MovieDetails } from '~/screens';
import { colors } from '~/theme';
import type { ApplicationStackParamList } from '~/types/navigation';

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

/**
 * RootNavigation component
 * @returns {JSX.Element} Rendered component.
 */
const RootNavigation = (): JSX.Element => (
  <NavigationContainer
    theme={{
      dark: true,
      colors: { ...DarkTheme.colors, background: colors.blue900 },
    }}>
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen
        name="MovieCatalog"
        component={MovieCatalog}
        options={{ title: 'Movie Catalog' }}
      />
      <Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{ title: 'Movie Details' }}
      />
    </Navigator>
  </NavigationContainer>
);

export default RootNavigation;
