import { ScaledSheet } from 'react-native-size-matters';

import { colors } from '~/theme';

const styles = ScaledSheet.create({
  toastView: {
    flexDirection: 'row',
    backgroundColor: colors.green400,
    borderWidth: 1,
    borderColor: colors.green700,
    borderRadius: '4@s',
    paddingHorizontal: '19@s',
    paddingVertical: '15@vs',
    alignItems: 'center',
    maxWidth: '90%',
  },
  toastText: {
    flex: 1,
    marginLeft: '8@s',
    color: colors.green500,
    fontSize: '14@s',
    letterSpacing: '0.5@s',
    lineHeight: '18@ms',
  },
  warningToastContainer: {
    backgroundColor: colors.yellow700,
    marginHorizontal: '30@ms',
    borderWidth: 0,
  },
  errorToastContainer: {
    backgroundColor: colors.red800,
    marginHorizontal: '25@ms',
    borderWidth: 0,
  },
  errorText: {
    fontSize: '14@ms',
    lineHeight: '18@ms',
    letterSpacing: 0.5,
    color: colors.red900,
  },
  warningText: {
    color: colors.orange500,
  },
  closeIcon: {
    color: colors.sky400,
    marginHorizontal: '5@ms',
  },
});

export default styles;
