import React from 'react';
import {View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { DARK_TEXT } from '../../utils/colors';
import RoundButton from '../RoundButton';

const ProfileHeader = ({navigation, style}) => {
    return(
        <>
            <View style={[style, {justifyContent: 'space-between', flexDirection: 'row'}]} >

                <RoundButton icon={<Entypo name="chevron-left" size={22} color={DARK_TEXT} />} onPress={() => navigation.goBack()} />

                <View style={{flexDirection: 'row'}} >

                    <RoundButton icon={<MaterialIcons name="edit" size={22} color={DARK_TEXT} />} onPress={() => navigation.navigate('EditProfile')} />
                    <RoundButton icon={<MaterialIcons name="settings" size={22} color={DARK_TEXT} />} onPress={() => navigation.navigate('Settings')} style={{marginLeft: 10}} />

                </View>

            </View>
        </>
    )
};

export default ProfileHeader