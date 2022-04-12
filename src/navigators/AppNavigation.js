import React, {useEffect, useState} from 'react';
import { Animated, Text, SafeAreaView } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import {useSelector} from 'react-redux';
import NetInfo from "@react-native-community/netinfo";

import OnBoarding from '../screens/OnBoarding';
import Auth from '../screens/Auth';
import Feed from '../screens/Feed';
import { DARK_TEXT, LIGHT_TEXT } from '../utils/colors';

const Stack = createStackNavigator();

enableScreens();

const AppNavigation = () => {
    const {newUser, loggedIn} = useSelector(state => state);
    const [isConnected, setIsConnected] = useState(true)

    useEffect(() => {
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            state.isConnected ? setIsConnected(true) : setIsConnected(false)
        });
        
        // Unsubscribe
        unsubscribe();
    }, [])

    return (
        <>
            {!isConnected ? (
                <Animated.SafeAreaView style={{backgroundColor: 'red', alignItems: 'center'}}>
                    <Text style={{color: LIGHT_TEXT}}>Offline</Text>
                </Animated.SafeAreaView>
            ) : null}

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                 }}
            >
                {newUser ? (
                    <Stack.Screen name="OnBoarding" component={OnBoarding} />
                ) : null}

                {loggedIn ? (
                    <Stack.Screen name="Auth" component={Auth} />
                ) : null}

                <Stack.Screen name="Feed" component={Feed} />

            </Stack.Navigator>
        </>
    )
}

export default AppNavigation;