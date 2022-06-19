import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';

import Header from '../components/RecipeItem/Header';
import { BACKGROUND, PRIMARY } from '../utils/colors';
import { RECIPE_ITEM_HEIGHT, RECIPE_ITEM_WIDTH, DARK_TEXT } from '../utils/values'

const {width, height} = Dimensions.get('screen')

const RecipeItem = ({route, navigation}) => {
    const data = route.params.data;
    return(
        <>
            <ScrollView style={{backgroundColor: BACKGROUND}} >

                <Header navigation={navigation} item={data} />

                <View style={styles.itemContainer}>
                    <Text>aur vai kidda</Text>
                </View>

            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: BACKGROUND,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        bottom: 20,
        padding: 15,
        height: '100%'
    }
})

export default RecipeItem;