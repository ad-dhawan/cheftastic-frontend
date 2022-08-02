import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../components/RecipeItem/Header';
import { BACKGROUND, COOKING_DIFFICULTY_BG, COOKING_TIME, COOKING_TIME_BG, COOKING_DIFFICULTY, CALORIES_BG, CALORIES, DARK_TEXT, VEG, NON_VEG, LIKE, GREY, LIGHT_TEXT } from '../utils/colors';
import { EXTRA_BOLD, RECIPE_ITEM_HEIGHT, REGULAR } from '../utils/values'
import TopTabNavigation from '../components/RecipeItem/TopTabNavigation';
import { UserAvatar } from '../components/Feed/FeedHeader';
import { GetData } from '../services/axios';

const MEAL_DETAILS_ICON_SIZE = 25

const RecipeItem = ({route, navigation}) => {
    const {user_id} = useSelector(state => state);
    const data = route.params.data;

    const [isLiked, setIsLiked] = useState(data.likes.includes(user_id))

    function likeRecipe() {
        isLiked ? setIsLiked(false) : setIsLiked(true);
        
        GetData.likeRecipe(data._id, {user_id: user_id}).then(res => {
            if (res && res.status === 200) {
                console.log(res.data);
            } else console.log(res);
        });
    }

    return(
        <>
                <ScrollView nestedScrollEnabled contentContainerStyle={{flexGrow: 1}} >

                    <Header navigation={navigation} item={data} />

                    <TouchableOpacity onPress={() => likeRecipe()} activeOpacity={1} style={styles.heartContainer} >
                        <MaterialCommunityIcons name={isLiked ? 'cards-heart' : 'cards-heart-outline'}
                            size={28} color={isLiked ? LIKE : GREY}
                        />
                    </TouchableOpacity>

                    <View style={styles.itemContainer}>

                        <View style={styles.mealNameContainer}>
                            <Text style={styles.mealName}>{data.meal_name}</Text>

                            <View style={[styles.filterIcon, {borderColor: data.meal_type === 'non-veg' ? NON_VEG : VEG}]}>
                                <View style={[styles.filterCircle, {backgroundColor: data.meal_type === 'non-veg' ? NON_VEG : VEG}]} />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile', {"uid": data.user_id, "uavatar": data.user_avatar, "uname": data.user_name})}
                            activeOpacity={1}
                            style={styles.userAvatarContainer}
                        >
                            <UserAvatar size={18} avatar={data.user_avatar} />
                            <Text style={styles.userName}>{data.user_name}</Text>
                        </TouchableOpacity>

                        <View style={styles.mealDetailsParentContainer}>

                            {data.meal_cooking_time ? (
                                <View style={[styles.mealDetailsContainer, {backgroundColor: COOKING_TIME_BG}]}>
                                    <Feather name="clock" size={MEAL_DETAILS_ICON_SIZE} color={COOKING_TIME} />
                                    <Text numberOfLines={2} style={[styles.mealDetailText, {color: COOKING_TIME}]}>{data.meal_cooking_time}</Text>
                                </View>
                            ) : null}

                            {data.meal_difficulty ? (
                                <View style={[styles.mealDetailsContainer, {backgroundColor: COOKING_DIFFICULTY_BG}]}>
                                    <Fontisto name="star" size={MEAL_DETAILS_ICON_SIZE} color={COOKING_DIFFICULTY} />
                                    <Text style={[styles.mealDetailText, {color: COOKING_DIFFICULTY}]}>{data.meal_difficulty}</Text>
                                </View>
                            ) : null}

                            {data.meal_calories ? (
                                <View style={[styles.mealDetailsContainer, {backgroundColor: CALORIES_BG}]}>
                                    <Fontisto name="fire" size={MEAL_DETAILS_ICON_SIZE} color={CALORIES} />
                                    <Text style={[styles.mealDetailText, {color: CALORIES}]}>{data.meal_calories}</Text>
                                </View>
                            ) : null}

                        </View>

                        <TopTabNavigation data={data} />

                    </View>
                        
                </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    heartContainer: {
        height: 50,
        width: 50,
        backgroundColor: BACKGROUND,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: RECIPE_ITEM_HEIGHT - 50,
        elevation: 0.1
    },
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
        flexDirection: 'row',
    },
    mealDetailsContainer: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 7,
        flex: 1,
        marginHorizontal: 5
    },
    mealDetailText: {
        fontSize: 12,
        fontFamily: REGULAR,
        marginTop: 8,
        textTransform: 'capitalize',
    },
    mealNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mealName: {
        fontSize: 18,
        fontFamily: EXTRA_BOLD,
        color: DARK_TEXT
    },
    userAvatarContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    userName: {
        fontSize: 12,
        color: DARK_TEXT,
        fontFamily: REGULAR,
        marginLeft: 5
    },
    filterIcon: {
        height: 22,
        width: 22,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent:'center',
        alignItems: 'center',
    },
    filterCircle: {
        width: 12,
        height: 12,
        borderRadius: 20,
    },
})

export default RecipeItem;