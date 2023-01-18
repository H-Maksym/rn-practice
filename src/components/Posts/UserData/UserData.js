import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { stylesUserData } from './UserData.styled';

function UserData({ avatarUser, userName, userSurName, email, style }) {
  return (
    <View style={{ ...style, ...stylesUserData.userInfoWrapper }}>
      <View style={stylesUserData.imageUserWrapper}>
        <Image></Image>
      </View>
      <View style={stylesUserData.userDataWrapper}>
        <Text style={stylesUserData.userDataName}>
          {userName} {userSurName}
        </Text>
        <Text style={stylesUserData.userDataMail}>{email}</Text>
      </View>
    </View>
  );
}

UserData.propTypes = {
  style: PropTypes.object,
  avatarUser: PropTypes.string,
  userName: PropTypes.string,
  userSurName: PropTypes.string,
  email: PropTypes.string,
};

UserData.defaultProps = {
  style: {},
  avatarUser: '',
  userName: '',
  userSurName: '',
  email: '',
};

export default UserData;
