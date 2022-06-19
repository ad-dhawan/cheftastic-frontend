import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DARK_TEXT, LIGHT_TEXT, PRIMARY } from '../../utils/colors';
import { BOLD, REGULAR } from '../../utils/values';

const Welcome = ({navigation}) => {
    return(
        <>
            <View style={styles.mainContainer}>
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Image source={require('../../assets/cheftastic_logo_white.png')} style={styles.logo} />

                <TouchableOpacity onPress={() => navigation.navigate('Feed')} activeOpacity={1} style={styles.exploreContainer}>
                    <Text style={styles.exploreText}>Create and explore recipes</Text>
                </TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        backgroundColor: PRIMARY,
        borderRadius: 10,
    },
    welcomeText: {
        fontSize: 18,
        color: LIGHT_TEXT,
        fontFamily: BOLD,
        marginVertical: 10
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    exploreContainer: {
        backgroundColor: LIGHT_TEXT,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    exploreText: {
        fontSize: 14,
        color: PRIMARY,
        fontFamily: REGULAR
    },
});

export default Welcome;