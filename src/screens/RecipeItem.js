import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Header from '../components/RecipeItem/Header';

const RecipeItem = ({route, navigation}) => {
    const data = route.params.data;
    return(
        <>
            <Header navigation={navigation} item={data} />
        </>
    )
};

export default RecipeItem;