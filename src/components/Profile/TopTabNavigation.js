import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ContentList from './ContentList';
import {ACCENT, BACKGROUND, DARK_TEXT, GREY, TRANSPARENT} from '../../utils/colors';
import {REGULAR} from '../../utils/values';
import { PROFILE_HEADER_SIZE } from '../../screens/Profile';

const Tab = createMaterialTopTabNavigator();
const ICON_SIZE = 22;

const TopTabNavigation = () => {
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          activeTintColor: ACCENT,
          inactiveTintColor: GREY,
          pressColor: 'transparent',
          pressOpacity: 1,
          style: {
            backgroundColor: BACKGROUND,
            elevation: 0,
            height: 55,
            top: PROFILE_HEADER_SIZE / 2
          },
          indicatorStyle: {
            backgroundColor: ACCENT,
            height: 4,
            borderRadius: 4,
            width: 100,
            left: 45,
          },
          tabStyle: {
            //   top: PROFILE_HEADER_SIZE / 2
            backgroundColor: BACKGROUND
          }
        }}>
        <Tab.Screen
          name="UserFeed"
          component={ContentList}
          options={{
            tabBarIcon: ({color, focused}) => (
              <Ionicons
                name={focused ? 'grid' : 'grid-outline'}
                color={color}
                size={focused ? ICON_SIZE + 5 : ICON_SIZE}
              />
            ),
          }}
        />

        <Tab.Screen
          name="UserSaved"
          component={ContentList}
          options={{
            tabBarIcon: ({color, focused}) => (
              <Ionicons
                name={focused ? 'bookmark' : 'bookmark-outline'}
                color={color}
                size={focused ? ICON_SIZE + 5 : ICON_SIZE}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TopTabNavigation;
