import { StyleSheet, Text, View } from 'react-native';

import { colors } from '~/theme';

const NotFound = () => (
  <View style={Styles.container}>
    <Text style={Styles.text}>404 - Page Not Found</Text>
    <Text style={Styles.subtitle}>Sorry, this page does not exist</Text>
  </View>
);

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue900,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
});

export default NotFound;
