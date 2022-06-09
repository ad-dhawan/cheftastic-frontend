import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { PROFILE_HEADER_SIZE } from '../../screens/Profile';
import { BACKGROUND } from '../../utils/colors';

const ContentList = () => {
    return(
        <>
            <View style={{flex: 1, backgroundColor: BACKGROUND, top: PROFILE_HEADER_SIZE / 2}}>
                <Text>Content List</Text>
            </View>
        </>
    )
};

const styles = StyleSheet.create({});

export default ContentList;