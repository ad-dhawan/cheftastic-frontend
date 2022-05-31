import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

import AddRecipe from '../screens/AddRecipe';
import Feed from '../screens/Feed';
import Notifications from '../screens/Notifications';

import { ACTIVE, INACTIVE } from '../utils/colors';

const ICON_SIZE = 28;

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarStyle={{backgroundColor: '#000'}}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: INACTIVE,
        tabBarActiveTintColor: ACTIVE,
        tabBarStyle: {
          backgroundColor: '#fff',
        },
      }}>

      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons
            name={focused ? 'md-home' : 'md-home-outline'}
              color={color}
              size={ICON_SIZE}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="AddRecipe"
        component={AddRecipe}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'ios-add-circle-sharp' : 'ios-add-circle-outline'}
              color={color}
              size={ICON_SIZE}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={focused ? 'bell-fill' : 'bell'}
              color={color}
              size={ICON_SIZE}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default BottomTab;
