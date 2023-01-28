<<<<<<< HEAD
import { StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

export const stylesUserData = StyleSheet.create({
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
=======
import { StyleSheet } from 'react-native';
import { theme } from 'src/utils/theme';

export const stylesUserData = StyleSheet.create({
  userInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
>>>>>>> main
    marginTop: theme.space[5],
  },
  imageUserWrapper: {
    marginRight: theme.space[3],
    width: theme.space[6] - 4,
    height: theme.space[6] - 4,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.imageBackground,
  },
<<<<<<< HEAD
  imageUser: {
    width: theme.space[6] - 4,
    height: theme.space[6] - 4,
    borderRadius: theme.radii.lg,
  },

  userDataWrapper: {},
  userDataName: {
    fontFamily: "Roboto-Bold",
=======
  userDataWrapper: {},
  userDataName: {
    fontFamily: 'Roboto-Bold',
>>>>>>> main
    fontSize: 13,
    lineHeight: 15,
    color: theme.colors.text.primaryText,
  },
  userDataMail: {
<<<<<<< HEAD
    fontFamily: "Roboto-Regular",
=======
    fontFamily: 'Roboto-Regular',
>>>>>>> main
    fontSize: 11,
    lineHeight: 13,
    color: theme.colors.text.shadowText,
  },
});
