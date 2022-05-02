import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSelector, useDispatch} from 'react-redux';

import Statusbar from '../components/StatusBar';
import {BACKGROUND, DARK_TEXT} from '../utils/colors';
import {EXTRA_BOLD, BOLD, EXTRA_BOLD_ITALIC} from '../utils/values';
import {GetData} from '../services/axios';

const {width, height} = Dimensions.get('screen');

const SecondSplash = ({navigation}) => {
  const {user_name} = useSelector(state => state);
  const dispatch = useDispatch();
  const [feed, setFeed] = useState([]);

  useEffect(() => {

    GetData.getFeed(5).then(res => {
      if (res && res.status === 200) {

        setTimeout(() => {

          navigation.replace('Feed');
  
          dispatch({
            type: 'FEED',
            payload: res.data,
          });

        }, 2500)

      } else console.log(res);
    });

  }, []);

  return (
    <>
      <Statusbar translucent={true} bgColor={BACKGROUND} theme={'dark'} />
      <View style={styles.mainContainer}>
        <Text style={styles.upperText}>welcome {user_name}</Text>

        <LottieView
          style={styles.loadingAnim}
          source={require('../assets/lottie/cooking_loading.json')}
          autoPlay
          loop={true}
          colorFilters={[
            {
              keypath: 'White Solid 4',
              color: BACKGROUND,
            },
          ]}
        />

        <Text style={styles.lowerText}>preparing meals for you</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperText: {
    color: DARK_TEXT,
    fontSize: 22,
    fontFamily: EXTRA_BOLD,
  },
  lowerText: {
    color: DARK_TEXT,
    fontSize: 18,
    fontFamily: BOLD,
  },
  loadingAnim: {
    height: width / 1.2,
  },
});

export default SecondSplash;
