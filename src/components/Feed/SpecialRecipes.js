import React from 'react'
import { View } from 'react-native'

import Carousel from './Caraousel'

const SpecialRecipes = (props) => {
    return (
        <>
            <View style={props.style}>
                <Carousel data={props.data} />
            </View>
            
        </>
    )
}

export default SpecialRecipes
