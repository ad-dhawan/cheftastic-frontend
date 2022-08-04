import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import {useSelector} from 'react-redux';

import Auth from '../screens/Auth';
import UserDetails from '../screens/Auth/UserDetails';
import UserAvatar from '../screens/Auth/UserAvatar';
import BottomTab from './BottomTab';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Settings from '../screens/Settings';
import RecipeItem from '../screens/RecipeItem';
import AddIngredients from '../screens/AddRecipe/AddIngredients';
import AddInstructions from '../screens/AddRecipe/AddInstructions';
import Recipe from '../screens/AddRecipe/Recipe';
import Optional from '../screens/AddRecipe/Optional';
import Search from '../screens/Search';

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

            {!loggedIn ? (
              <>
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="UserDetails" component={UserDetails} />
                <Stack.Screen name="UserAvatar" component={UserAvatar} />
              </>
            ) : null}

            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="RecipeItem" component={RecipeItem} />
            <Stack.Screen name="AddIngredients" component={AddIngredients} />
            <Stack.Screen name="AddInstructions" component={AddInstructions} />
            <Stack.Screen name="Recipe" component={Recipe} />
            <Stack.Screen name="Optional" component={Optional} />
            <Stack.Screen name="Search" component={Search} />
        
      </Stack.Navigator>
    </>
  );

};

export default StackNavigator;
