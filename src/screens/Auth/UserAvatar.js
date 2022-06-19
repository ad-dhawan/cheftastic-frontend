import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import { GetData } from '../../services/axios';
import { ACCENT, BACKGROUND, DARK_TEXT, DULL_ACCENT, DULL_BACKGROUND, DULL_BG, GREY, LIGHT_TEXT, PRIMARY, TRANSPARENT } from '../../utils/colors';
import { BOLD, REGULAR } from '../../utils/values';
import CacheImage from '../../components/CacheImage';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = (width / 3) - 30
const ARROW_SIZE = 50

const UserAvatar = ({navigation, route}) => {
    const dispatch = useDispatch();

    const {avatars, userInfo, username} = route.params;
    const [selectedItem, setSelectedItem] = useState(userInfo.user.photo);

    const ListItem = ({item}) => {
        return(
            <>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setSelectedItem(item)}
                    style={[styles.imageBorder, {
                        backgroundColor: selectedItem === item ? DULL_ACCENT : TRANSPARENT,
                        borderColor: selectedItem === item ? ACCENT : TRANSPARENT
                    }]}
                >
                    <CacheImage uri={item} style={styles.avatar} /> 
                </TouchableOpacity>
            </>
        )
    }

    async function onRegisterUser () {
        const token = await messaging().getToken();

        const data = {
            email: userInfo.user.email,
            name: username,
            user_avatar: selectedItem,
            id_token: userInfo.idToken,
            fcm_token: token
        };

        GetData.registerUser(data).then(res => {

            if (res && res.status === 409) {
                
                console.log("LOGIN DATA: ", res.data);

                dispatch({
                type: 'LOGIN',
                payload: {
                    ...data,
                    user_name: username,
                    user_email: userInfo.user.email,
                    user_avatar: selectedItem,
                    id_token: userInfo.idToken,
                    fcm_token: token
                },
                });

                navigation.replace('BottomTab')

            } else console.log(res)
        });
    }

    return(
        <>
            <View style={styles.mainContainer}>

                <Text style={styles.avatarHeading}>Choose your avatar</Text>
                <FlatList
                    data={avatars}
                    numColumns={3}
                    contentContainerStyle={{marginTop: 10, paddingBottom: ITEM_WIDTH + 30}}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    // ListHeaderComponent={() => <ListItem item={userInfo.user.photo} />}
                    renderItem={({item}) => (
                        <ListItem item={item.metadata.mediaLink} />
                    )}
                />

                <LinearGradient
                    colors={[TRANSPARENT, DULL_BACKGROUND, BACKGROUND]}
                    style={styles.linearGradient}
                />

                <View style={styles.arrowsContainer}>
                <TouchableOpacity 
                        onPress={() => navigation.goBack()} 
                        hitSlop={styles.hitSlop} 
                        activeOpacity={1} 
                        style={styles.arrowContainer}
                    >
                        <AntDesign name="arrowleft" size={20} color={LIGHT_TEXT} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => onRegisterUser()} 
                        hitSlop={styles.hitSlop} 
                        activeOpacity={1}
                        disabled={selectedItem !== '' ? false : true} 
                        style={[styles.arrowContainer, {
                            backgroundColor: selectedItem !== '' ? PRIMARY : GREY 
                        }]}
                    >
                        <AntDesign name="arrowright" size={20} color={LIGHT_TEXT} />
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        padding: 10,
        paddingTop: 30
    },
    arrowsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width,
        bottom: 30
    },
    hitSlop: {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
    },
    arrowContainer: {
        backgroundColor: PRIMARY,
        padding: 15,
        borderRadius: ARROW_SIZE,
        width: ARROW_SIZE,
        height: ARROW_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginHorizontal: 10
    },
    avatarHeading: {
        fontSize: 14,
        color: DARK_TEXT,
        fontFamily: BOLD,
        textTransform: 'lowercase'
    },
    avatar: {
        height: ITEM_WIDTH,
        width: ITEM_WIDTH
    },
    imageBorder: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 4,
        marginBottom: 10,
        borderColor: TRANSPARENT
    },
    linearGradient: {
        height: 200,
        width,
        position: 'absolute',
        bottom: 0
    }
});

export default UserAvatar;