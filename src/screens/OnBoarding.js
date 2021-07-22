import React from 'react';
import {View, Text} from 'react-native';

import {PRIMARY, BLACK_TEXT, BACKGROUND} from '../utils/colors'

const OnBoarding = () => {
    return(
        <View style={{backgroundColor: BACKGROUND, flex: 1}}>
            <Text style={{color: BLACK_TEXT}}>Onboarding Screen</Text>
        </View>
    )
}

export default OnBoarding;