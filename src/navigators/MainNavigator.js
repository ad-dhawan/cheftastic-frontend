import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import Feed from '../screens/Feed';

const MainNavigator = () => {
  return (
    <Feed />
  );
};

export default MainNavigator;
