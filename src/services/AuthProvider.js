import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {GetData} from '../services/axios';

const dispatch = useDispatch()

export const onGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);

    const data = {
      email: userInfo.user.email,
      name: userInfo.user.name,
      user_avatar: userInfo.user.photo,
      id_token: userInfo.idToken,
    };

    GetData.registerUser(data).then(res => {
      if (res && res.status === 200) {
        console.log(res.data);
      } else console.log(res);
    });

    dispatch({
      type: 'LOGIN',
      payload: {
        ...data,
        user_name: userInfo.user.name,
        user_email: userInfo.user.email,
        user_avatar: userInfo.user.photo,
        id_token: userInfo.idToken,
      },
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
};
