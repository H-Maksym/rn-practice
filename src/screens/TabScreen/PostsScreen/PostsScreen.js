import { createStackNavigator } from '@react-navigation/stack';
import DefaultPostsScreen from 'src/screens/NestedScreen/Posts/DefaultPostsScreen';
import CommentsScreen from 'src/screens/NestedScreen/Posts/CommentsScreen';
import MapScreen from 'src/screens/NestedScreen/Posts/MapScreen';
import { theme } from 'src/utils/theme';

const NestedScreen = createStackNavigator();

function PostsScreen() {
  return (
    <NestedScreen.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerLeft: () => {},
      }}
    >
      <NestedScreen.Screen name="Posts" component={DefaultPostsScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}

export default PostsScreen;
