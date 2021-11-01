import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {PRIMARY, BLACK_TEXT, BACKGROUND} from '../utils/colors';
import ImageButton from '../components/ImageButton';

const {width, height} = Dimensions.get('screen');

// const dispatch = useDispatch();

// const onSignIn = () => {
//   dispatch({
//     type: 'LOGIN',
//   });
// };

const Auth = () => {
  return (
    <View style={{backgroundColor: BACKGROUND, flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Image
          source={require('../assets/cheftastic_hat.png')}
          style={styles.logo}
        />

        <View style={styles.oauthContainer}>
          <View style={styles.connectWithView}>
            <View style={styles.line} />
            <Text style={styles.connectText}>CONNECT WITH</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.oauth}>
            <ImageButton
              noFeedback={false}
              size={44}
              onPress={onSignIn}
              icon={require('../assets/google.png')}
            />
            <ImageButton
              noFeedback={false}
              size={44}
              onPress={onSignIn}
              icon={require('../assets/facebook.png')}
            />
            {Platform.OS === 'ios' && (
              <ImageButton
                noFeedback={false}
                size={44}
                onPress={onSignIn}
                icon={require('../assets/apple.png')}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: width / 3,
    height: width / 3,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height / 6,
  },
  oauthContainer: {
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: height / 6,
  },
  connectWithView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  line: {
    height: 1,
    borderWidth: 1,
    width: '30%',
    borderColor: '#ccc',
  },
  connectText: {
    fontSize: 13,
    color: '#ccc',
  },
  oauth: {
    width: Platform.OS === 'ios' ? '70%' : '60%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Auth;
