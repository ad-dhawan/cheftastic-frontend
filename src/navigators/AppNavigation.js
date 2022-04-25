import React, {useEffect, useState} from 'react';
import {Animated, Text, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import {useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { isEmpty } from 'lodash';

import Auth from '../screens/Auth';
import SecondSplash from '../screens/SecondSplash';
import Feed from '../screens/Feed';
import {DARK_TEXT, LIGHT_TEXT} from '../utils/colors';

const Stack = createStackNavigator();

enableScreens();

const AppNavigation = () => {
  const {loggedIn, data} = useSelector(state => state);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected ? setIsConnected(true) : setIsConnected(false);
    });

    // Unsubscribe
    unsubscribe();
  }, []);

  return (
    <>
      {!isConnected ? (
        <Animated.SafeAreaView
          style={{backgroundColor: 'red', alignItems: 'center'}}>
          <Text style={{color: LIGHT_TEXT}}>Offline</Text>
        </Animated.SafeAreaView>
      ) : null}

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!loggedIn ? <Stack.Screen name="Auth" component={Auth} /> : null}
        
        {isEmpty(data) ? <Stack.Screen name="SecondSplash" component={SecondSplash} /> : null}

        <Stack.Screen name="Feed" component={Feed} />
        
      </Stack.Navigator>
    </>
  );

};

export default AppNavigation;
