import { SafeAreaView, StatusBar } from 'react-native';

import colors from '../../theme/colors';

interface ISafeView {
  children: JSX.Element;
}
const SafeView = ({ children }: ISafeView) => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.gray900, flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.gray900} />
      {children}
    </SafeAreaView>
  );
};

export default SafeView;
