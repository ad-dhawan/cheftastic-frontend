import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import VersionCheck from 'react-native-version-check';

import { BACKGROUND, DARK_TEXT, LIGHT_TEXT, PRIMARY } from '../../utils/colors';
import { NOTIFICATION_LIKE_HEIGHT, NOTIFICATION_LIKE_RADIUS, REGULAR, BOLD } from '../../utils/values';

const AppUpdate = () => {
    return(
        <>
            <View style={styles.mainContainer}>
                <Text style={styles.messageText}>New update available</Text>

                <TouchableOpacity 
                    activeOpacity={1} 
                    hitSlop={styles.hitSlop} 
                    onPress={() => Linking.openURL(`market://details?id=${VersionCheck.getPackageName()}`)} 
                    style={styles.updateButtonContainer}
                >
                    <Text style={styles.updateText}>Update</Text>
                </TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: LIGHT_TEXT,
        height: NOTIFICATION_LIKE_HEIGHT,
        padding: 10,
        marginBottom: 15,
        borderRadius: NOTIFICATION_LIKE_RADIUS,
        justifyContent: 'center'
    },
    messageText: {
        fontSize: 13,
        fontFamily: REGULAR,
        color: DARK_TEXT
    },
    updateButtonContainer: {
        position: 'absolute',
        backgroundColor: PRIMARY,
        height: NOTIFICATION_LIKE_HEIGHT - 20,
        justifyContent: 'center',
        paddingHorizontal: 15,
        right: 10,
        borderRadius: NOTIFICATION_LIKE_RADIUS
    },
    updateText: {
        fontSize: 13,
        fontFamily: BOLD,
        color: LIGHT_TEXT
    },
    hitSlop: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }
});

export default AppUpdate;