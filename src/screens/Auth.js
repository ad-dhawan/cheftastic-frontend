import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env'

import {PRIMARY, ACCENT, DULL_BG, DARK_TEXT, LIGHT_TEXT} from '../utils/colors';
import {onGoogleSignIn, onFacebookSignIn} from '../services/AuthProvider';

const {width, height} = Dimensions.get('screen');
const CONST_HEIGHT = height * 0.6;
const LOGIN_CONTAINER_HEIGHT = height / 1.7;
const IMAGE_SIZE = 170;
const ICON_SIZE = 40;

const Auth = ({navigation}) => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  return (
    <>
      <ImageBackground
        source={require('../assets/food_collage_bg.webp')}
        style={styles.bgImage}
        imageStyle={{borderRadius: 10}}
        resizeMode="cover"
        blurRadius={3}>
        <View style={styles.bgCover}>
          <Image
            source={require('../assets/cheftastic_logo_white.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.loginButtonsContainer}>

          <Text style={styles.titleText}>Let's get started</Text>

          <View style={styles.authButtonsContainer}>
            <TouchableOpacity hitSlop={styles.hitSlop} onPress={onGoogleSignIn} >
              <Image source={require('../assets/google.png')} style={styles.authButton} />
            </TouchableOpacity>

            <TouchableOpacity hitSlop={styles.hitSlop} onPress={onFacebookSignIn} >
              <Image source={require('../assets/facebook.png')} style={styles.authButton} />
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    height: CONST_HEIGHT,
  },
  bgCover: {
    height: CONST_HEIGHT,
    backgroundColor: DULL_BG,
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: 'contain',
  },
  loginButtonsContainer: {
    width: width,
    height: LOGIN_CONTAINER_HEIGHT,
    backgroundColor: LIGHT_TEXT,
    position: 'absolute',
    bottom: 0,
    // alignItems: 'center',
    borderTopStartRadius: LOGIN_CONTAINER_HEIGHT / 5.5,
    borderTopEndRadius: LOGIN_CONTAINER_HEIGHT / 5.5,
    paddingTop: CONST_HEIGHT * 0.1,
  },
  titleText: {
    fontSize: 24,
    color: DARK_TEXT,
    fontWeight: 'bold',
    marginBottom: 60,
    paddingHorizontal: 40
  },
  authButtonsContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  },
  authButton: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain',
  },
});

export default Auth;
