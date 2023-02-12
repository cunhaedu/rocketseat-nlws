import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  message: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    marginLeft: 16,
  },
});
