import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from 'src/screens/AuthScreen/LoginScreen';
import RegistrationScreen from 'src/screens/AuthScreen/RegistrationScreen';

import PostsScreen from 'src/screens/TabScreen/PostsScreen';
import CreatePostsScreen from 'src/screens/TabScreen/CreatePostsScreen';
import ProfileScreen from 'src/screens/TabScreen/ProfileScreen';
import TabBar from 'src/components/Common/TabBar';
import { theme } from 'src/utils/theme';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      tabBar={props => <TabBar {...props} />}
      initialRouteName="NestedPosts"
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
          height: 80,
        },
        // tabBarHideOnKeyboard: true,
      }}
    >
      <MainTab.Screen
        name="NestedPosts"
        component={PostsScreen}
        options={{
          tabBarVisible: true,
          headerShown: false,
          iconName: 'grid',
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{ iconName: 'plus' }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          iconName: 'user',
        }}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
