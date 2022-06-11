import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ProfileHeader from '../components/Profile/ProfileHeader';
import { BACKGROUND, DARK_TEXT, TRANSPARENT } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

import TopTabNavigation from '../components/Profile/TopTabNavigation';
import { UserAvatar } from '../components/Feed/FeedHeader';
import { PRIMARY } from '../utils/colors';
import { BOLD, EXTRA_BOLD, REGULAR } from '../utils/values';

const {width, height} = Dimensions.get('screen');
export const PROFILE_HEADER_SIZE = width;

const Profile = ({navigation, route}) => {
    const {user_id, user_avatar, user_name} = useSelector(state => state);
    
    const {uid, uname, uavatar} = route.params

    return(
        <>
            <View style={{height: PROFILE_HEADER_SIZE - 90, backgroundColor: BACKGROUND}}>

                <LinearGradient
                    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                    locations={[0,0.2,0.6]}
                    colors={['#ffffff', '#ffffff60', PRIMARY]}
                    style={styles.headerOval}
                />

                <ProfileHeader navigation={navigation} style={{paddingTop: 10, paddingHorizontal: 10}}
                    uid={route && route.params ? uid : user_id} user_id={user_id} />

                <View style={styles.profileHeaderDetails}>

                    <UserAvatar size={100} avatar={route && route.params ? uavatar : user_avatar} />
                    <Text style={styles.userName}>{route && route.params ? uname : user_name}</Text>

                </View>

            </View>

            <TopTabNavigation uid={uid} />
        </>
    )
};

const styles = StyleSheet.create({
    headerOval: {
        width : PROFILE_HEADER_SIZE,
        height: PROFILE_HEADER_SIZE,
        borderRadius: PROFILE_HEADER_SIZE,
        transform: [{ scaleX: 2.5 }],
        position: 'absolute',
        top: -PROFILE_HEADER_SIZE / 4,
    },
    profileHeaderDetails: {
        width : PROFILE_HEADER_SIZE,
        height: PROFILE_HEADER_SIZE,
        borderRadius: PROFILE_HEADER_SIZE,
        position: 'absolute',
        alignItems: 'center',
        top: PROFILE_HEADER_SIZE / 6,

    },
    userName: {
        fontSize: 16,
        fontFamily: BOLD,
        color: DARK_TEXT,
        marginTop: 20
    }
});

export default Profile;