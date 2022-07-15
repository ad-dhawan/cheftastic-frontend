import React from 'react';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ContentList from './ContentList';
import {ACCENT, BACKGROUND, DARK_TEXT, GREY, TRANSPARENT} from '../../utils/colors';

const Tab = createMaterialTopTabNavigator();
const ICON_SIZE = 22;

const TopTabNavigation = ({uid, navigation}) => {
  const {user_id} = useSelector(state => state);

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
            backgroundColor: uid === user_id ? ACCENT : TRANSPARENT,
            height: 4,
            borderRadius: 4,
            width: 100,
            left: 45,
          },
        }}>
        <Tab.Screen
          name="UserFeed"
          component={ContentList}
          initialParams={{uid: uid, screen: 'feed', navigation: navigation}}
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
        {
          uid === user_id ? (
            <Tab.Screen
              name="UserSaved"
              component={ContentList}
              initialParams={{uid: uid, screen: 'saved', navigation: navigation}}
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
          ) : null
        }
        
      </Tab.Navigator>
    </>
  );
};

export default TopTabNavigation;
