import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, ToastAndroid } from 'react-native';
import {TimePicker} from 'react-native-simple-time-picker';
import { Portal, Modal } from 'react-native-paper';
import { isEmpty } from 'lodash';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'

import { GetData } from '../../services/axios';
import {styles, TitleText} from './AddRecipe';
import { BACKGROUND, DARK_TEXT, DULL_ACCENT, GREY, LIGHT_TEXT, TRANSPARENT, MINUS_SERVINGS, ADD_SERVINGS, ACCENT } from '../../utils/colors';
import { REGULAR } from '../../utils/values';

const Optional = ({navigation, route}) => {
    const {user_id} = useSelector(state => state);

    const [isLoading, setIsLoading]= useState(false)
    const [servings, setServings] = useState(1);
    const [difficulty, setDifficulty] = useState('');
    const [calories, setCalories] = useState('');
    const [caloriesFocus, setCaloriesFocus] = useState(false);
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
    });

    const onPressShareRecipe = () => {
        try{
            setIsLoading(true)
            const formData = new FormData();

            formData.append('meal_name', route.params.title);

            formData.append('image_url', {
                uri: route.params.recipeImage,
                name: `${route.params.title.replace(/ /g,'')}_${user_id}_${Date.now()}.jpeg`,
                type: 'multipart/form-data',
            });

            route.params.ingredients.map(item => {
                formData.append('ingredients', item.text)
            })

            route.params.instructions.map(item => {
                formData.append('recipe', item.text)
            })

            formData.append('meal_type', route.params.mealType);

            formData.append('chef_id', user_id);

            formData.append('meal_cooking_time', time.hours === 0 ? `${time.minutes}mins` : time.minutes !== 0 ? `${time.hours}hrs ${time.minutes}mins` : null)

            formData.append('meal_difficulty', difficulty);

            !isEmpty(calories) ?
            formData.append('meal_calories', `${calories} kcal`) : null
    
            GetData.createRecipe(formData).then(response => {
                if(response && response.status === 200) {
                    console.log("RESPONSE: ", response.data)
                    navigation.navigate('Feed');
                    setIsLoading(false);
                }
                else {
                    console.log(response)
                    navigation.navigate('Feed');
                    ToastAndroid.show("Error occurred, please try again later", ToastAndroid.SHORT);
                    setIsLoading(false);
                };
            });

        } catch (e) {
            console.log(e);
            navigation.navigate('Feed');
            ToastAndroid.show("Error occurred, please try again later", ToastAndroid.SHORT);
            setIsLoading(false);
        }
    }

    return(
        <>
        <ScrollView style={{flex: 1, backgroundColor: BACKGROUND}} >
            <View style={{paddingHorizontal: 20}} >
                    <View>
                            <TitleText text={"servings"} />

                            <View style={styles.servingsContainer}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.servingsButton, {backgroundColor: MINUS_SERVINGS}]}
                                    onPress={() => setServings(servings => servings-=1)}
                                    disabled={servings<=1 ? true : false}
                                >
                                    <Entypo name="minus" size={18} color={LIGHT_TEXT} />
                                </TouchableOpacity>

                                <Text style={styles.servingsText}>{servings}</Text>

                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.servingsButton, {backgroundColor: ADD_SERVINGS}]}
                                    onPress={() => setServings(servings => servings+=1)}
                                    disabled={servings>=10 ? true : false}
                                >
                                    <Entypo name="plus" size={18} color={LIGHT_TEXT} />
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.filtersContainer}>

                            <TouchableOpacity activeOpacity={1} onPress={() => setDifficulty('easy')} style={[styles.filterMainContainer, {backgroundColor: difficulty === 'easy' ? DULL_ACCENT : LIGHT_TEXT}]}>
                                <Text style={[styles.filterText, {marginLeft: 0}]}>Easy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => setDifficulty('moderate')} style={[styles.filterMainContainer, {backgroundColor: difficulty === 'moderate' ? DULL_ACCENT : LIGHT_TEXT}]}>
                                <Text style={[styles.filterText, {marginLeft: 0}]}>Moderate</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => setDifficulty('difficult')} style={[styles.filterMainContainer, {backgroundColor: difficulty === 'difficult' ? DULL_ACCENT : LIGHT_TEXT}]}>
                                <Text style={[styles.filterText, {marginLeft: 0}]}>Difficult</Text>
                            </TouchableOpacity>

                        </View>

                        <View>
                            <TitleText text={"meal calories"} />
                            <TextInput
                                value={calories}
                                onChangeText={text => setCalories(text)}
                                placeholder={"Enter your meal calories in kcal"}
                                keyboardType='numeric'
                                placeholderTextColor={GREY}
                                onFocus={() => setCaloriesFocus(true)}
                                onBlur={() => setCaloriesFocus(false)}
                                style={[styles.title, {
                                    backgroundColor: caloriesFocus || !isEmpty(calories) ? LIGHT_TEXT : TRANSPARENT,
                                    borderStyle: caloriesFocus || !isEmpty(calories) ? null : 'dashed'
                                }]}
                            />
                        </View>

                        <View>
                            <TitleText text={"time"} />
                            <TimePicker
                                value={time}
                                onChange={(newValue) => setTime(newValue)}
                                pickerShows={["hours", "minutes"]}
                                hoursUnit="hr"
                                minutesUnit="min"
                                textColor={DARK_TEXT}
                            />
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >

                            <TouchableOpacity 
                                onPress={() => navigation.goBack()} 
                                hitSlop={styles.hitSlop} 
                                activeOpacity={1}
                                style={styles.arrowContainer}
                            >
                                <AntDesign name="arrowleft" size={20} color={LIGHT_TEXT} />
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={onPressShareRecipe} 
                                hitSlop={styles.hitSlop} 
                                activeOpacity={1}
                                disabled={isLoading ? true : false}
                                style={{
                                    backgroundColor: ACCENT,
                                    padding: 15,
                                    borderRadius: 50,
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'flex-end',
                                    marginTop: 30
                                }}
                            >
                                {isLoading ? (
                                    <ActivityIndicator
                                        size="small"
                                        color={LIGHT_TEXT}
                                    />
                                ): (
                                    <Text style={{
                                        fontSize: 14,
                                        color: LIGHT_TEXT,
                                        fontFamily: REGULAR
                                    }}>
                                        Publish
                                    </Text>
                                )}
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
        </>
    )
}

export default Optional;