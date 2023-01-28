import { StyleSheet } from 'react-native';
import { theme } from 'src/utils/theme';
export const stylesTab = StyleSheet.create({
  containerTab: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#21212120',
    paddingHorizontal: 82,
  },
  iconContainerTab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: theme.space[3] + 1,
    paddingBottom: theme.space[4] + 6,
  },
  iconTabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.space[6] + 6,
    height: theme.space[5] + 8,
    borderRadius: theme.radii.x,
  },
  iconTab: {
    // fontSize: theme.fontSizes.m,
  },
});
