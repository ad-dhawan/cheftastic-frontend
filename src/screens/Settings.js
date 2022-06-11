import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import PageHeader from '../components/PageHeader';
import { BACKGROUND, DARK_TEXT, GREY, LIGHT_TEXT, PRIMARY } from '../utils/colors';
import { REGULAR, FEED_ITEM_RADIUS } from '../utils/values';

const list = [
    {
        text: 'account information',
    },
    {
        text: 'share cheftastic',
    },
    {
        text: 'rate cheftastic',
    },
    {
        text: 'about us',
    },
    {
        text: 'community guidelines',
    },
    {
        text: 'delete account',
    },
]

const Settings = ({navigation}) => {
    const dispatch = useDispatch();

    const onSignOut = async() => {
        dispatch({type: 'LOGOUT'});
        navigation.replace('Auth');
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <View style={{flex: 1, backgroundColor: BACKGROUND}}>

                <PageHeader title="settings" navigation={navigation} />

                <FlatList
                    data={list}
                    contentContainerStyle={{marginTop: 10}}
                    renderItem={({item}) => (
                        <>
                            <Text style={styles.listText}>{item.text}</Text>
                            <View style={styles.divider} />
                        </>
                    )}
                />

                <View style={styles.bottomItemsContainer}>

                    <Text style={styles.version}>v {DeviceInfo.getVersion()}</Text>
                    
                    <TouchableOpacity style={styles.signOutButtonContainer} activeOpacity={0.9}
                        onPress={onSignOut} >
                        <Text style={styles.signOutButtonText}>sign out</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </>
    )
};

const styles = StyleSheet.create({
    listText: {
        width: '100%',
        backgroundColor: LIGHT_TEXT,
        fontSize: 18,
        fontFamily: REGULAR,
        paddingHorizontal: 10,
        paddingVertical: 15,
        color: DARK_TEXT
    },
    divider: {
        height: 0.5,
        borderWidth: 1,
        borderColor: GREY
    },
    bottomItemsContainer: {
        alignItems: 'center',
        bottom: 20
    },
    version: {
        fontSize: 12,
        fontFamily: REGULAR,
        color: DARK_TEXT,
        marginBottom: 5
    },
    signOutButtonContainer: {
        width: '85%',
        backgroundColor: PRIMARY,
        paddingVertical: 12,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: FEED_ITEM_RADIUS
    },
    signOutButtonText: {
        fontSize: 15,
        fontFamily: REGULAR,
        color: LIGHT_TEXT
    }
});

export default Settings;