import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'src/redux/auth/authSlice';

import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import Container from 'src/components/Common/Container';
import ButtonIcon from 'src/components/Common/ButtonIcon';

import UserData from 'src/components/Posts/UserData';
import PostItem from 'src/components/Posts/PostItem';

import { theme } from 'src/utils/theme';
import { stylesPostScreen } from './PostsScreen.styled';

function PostsScreen({ navigation }) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonIcon title="log-out" onPress={logOut}>
          <Icon
            name="log-out"
            style={stylesPostScreen.headerIconLogOut}
            size={24}
          />
        </ButtonIcon>
      ),
    });
  }, [navigation]);

  return (
    <Container style={{ backgroundColor: theme.colors.primaryBackground }}>
      <View style={stylesPostScreen.containerPostScreen}>
        <UserData
          avatarUser="avatar"
          userName="Maksym"
          userSurName="Holovachuk"
          email="maksym@gmail.com"
        />
        <PostItem
          imagePost={'imageURL'}
          countCommentsPost={10}
          like
          countLikesPost={10}
          locationPost={"Ivano-Frankivs'k Region, Ukraine"}
        />
      </View>
    </Container>
  );
}

export default PostsScreen;
