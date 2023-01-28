import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { logout } from 'src/redux/auth/authSlice';

import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import Container from 'src/components/Common/Container';
import ButtonIcon from 'src/components/Common/ButtonIcon';

import UserData from 'src/components/Posts/UserData';
import PostItem from 'src/components/Posts/PostItem';

import { theme } from 'src/utils/theme';
import { stylesPostScreen } from './DefaultPostsScreen.styled';

function DefaultPostsScreen({ navigation }) {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      return () => {
        //INFO when unfocus screen
      };
    }, [])
  );

  const logOut = () => {
    dispatch(logout());
    // navigation.navigate('Login');
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
          countLikesPost={10}
          locationPost={"Ivano-Frankivs'k Region, Ukraine"}
          navigation={navigation}
        />
      </View>
    </Container>
  );
}

export default DefaultPostsScreen;
