import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native'

import {BACKGROUND} from '../utils/colors'

const FallBack = () => {
    return(
        <>
            <View style={{
                backgroundColor: BACKGROUND,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }} >
                <LottieView
                    source={require('../assets/lottie/cookingAnim.json')}
                    loop={true}
                    autoPlay={true}
                    style={{width: '60%'}}
                />
            </View>
        </>
    )
}

export default FallBack;