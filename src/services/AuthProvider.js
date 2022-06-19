import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

import {GetData} from '../services/axios';

export default async function onGoogleSignIn(navigation) {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // console.log(userInfo);

    const token = await messaging().getToken();

    const data = {
      email: userInfo.user.email,
      name: userInfo.user.name,
      user_avatar: userInfo.user.photo,
      id_token: userInfo.idToken,
      fcm_token: token,
    };

    GetData.registerUser(data).then(res => {
      if (res && res.status === 200) {
        navigation.replace('UserDetails', {userInfo: userInfo});
      } else if (res && res.status === 409) {
        // console.log(res.data.user);
        navigation.replace('BottomTab', {userData: res.data, token: token});
      } else console.warn(res);
    });

  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('ERROR: USER CANCELED THE LOGIN FLOW');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('LOGGING IN.... WAIT A SEC');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('ERROR: PLAY SERVICES NOT AVAILABLE');
    } else {
      console.log(error);
    }
  }
}
