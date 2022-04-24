import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

import {PRIMARY, ACCENT, DULL_BG, DARK_TEXT, LIGHT_TEXT} from '../utils/colors';

const {width, height} = Dimensions.get('screen');
const CONST_HEIGHT = height * 0.6
const LOGIN_CONTAINER_HEIGHT = height / 1.7
const IMAGE_SIZE = 170

const Auth = ({navigation}) => {
  const dispatch = useDispatch();

  const onSignIn = async() => {

    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log(userInfo)
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }

    dispatch({type: 'LOGIN'});
  };

  return (
    <>
      <ImageBackground
        source={require('../assets/food_collage_bg.webp')}
        style={styles.bgImage}
        imageStyle={{borderRadius: 10}}
        resizeMode="cover"
        blurRadius={3}>

          <View style={styles.bgCover} >
            <Image source={require('../assets/cheftastic_logo_white.png')} style={styles.logo} />
          </View>

          <View style={styles.loginButtonsContainer} >
            
          <GoogleSigninButton
            style={styles.googleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={onSignIn}
          />

          </View>

        </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    height: CONST_HEIGHT
  },
  bgCover: {
    height: CONST_HEIGHT,
    backgroundColor: DULL_BG,
    alignItems: 'center',
    paddingTop: 60
  },
  logo: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: 'contain'
  },
  loginButtonsContainer: {
    width: width,
    height: LOGIN_CONTAINER_HEIGHT,
    backgroundColor: LIGHT_TEXT,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    borderTopStartRadius: LOGIN_CONTAINER_HEIGHT / 5.5,
    borderTopEndRadius: LOGIN_CONTAINER_HEIGHT / 5.5,
    paddingTop: CONST_HEIGHT * 0.1
  },
  googleButton: {
    width: '70%'
  }
});

export default Auth;
