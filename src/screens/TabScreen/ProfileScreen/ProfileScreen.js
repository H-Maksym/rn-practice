import { View, ImageBackground, Text } from "react-native";
import { useEffect, useCallback } from "react";
// import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { logout } from "src/redux/auth/authSlice";

import Icon from "react-native-vector-icons/Feather";
import Container from "src/components/Common/Container";
import ButtonIcon from "src/components/Common/ButtonIcon";
import AddAvatar from "src/assets/icon/addAvatar.svg";
import PostItem from "src/components/Posts/PostItem";

import { stylesProfileScreen } from "./ProfileScreen.styled";

function ProfileScreen({ navigation, route }) {
  const dispatch = useDispatch();
  // const headerHeight = useHeaderHeight();
  // const [heightHeader] = useState(headerHeight);
  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      return () => {
        //INFO when unfocus screen
      };
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Container style={{ backgroundColor: "#FFFFFF" }}>
      <ImageBackground
        source={require("src/assets/image/backgroundImage.jpg")}
        style={{
          ...stylesProfileScreen.imageBackground,
        }}
      >
        <View
          style={{
            ...stylesProfileScreen.containerProfileScreen,
            // marginTop: heightHeader,
            marginTop: 60,
          }}
        >
          <View style={stylesProfileScreen.avatarBox}>
            <ButtonIcon
              style={stylesProfileScreen.addAvatarButton}
              title="add avatar"
              onPress={() => console.log("add avatar")}
            >
              <AddAvatar fill={"#FF6C00"} stroke={"#FF6C00"} />
            </ButtonIcon>
          </View>

          <ButtonIcon
            title="log-out"
            onPress={logOut}
            style={stylesProfileScreen.buttonIconLogOut}
          >
            <Icon
              name="log-out"
              size={24}
              style={stylesProfileScreen.iconLogOut}
            />
          </ButtonIcon>

          <Text style={stylesProfileScreen.titleProfileScreen}>
            Maksym Holovachuk
          </Text>

          <PostItem
            // image={"src/assets/image/backgroundImage.jpg"}
            countComments={10}
            like
            countLikes={0}
            coordinates={{ latitude: -50, longitude: -50 }}
            titlePlaceByCoordinates={"море"}
            placeTitle={"Ivano-Frankivs'k Region, Ukraine"}
            navigation={navigation}
            fromScreen={route.name}
          />
        </View>
      </ImageBackground>
    </Container>
  );
}

export default ProfileScreen;
