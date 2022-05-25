import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { DARK_TEXT } from '../../utils/colors'
import {EXTRA_BOLD, BOLD} from '../../utils/values'

const SpecialRecipes = (props) => {
    return (
        <>
            <View style={props.style}>
                <Text style={styles.heading}>specials for you</Text>
            </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 14,
        fontFamily: BOLD,
        textTransform: 'lowercase',
        color: DARK_TEXT
    }
})

export default SpecialRecipes
