import { Text, TextStyle } from 'react-native';

const primaryTextColor = '#ffffff';

const text = {
  baseColor: {
    color: primaryTextColor,
  },
  normalText: {
    fontSize: 12,
  },
  headingText: {
    fontWeight: '300',
    fontSize: 18,
    paddingBottom: 6,
    paddingTop: 6,
  },
  subHeadingText: {
    paddingTop: 6,
    paddingBottom: 6,
    fontWeight: '700',
    fontSize: 14,
  },
  titleText: {
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 22,
  },
} as const;

export default text;
