import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { GetData } from '../../services/axios';
import { BACKGROUND, DARK_TEXT, DULL_BG, GREY, LIGHT_TEXT, PRIMARY, TRANSPARENT } from '../../utils/colors';
import { REGULAR } from '../../utils/values';

const ARROW_SIZE = 50

const UserDetails = ({navigation, route}) => {
    const user = route.params.userInfo
    const [username, setUsername] = useState(user.user.name);
    const email = user.user.email;
    const [avatars, setAvatars] = useState([])
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        GetData.getDefaultAvatars().then(res => {
          if (res && res.status === 200) {
              setAvatars(res.data)
              setLoaded(true);
          } else console.log(res);
        });
      }, [])

      async function onPressArrow () {
          loaded ? navigation.navigate('UserAvatar', {userInfo: user, avatars: avatars, username: username}) : onPressArrow()
      }

    return(
        <>
            <View style={styles.mainContainer}>

                <Text style={styles.usernameLabel}>Username</Text>
                <TextInput
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholder="Your name here"
                    placeholderTextColor={GREY}
                    style={styles.usernameTextInput}
                />

                <Text style={styles.usernameLabel}>Email</Text>
                <TextInput
                    defaultValue={email}
                    editable={false}
                    style={[styles.usernameTextInput, {color: DULL_BG}]}
                />

                <TouchableOpacity 
                    onPress={() => onPressArrow()} 
                    hitSlop={styles.hitSlop} 
                    activeOpacity={1} 
                    style={styles.arrowContainer}
                >
                    <AntDesign name="arrowright" size={20} color={LIGHT_TEXT} />
                </TouchableOpacity>

            </View>
        </>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
        paddingTop: 30,
        flex: 1,
        backgroundColor: BACKGROUND
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
        marginRight: 10
    },
    usernameLabel: {
        color: DARK_TEXT,
        fontSize: 12,
        fontFamily: REGULAR,
        marginLeft: 5
    },  
    usernameTextInput: {
        backgroundColor: BACKGROUND,
        color: DARK_TEXT,
        borderRadius: 8,
        elevation: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    hitSlop: {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
    }
});

export default UserDetails;