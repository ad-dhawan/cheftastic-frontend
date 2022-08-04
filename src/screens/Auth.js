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
} from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';

import {GOOGLE, DARK_TEXT, LIGHT_TEXT, GREY, TRANSPARENT} from '../utils/colors';
import { BOLD, REGULAR, APP_TITLE } from '../utils/values';
import onGoogleSignIn from '../services/AuthProvider';
import Statusbar from '../components/StatusBar';

const {width, height} = Dimensions.get('screen');
const ICON_SIZE = 32;

const Auth = ({navigation}) => {
  useEffect(() => {
    GoogleSignin.configure();
  }, [])
  

  return (
    <>
      <Statusbar translucent={true} bgColor={TRANSPARENT} theme={'light'} />

      <ImageBackground
        source={require('../assets/cake_wallpaper.jpeg')}
        style={styles.bgImage}
        resizeMode="cover">

          <LinearGradient
            colors={[TRANSPARENT, '#00000050', DARK_TEXT]}
            style={styles.linearGradient}
          />

          <View style={styles.buttonContainer}>

            <Text style={styles.title} >cheftastic</Text>
            <Text style={styles.subTitle} >Get a million beautiful and delicious recipes around the world</Text>

            <TouchableOpacity hitSlop={styles.hitSlop} onPress={() => onGoogleSignIn(navigation)} style={[styles.authButton, {backgroundColor: GOOGLE}]} >
              <Image source={require('../assets/google.png')} style={styles.authButtonIcon} />
              <Text style={[styles.authButtonText, {color: DARK_TEXT}]}>Sign in with Google</Text>
            </TouchableOpacity>

          </View>

      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: height / 8,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontFamily: APP_TITLE,
    textTransform: 'capitalize',
    color: LIGHT_TEXT
  },
  subTitle: {
    fontSize: 14,
    fontFamily: BOLD,
    color: GREY,
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  authButton: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
    paddingVertical: 10,
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
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    height: height / 1.5,
    width: width,
}
});

export default Auth;
