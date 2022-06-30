import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Ingredients from './Ingredients';
import Instructions from './Instructions';
import {ACCENT, BACKGROUND, GREY, LIGHT_TEXT, PRIMARY} from '../../utils/colors';

const Tab = createMaterialTopTabNavigator();
const TAB_BORDER_RADIUS = 20;

const TopTabNavigation = ({data}) => {
  return (
    <>
      <Tab.Navigator
      swipeEnabled={false}
        tabBarOptions={{
          showIcon: false,
          showLabel: true,
          activeTintColor: LIGHT_TEXT,
          inactiveTintColor: PRIMARY,
          pressColor: 'transparent',
          pressOpacity: 1,
          style: {
            backgroundColor: LIGHT_TEXT,
            elevation: 0,
            height: 50,
            borderRadius: TAB_BORDER_RADIUS,
            marginTop: 15,
            justifyContent: 'center',
          },
          indicatorStyle: {
            backgroundColor: PRIMARY,
            borderRadius: TAB_BORDER_RADIUS,
            height: '100%',
          },
        }}>
        <Tab.Screen
          name="Ingredients"
          component={Ingredients}
          initialParams={{data: data.ingredients}}
        />

        <Tab.Screen
          name="Instructions"
          component={Instructions}
          initialParams={{data: data.recipe}}
        />
      </Tab.Navigator>
    </>
  );
};

export default TopTabNavigation;
