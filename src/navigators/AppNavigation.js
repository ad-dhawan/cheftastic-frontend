import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import {useSelector} from 'react-redux';

import Auth from '../screens/Auth';
import BottomTab from './BottomTab';

const Stack = createStackNavigator();

enableScreens();

const StackNavigator = () => {
  const {loggedIn} = useSelector(state => state);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>

            {!loggedIn ? <Stack.Screen name="Auth" component={Auth} /> : null}

            <Stack.Screen name="BottomTab" component={BottomTab} />
        
      </Stack.Navigator>
    </>
  );

};

export default StackNavigator;
