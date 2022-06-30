import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PageHeader from '../components/PageHeader';
import { ACCENT, ADD_SERVINGS, BACKGROUND, DARK_TEXT, GREY, LIGHT_TEXT, MINUS_SERVINGS, NON_VEG, TRANSPARENT, VEG, VEGAN } from '../utils/colors';
import { BOLD, REGULAR } from '../utils/values';

const AddRecipe = ({navigation}) => {
    const [title, setTitle] = useState('')
    const [titleFocus, setTitleFocus] = useState(false)
    const [servings, setServings] = useState(1)
    const [calories, setCalories] = useState('')
    const [caloriesFocus, setCaloriesFocus] = useState(false)
    const [time, setTime] = useState({
        hours: 0,
        minutes: 10,
    });
    

    const TitleText = (props) => {
        return(
            <Text style={styles.titleText}>{props.text}</Text>
        )
    }

    const PlusButton = (props) => (
        <View style={[styles.plus, props.style]}>
            <Entypo name="plus" size={18} color={LIGHT_TEXT} />
        </View>
    )

    return(
        <>
            <ScrollView>

            <PageHeader title="add recipe" navigation={navigation} />

            <View style={styles.mainContainer}>

                <View>
                    <TitleText text={"title"} />
                    <TextInput
                        value={title}
                        onChangeText={text => setTitle(text)}
                        placeholder={"Name your recipe here"}
                        placeholderTextColor={GREY}
                        onFocus={() => setTitleFocus(true)}
                        onBlur={() => setTitleFocus(false)}
                        style={[styles.title, {
                            backgroundColor: titleFocus ? LIGHT_TEXT : TRANSPARENT,
                            borderStyle: titleFocus ? null : 'dashed'
                        }]}
                    />
                </View>

                <View>
                    <TitleText text={"ingredients"} />
                    <TouchableOpacity activeOpacity={1} onPress={() => console.log('pressed ingredients')} style={styles.placeholderContainer}>
                        <Text style={styles.ingredientsPlaceholder}>Add your ingredients here</Text>
                    </TouchableOpacity>
                    <PlusButton />
                </View>

                <View>
                    <TitleText text={"instructions"} />
                    <TouchableOpacity activeOpacity={1} onPress={() => console.log('pressed instructions')} style={styles.placeholderContainer}>
                        <Text style={styles.ingredientsPlaceholder}>Add your instructions here</Text>
                    </TouchableOpacity>
                    <PlusButton />
                </View>

                <View>
                    <TitleText text={"recipe image"} />
                    <TouchableOpacity activeOpacity={1} onPress={() => console.log('pressed recipe image')} style={styles.recipeImageContainer}>
                        <Ionicons name="image-outline" size={40} color={GREY} />
                        <PlusButton style={{right: 25, bottom: 25, top: 'auto'}} />
                    </TouchableOpacity>
                </View>

                <View style={styles.filtersContainer}>

                    <TouchableOpacity activeOpacity={1} onPress={() => console.log('pressed veg')} style={styles.filterMainContainer}>
                        <View style={[styles.filterIcon, {borderColor: VEG}]}>
                            <View style={[styles.filterCircle, {backgroundColor: VEG}]} />
                        </View>
                        <Text style={styles.filterText}>Veg</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => console.log('pressed veg')} style={styles.filterMainContainer}>
                        <View style={[styles.filterIcon, {borderColor: NON_VEG}]}>
                            <View style={[styles.filterCircle, {backgroundColor: NON_VEG}]} />
                        </View>
                        <Text style={styles.filterText}>Veg</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => console.log('pressed veg')} style={styles.filterMainContainer}>
                        <View style={[styles.filterIcon, {borderColor: VEGAN}]}>
                            <Entypo name="leaf" size={15} color={VEGAN} />
                        </View>
                        <Text style={styles.filterText}>Vegan</Text>
                    </TouchableOpacity>

                </View>

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

                    <TouchableOpacity activeOpacity={1} onPress={() => console.log('pressed veg')} style={styles.filterMainContainer}>
                        <Text style={[styles.filterText, {marginLeft: 0}]}>Easy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => console.log('pressed veg')} style={styles.filterMainContainer}>
                        <Text style={[styles.filterText, {marginLeft: 0}]}>Intermediate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => console.log('pressed veg')} style={styles.filterMainContainer}>
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
                            backgroundColor: caloriesFocus ? LIGHT_TEXT : TRANSPARENT,
                            borderStyle: caloriesFocus ? null : 'dashed'
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

                <View style={{paddingBottom: 30}}>
                    <TouchableOpacity activeOpacity={1} style={styles.postButton} onPress={() => console.log(time.hours === 0 ? `${time.minutes}mins` : `${time.hours}hrs${time.minutes}mins`)}>
                        <Text style={styles.postText}>share recipe</Text>
                    </TouchableOpacity>
                </View>

            </View>

            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: BACKGROUND,
    },
    titleText: {
        fontSize: 16,
        fontFamily: BOLD,
        textTransform: 'capitalize',
        color: DARK_TEXT,
        marginBottom: 4,
        marginTop: 20
    },
    title: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: GREY,
        fontFamily: REGULAR,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    placeholderContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: GREY,
        borderStyle: 'dashed',
        paddingVertical: 10,
        paddingHorizontal: 5,
        height: 120
    },
    ingredientsPlaceholder: {
        fontSize: 14,
        color: GREY,
        fontFamily: REGULAR
    },
    plus: {
        width: 30,
        height: 30,
        backgroundColor: ACCENT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        position: 'absolute',
        top: 30,
        right: -10,
    },
    recipeImageContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: GREY,
        borderStyle: 'dashed',
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    filtersContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    filterMainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: LIGHT_TEXT,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: GREY
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
    filterText: {
        fontSize: 12,
        fontFamily: BOLD,
        textTransform: 'capitalize',
        color: DARK_TEXT,
        marginLeft: 10
    },
    servingsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    servingsButton: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    servingsText: {
        fontSize: 15,
        fontFamily: REGULAR,
        marginHorizontal: 20,
        color: DARK_TEXT
    },
    timeFormatContainer: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: LIGHT_TEXT,
        borderWidth: 1,
        borderColor: GREY,
        padding: 15,
        borderRadius: 5,
    },
    timeFormatText: {
        fontSize: 14,
        fontFamily: REGULAR,
        color: DARK_TEXT
    },
    postButton: {
        width: '100%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ACCENT,
        paddingVertical: 15,
        borderRadius: 5
    },
    postText: {
        fontSize: 15,
        fontFamily: BOLD,
        color: LIGHT_TEXT,
        textTransform: 'uppercase'
    }
})

export default AddRecipe;