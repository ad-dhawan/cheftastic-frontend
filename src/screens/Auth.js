import React, {useRef, useState, useEffect} from 'react';
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
} from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env'
import * as Animatable from 'react-native-animatable';

import {GOOGLE, FACEBOOK, DULL_BG, DARK_TEXT, LIGHT_TEXT, SUB_HEADING, GREY} from '../utils/colors';
import { EXTRA_BOLD, BOLD, REGULAR } from '../utils/values';
import onGoogleSignIn from '../services/AuthProvider';
import SwipeButton from '../components/SwipeButton';

const {width, height} = Dimensions.get('screen');
const CONST_HEIGHT = height * 0.6;
const LOGIN_CONTAINER_HEIGHT = height / 1.7;
const IMAGE_SIZE = 170;
const ICON_SIZE = 32;

const Auth = ({navigation}) => {
  const authRef = useRef(null);
  
  useEffect(() => {
    authRef.current.fadeInUp();

    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
    
  }, [])
  

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

          <Animatable.View ref={authRef} style={styles.loginButtonsContainer}>

          <View style={styles.headingContainer}>
            <Text style={styles.titleText}>Let's get started</Text>
            <Text style={styles.subHeadingText}>Sign in to continue</Text>
          </View>

          <View style={styles.authButtonsContainer}>

            <TouchableOpacity hitSlop={styles.hitSlop} onPress={() => onGoogleSignIn(navigation)} style={[styles.authButton, {backgroundColor: GOOGLE}]} >
              <Image source={require('../assets/google.png')} style={styles.authButtonIcon} />
              <Text style={[styles.authButtonText, {color: DARK_TEXT}]}>Sign in with Google</Text>
            </TouchableOpacity>

          </View>

          </Animatable.View>

      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  bgCover: {
    flex: 1,
    backgroundColor: DULL_BG,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60
  },
  logo: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: 'contain',
  },
  getStartedTitle: {
    color: LIGHT_TEXT,
    fontFamily: EXTRA_BOLD,
    textTransform: 'uppercase',
    fontSize: 22,
  },
  getStartedSubHeading: {
    color: LIGHT_TEXT,
    fontFamily: BOLD,
    textTransform: 'uppercase',
    fontSize: 16,
    marginTop: 10
  },
  loginButtonsContainer: {
    width: width,
    height: LOGIN_CONTAINER_HEIGHT,
    backgroundColor: LIGHT_TEXT,
    position: 'absolute',
    bottom: 0,
    borderTopStartRadius: LOGIN_CONTAINER_HEIGHT / 5.5,
    borderTopEndRadius: LOGIN_CONTAINER_HEIGHT / 5.5,
    paddingTop: CONST_HEIGHT * 0.1,
  },
  headingContainer: {
    paddingHorizontal: 40,
  },
  titleText: {
    fontSize: 24,
    color: DARK_TEXT,
    fontFamily: EXTRA_BOLD,
  },
  subHeadingText: {
    fontSize: 16,
    color: SUB_HEADING,
    fontFamily: REGULAR,
    lineHeight: 35
  },
  authButtonsContainer: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  },
  authButton: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '70%',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: GREY,
  },
  authButtonIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain',
  },
  authButtonText: {
    fontSize: 14,
    color: LIGHT_TEXT,
    marginLeft: 15,
    fontFamily: REGULAR,
  }
});

export default Auth;
