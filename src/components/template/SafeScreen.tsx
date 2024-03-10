import { SafeAreaView, StatusBar } from 'react-native';

import { colors } from '~/theme';

interface ISafeView {
  children: JSX.Element;
}
const SafeView = ({ children }: ISafeView) => (
  <SafeAreaView style={{ backgroundColor: colors.gray900, flex: 1 }}>
    <StatusBar barStyle="light-content" backgroundColor={colors.gray900} />
    {children}
  </SafeAreaView>
);

export default SafeView;
