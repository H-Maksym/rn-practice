<<<<<<< HEAD
import { useSelector } from "react-redux";
import { selectIsVisibleTabBar } from "src/redux/auth/authSelectors";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import ButtonIcon from "src/components/Common/ButtonIcon";
import { theme } from "src/utils/theme";
import { stylesTab } from "./TabBar.styled";

function TabBar({ state, descriptors, navigation }) {
  const IsVisibleTabBar = useSelector(selectIsVisibleTabBar);

=======
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { selectIsVisibleTabBar } from 'src/redux/auth/authSelectors';

import Icon from 'react-native-vector-icons/Feather';
import ButtonIcon from 'src/components/Common/ButtonIcon';
import { theme } from 'src/utils/theme';
import { stylesTab } from './TabBar.styled';
import { useVisibleTabBar } from '../../../hooks/useVisibleTabBar';

function TabBar(props) {
  const { state, descriptors, navigation } = props;
  const IsVisibleTabBar = useSelector(selectIsVisibleTabBar);
>>>>>>> main
  return (
    <View
      style={{
        ...stylesTab.containerTab,
<<<<<<< HEAD
        display: !IsVisibleTabBar ? "none" : "flex",
=======
        display: !IsVisibleTabBar ? 'none' : 'flex',
>>>>>>> main
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
<<<<<<< HEAD
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
=======

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
>>>>>>> main
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
<<<<<<< HEAD
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
=======
            // navigation.navigate(route.name, { prevScreen: route.name });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
>>>>>>> main
            target: route.key,
          });
        };

        return (
          <ButtonIcon
            key={options.iconName}
            title={options.tabBarAccessibilityLabel}
            accessibilityState={isFocused ? { selected: true } : {}}
            testID={options.tabBarTestID}
<<<<<<< HEAD
            onPress={() => onPress()}
            onLongPress={() => onLongPress()}
=======
            onPress={onPress}
            onLongPress={onLongPress}
>>>>>>> main
            style={stylesTab.iconContainerTab}
          >
            <View
              style={{
                ...stylesTab.iconTabWrapper,
                backgroundColor: isFocused
                  ? theme.colors.button.accent
                  : theme.colors.white,
              }}
            >
              <Icon
                size={24}
                name={options.iconName}
                style={{
                  ...stylesTab.iconTab,
                  color: isFocused
                    ? theme.colors.white
                    : theme.colors.text.shadowText,
                }}
              />
            </View>

            {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text> */}
          </ButtonIcon>
        );
      })}
    </View>
  );
}

export default TabBar;
