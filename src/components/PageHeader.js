import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'

import { BACKGROUND, DARK_TEXT } from '../utils/colors';
import {BOLD, REGULAR} from '../utils/values'
import RoundButton from './RoundButton';

const PageHeader = ({navigation, title}) => {
    return(
        <>
            <View style={styles.headerContainer}>

                <RoundButton icon={<Entypo name="chevron-left" size={22} color={DARK_TEXT} />} onPress={() => navigation.goBack()} />

                <Text style={styles.title}>{title}</Text>

            </View>
        </>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8,
        paddingHorizontal: 8,
        backgroundColor: BACKGROUND
    },
    title: {
        fontSize: 17,
        textTransform: 'capitalize',
        fontFamily: BOLD,
        marginLeft: 14
    }
});

export default PageHeader;