import React from 'react';
import {View, Text} from 'react-native';

import {PRIMARY, BLACK_TEXT, BACKGROUND} from '../utils/colors'

const Auth = () => {
    return(
        <View style={{backgroundColor: BACKGROUND, flex: 1}}>
            <Text style={{color: BLACK_TEXT}}>Authentication Screen</Text>
        </View>
    )
}

export default Auth;