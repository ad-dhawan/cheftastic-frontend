import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';

import {PRIMARY, ACCENT, BACKGROUND, DARK_TEXT, LIGHT_TEXT} from '../utils/colors';

const {width, height} = Dimensions.get('screen');

const SecondSplash = () => {
    const {user_name} = useSelector(state => state);
    return (
        <>
            <View style={styles.mainContainer}>

                <Text style={styles.text}>hey {user_name}</Text>

                <LottieView
                  style={styles.loadingAnim}
                  source={require('../assets/lottie/cooking_loading.json')}
                  autoPlay
                  loop={true}
                  colorFilters={[
                    {
                      keypath: 'White Solid 4',
                      color: BACKGROUND,
                    },
                  ]}
                />

                <Text style={styles.text}>preparing meals for you</Text>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: DARK_TEXT,
        fontSize: 20,
        fontWeight: 'bold'
    },
    loadingAnim: {
        height: width / 1.2,
    }
})

export default SecondSplash
