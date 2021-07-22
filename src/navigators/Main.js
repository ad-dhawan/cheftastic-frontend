import React, {useState, useEffect} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Auth from '../screens/Auth';
import OnBoarding from '../screens/OnBoarding';

const Stack = createStackNavigator();

const Main = () => {
  const [isNew, setIsNew] = useState(null);
  const {loading} = useSelector(state => state);

  useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData === null) {
      setIsNew(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsNew(false);
    }
  }, []);

  return (
    <>
      {isNew ? <OnBoarding /> : <Auth />}
      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.modal}>
          <LottieView
            style={styles.loadingAnim}
            source={require('../assets/lottie/loading.json')}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#f5ab5140',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingAnim: {
    width: '30%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
