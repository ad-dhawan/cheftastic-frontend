import React from 'react';
import { View } from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheftasticIcon from '../CheftasicIcon';

import ContentList from './ContentList';
import {ACCENT, BACKGROUND, DARK_TEXT, GREY, TRANSPARENT} from '../../utils/colors';
import {REGULAR} from '../../utils/values';
import { PROFILE_HEADER_SIZE } from '../../screens/Profile';

const Tab = createMaterialTopTabNavigator();
const ICON_SIZE = 22;

const TopTabNavigation = ({uid}) => {
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
          },
          indicatorStyle: {
            backgroundColor: ACCENT,
            height: 4,
            borderRadius: 4,
            width: 100,
            left: 45,
          },
        }}>
        <Tab.Screen
          name="UserFeed"
          component={ContentList}
          initialParams={{uid: uid, screen: 'feed'}}
          options={{
            tabBarIcon: ({color, focused}) => (
              <Ionicons
                name={focused ? 'grid' : 'grid-outline'}
                color={color}
                size={focused ? ICON_SIZE + 3 : ICON_SIZE}
              />
            ),
          }}
        />

        <Tab.Screen
          name="UserSaved"
          component={ContentList}
          initialParams={{uid: uid, screen: 'saved'}}
          options={{
            tabBarIcon: ({color, focused}) => (
              <Ionicons
                name={focused ? 'bookmark' : 'bookmark-outline'}
                color={color}
                size={focused ? ICON_SIZE + 3 : ICON_SIZE}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TopTabNavigation;
