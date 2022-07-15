import React, {useState} from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';

import PageHeader from '../components/PageHeader';
import { BACKGROUND, CHECK, DARK_TEXT, GREY, LIGHT_TEXT } from '../utils/colors';
import { GetData } from '../services/axios';

const USER_AVATAR_SIZE = 100

const EditProfile = ({navigation}) => {
    const {user_email, user_id, user_avatar, user_name} = useSelector(state => state);
    const dispatch = useDispatch();

    const [userName, setUserName] = useState(user_name);
    const [userAvatar, setUserAvatar] = useState(user_avatar);

    const onPressDone = () => {
        const formData = new FormData();

        formData.append('user_id', user_id);

        if(userName !== user_name || userAvatar !== user_avatar){
            formData.append('name', userName);

            userAvatar !== user_avatar ? formData.append('user_avatar', {
                uri: userAvatar,
                name: `${user_id}_${Date.now()}`,
                type: 'multipart/form-data',
            }) : null

            GetData.editUser(formData).then(response => {
                if(response && response.status === 200) {
                    console.log("RESPONSE: ", response.data)
                    
                    dispatch({
                        type: 'EDIT_USER',
                        payload: {
                            user_name: response.data.name,
                            user_avatar: response.data.user_avatar,
                        },
                    });

                    navigation.goBack()
                }
                else console.log(response);
            });

        } else navigation.goBack();
    }

    const onPressChangeImage = () => {
        ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
            },
            res => {
                if(res && res.assets){
                    console.log(res.assets[0].uri)
                    setUserAvatar(res.assets[0].uri)
                }
            },
        );
    }

    return (
        <>
            <PageHeader title="edit profile" navigation={navigation} />

            <TouchableOpacity onPress={onPressDone} activeOpacity={1} style={styles.doneButton} hitSlop={styles.hitSlop} >
                <Entypo name="check" size={30} color={CHECK} />
            </TouchableOpacity>

            <View style={styles.mainContainer} >

                <View>
                    <Image source={{uri: userAvatar}} style={styles.userAvatar} />
                    <TouchableOpacity onPress={onPressChangeImage} activeOpacity={1} hitSlop={styles.hitSlop} style={styles.editPencilContainer}>
                        <MaterialCommunityIcons name="pencil-outline" size={20} color={DARK_TEXT} />
                    </TouchableOpacity>
                </View>

                <TextInput
                    value={userName}
                    style={styles.input}
                    onChangeText={(text) => setUserName(text)}
                    placeholderTextColor={GREY}
                />

                <TextInput
                    value={user_email}
                    style={[styles.input, {color: GREY, marginTop: 20}]}
                    placeholderTextColor={GREY}
                    editable={false}
                    selectTextOnFocus={false}
                />

            </View>
        </>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        paddingTop: 20,
        alignItems: 'center'
    },
    doneButton: {
        backgroundColor: BACKGROUND,
        position: 'absolute',
        top: 15,
        right: 20
    },
    hitSlop: {
        top: 10,
        bottom: 10,
        left: 10.,
        right: 10
    },
    editPencilContainer: {
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: LIGHT_TEXT,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    input: {
        backgroundColor: LIGHT_TEXT,
        color: DARK_TEXT,
        borderRadius: 8,
        elevation: 2,
        paddingHorizontal: 10,
        width: '90%',
        marginTop: 30
    },
    userAvatar: {
        width: USER_AVATAR_SIZE,
        height: USER_AVATAR_SIZE,
        borderRadius: USER_AVATAR_SIZE
    }
});

export default EditProfile;