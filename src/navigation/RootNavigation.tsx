import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import type { ApplicationStackParamList } from '../types/navigation';
import { MovieCatalog } from '../screens';
import colors from '../theme/colors';

const Stack = createStackNavigator<ApplicationStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: { ...DarkTheme.colors, background: colors.blue900 },
      }}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="MovieCatalog"
          component={MovieCatalog}
          options={{ title: 'Movie Catalog' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
