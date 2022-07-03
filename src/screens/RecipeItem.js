import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Header from '../components/RecipeItem/Header';
import { BACKGROUND, COOKING_DIFFICULTY_BG, COOKING_TIME, COOKING_TIME_BG, COOKING_DIFFICULTY, CALORIES_BG, CALORIES } from '../utils/colors';
import { REGULAR } from '../utils/values'
import TopTabNavigation from '../components/RecipeItem/TopTabNavigation';

const {width, height} = Dimensions.get('screen')
const MEAL_DETAILS_ICON_SIZE = 25

const RecipeItem = ({route, navigation}) => {
    const data = route.params.data;
    return(
        <>
                <ScrollView nestedScrollEnabled contentContainerStyle={{flex: 1}} >

                    <Header navigation={navigation} item={data} />

                    <View style={styles.itemContainer}>

                        <View style={styles.mealDetailsParentContainer}>

                            <View style={[styles.mealDetailsContainer, {backgroundColor: COOKING_TIME_BG}]}>
                                <Feather name="clock" size={MEAL_DETAILS_ICON_SIZE} color={COOKING_TIME} />
                                <Text style={[styles.mealDetailText, {color: COOKING_TIME}]}>{data.meal_cooking_time}</Text>
                            </View>

                            <View style={[styles.mealDetailsContainer, {backgroundColor: COOKING_DIFFICULTY_BG}]}>
                                <Fontisto name="star" size={MEAL_DETAILS_ICON_SIZE} color={COOKING_DIFFICULTY} />
                                <Text style={[styles.mealDetailText, {color: COOKING_DIFFICULTY}]}>{data.meal_difficulty}</Text>
                            </View>

                            <View style={[styles.mealDetailsContainer, {backgroundColor: CALORIES_BG}]}>
                                <Fontisto name="fire" size={MEAL_DETAILS_ICON_SIZE} color={CALORIES} />
                                <Text style={[styles.mealDetailText, {color: CALORIES}]}>{data.meal_calories}</Text>
                            </View>

                        </View>

                        <TopTabNavigation data={data} />

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
        height: '100%',
    },
    mealDetailsParentContainer : {
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    mealDetailsContainer: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 7,
    },
    mealDetailText: {
        fontSize: 14,
        fontFamily: REGULAR,
        marginTop: 8,
        textTransform: 'capitalize'
    }
})

export default RecipeItem;