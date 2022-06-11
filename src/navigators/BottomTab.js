import React, {useRef} from 'react';
import { Dimensions, Animated, Platform, StyleSheet } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AddRecipe from '../screens/AddRecipe';
import Feed from '../screens/Feed';
import Notifications from '../screens/Notifications';

import { ACCENT, INACTIVE, LIGHT_TEXT, ACTIVE } from '../utils/colors';

const ICON_SIZE = 22;

const Tab = createBottomTabNavigator();

const BottomTab = () => {

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  return (
    <>

      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          showLabel:false,
          activeTintColor:ACTIVE,
          inactiveTintColor:INACTIVE,
          style:{
            backgroundColor: LIGHT_TEXT,
            marginHorizontal: 16,
            bottom: 16,
            borderRadius: 15,
            height: (Platform.OS === 'ios') ? 80 : 60,
            paddingHorizontal: 10,
            position: 'relative',
            elevation: 5
          }
        }}>

        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({color, focused}) => (
              <Ionicons
                name={focused ? 'md-home' : 'md-home-outline'}
                color={color}
                size={focused ? ICON_SIZE + 5 : ICON_SIZE}
              />
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true
              }).start();
            }
          })}
        />
        
        <Tab.Screen
          name="AddRecipe"
          component={AddRecipe}
          options={{
            tabBarIcon: ({ color, focused }) => (
                <MaterialIcons
                  name={focused ? 'add-circle' : 'add-circle-outline'}
                  color={color}
                  size={focused ? ICON_SIZE + 12 : ICON_SIZE + 5}
                />
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1.1,
                useNativeDriver: true
              }).start();
            }
          })}
        />
        
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Octicons
                name={focused ? 'bell-fill' : 'bell'}
                color={color}
                size={focused ? ICON_SIZE + 5 : ICON_SIZE}
              />
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2.18,
                useNativeDriver: true
              }).start();
            }
          })}
        />

      </Tab.Navigator>

      <Animated.View
        style={{
          width: getWidth() - 50,
          height: 3,
          backgroundColor: ACTIVE,
          position: 'absolute',
          bottom: 20,
          left: 55,
          borderRadius: 20,
          elevation: 6,
          transform: [
            { translateX: tabOffsetValue }
          ]
        }}
      />

    </>
  );
};

function getWidth() {
  let width = Dimensions.get("window").width

  width = width - 80

  // number of tabs
  return width / 3
}

const styles = StyleSheet.create({
  addButtonContainer: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    borderRadius: ICON_SIZE,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default BottomTab;
