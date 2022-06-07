import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import { DARK_TEXT, LIGHT_TEXT } from '../utils/colors';

const Loader = ({style}) => {
    return(
        <>
            <ActivityIndicator size="small" color={DARK_TEXT} style={[style, {width: '100%', position: 'absolute'}]} />
        </>
    )
};

export default Loader;
