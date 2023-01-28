import { createStackNavigator } from '@react-navigation/stack';
import DefaultPostsScreen from 'src/screens/NestedScreen/Posts/DefaultPostsScreen';
import CommentsScreen from 'src/screens/NestedScreen/Posts/CommentsScreen';
import MapScreen from 'src/screens/NestedScreen/Posts/MapScreen';
import { theme } from 'src/utils/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// const getTabBarVisibility = route => {
//   const routeName = getFocusedRouteNameFromRoute(route);
//   const hideOnScreens = ['Comments', 'Map']; // put here name of screen where you want to hide tabBar
//   return hideOnScreens.indexOf(routeName) <= -1;
// };

const NestedScreen = createStackNavigator();

function PostsScreen() {
  return (
    <NestedScreen.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTitleAlign: 'center',

        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 17,
          lineHeight: 22,
        },
        headerTintColor: { color: theme.colors.text.primaryText },
        headerStyle: {
          backgroundColor: theme.colors.primaryBackground,
          borderBottomWidth: 0.5,
          borderBottomColor: '#21212120',
          height: 60,
        },
        tabBarOptions: {
          tabBarHideOnKeyboard: true,
        },
      }}
    >
      <NestedScreen.Screen name="Posts" component={DefaultPostsScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}

export default PostsScreen;
