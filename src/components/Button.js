import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {ACCENT, LIGHT_TEXT, DARK_TEXT} from '../utils/colors'

const Button = ({style, text, onPress, disabled}) => {
  return (
    <TouchableOpacity style={[style, styles.main]} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: ACCENT,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: 0.6,
        shadowRadius: 2,  
        elevation: 3,
    },
    text: {
        color: DARK_TEXT,
        fontSize: 16
    }
});

export default Button;
