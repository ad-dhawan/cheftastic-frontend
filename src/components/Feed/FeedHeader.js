import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons'

import {DARK_TEXT} from '../../utils/colors';
import RoundButton from '../RoundButton';
import CacheImage from '../CacheImage';
import { CONTAINER_SIZE } from '../RoundButton';
import { size } from 'lodash';

const {WIDTH} = Dimensions.get('screen');

export const UserAvatar = ({size, onPress, avatar}) => (
    <TouchableOpacity hitSlop={styles.hitSlop} style={{height: size, width: size, borderRadius: size}} onPress={onPress} >
        <CacheImage uri={avatar} style={{height: size, width: size, borderRadius: size}} />
    </TouchableOpacity>
)

const FeedHeader = () => {
    const {user_avatar} = useSelector(state => state);

    return(
        <>
            <View style={styles.header}>
                
                <UserAvatar size={CONTAINER_SIZE} onPress={() => console.log('PROFILE BUTTON PRESSED')} avatar={user_avatar} />

                <Text style={styles.headerTitle}>Cheftastic</Text>

                <RoundButton icon={<Ionicons name="ios-search" size={22} color={DARK_TEXT} />} onPress={() => console.log("PRESSED MENU BUTTON")} />

            </View>
        </>
    )
};

const styles = StyleSheet.create({
  header: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10
  },
  hitSlop: {
      top: 10,
      bottom: 10,
      right: 10,
      left: 10
  },
});

export default FeedHeader;