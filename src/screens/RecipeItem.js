import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RecipeItem = ({route}) => {
    return(
        <>
            <Text>Recipe Item {route.params.id}</Text>
        </>
    )
};

export default RecipeItem;