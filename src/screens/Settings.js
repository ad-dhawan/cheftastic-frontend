import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PageHeader from '../components/PageHeader';
import { BACKGROUND, DARK_TEXT, GREY, LIGHT_TEXT, PRIMARY } from '../utils/colors';
import { REGULAR, FEED_ITEM_RADIUS } from '../utils/values';

const list = [
    {
        text: 'account information',
        icon: <Feather name="user" size={20} color={DARK_TEXT} />
    },
    {
        text: 'share cheftastic',
        icon: <Entypo name="share" size={20} color={DARK_TEXT} />
    },
    {
        text: 'rate cheftastic',
        icon: <Entypo name="star" size={20} color={DARK_TEXT} />
    },
    {
        text: 'about us',
        icon: <Foundation name="info" size={20} color={DARK_TEXT} />
    },
    {
        text: 'community guidelines',
        icon: <Feather name="book-open" size={20} color={DARK_TEXT} />
    },
    {
        text: 'delete account',
        icon: <MaterialCommunityIcons name="delete" size={20} color={DARK_TEXT} />
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
                            <View style={styles.listItem}>
                                {item.icon}
                                <Text style={styles.listText}>{item.text}</Text>
                            </View>

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
    listItem: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: LIGHT_TEXT,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10
    },
    listText: {
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