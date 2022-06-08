import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

import {GetData} from '../services/axios';

const dispatch = useDispatch()

export const onGoogleSignIn = async (navigation) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);

    const token = await messaging().getToken();

    const data = {
      email: userInfo.user.email,
      name: userInfo.user.name,
      user_avatar: userInfo.user.photo,
      id_token: userInfo.idToken,
      fcm_token: token
    };

    GetData.registerUser(data).then(res => {
      if (res && res.status === 200) {
        
        console.log("LOGIN DATA: ", res.data);

        dispatch({
          type: 'LOGIN',
          payload: {
            ...data,
            user_id: res.data.user._id,
            user_name: userInfo.user.name,
            user_email: userInfo.user.email,
            user_avatar: userInfo.user.photo,
            id_token: userInfo.idToken,
          },
        });

        navigation.replace('BottomTab')

      } else if (res && res.status === 409) {
        
        console.log(res.data.user);
        dispatch({
          type: 'LOGIN',
          payload: {
            ...data,
            user_id: res.data.user._id,
            user_name: res.data.user.name,
            user_email: res.data.user.email,
            user_avatar: res.data.user.user_avatar,
            id_token: res.data.user.id_token,
            fcm_token: token
          },
        });

        navigation.replace('BottomTab')

      } else console.warn(res)
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
