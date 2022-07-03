import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import { useSelector } from 'react-redux';
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';
import * as ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isEmpty } from 'lodash';
import { Portal, Modal } from 'react-native-paper';

import { GetData } from '../../services/axios';
import PageHeader from '../../components/PageHeader';
import { ACCENT, ADD_SERVINGS, BACKGROUND, DARK_TEXT, DULL_ACCENT, GREY, INCOMPLETE, LIGHT_TEXT, MINUS_SERVINGS, NON_VEG, TRANSPARENT, VEG, VEGAN } from '../../utils/colors';
import { BOLD, REGULAR } from '../../utils/values';
import Loader from '../../components/Loader';

const IMAGE_SIZE = 140
const BORDER_RADIUS = 5

const AddRecipe = ({navigation}) => {
    const {user_id} = useSelector(state => state);

    const [title, setTitle] = useState('');
    const [titleFocus, setTitleFocus] = useState(false);
    const [showTitleWarning, setShowTitleWarning] = useState(false);

    const [ingredients, setIngredients] = useState([]);
    const [showIngredientsWarning, setShowIngredientsWarning] = useState(false);

    const [instructions, setInstructions] = useState([]);
    const [showInstructionsWarning, setShowInstructionsWarning] = useState(false);

    const [recipeImage, setRecipeImage] = useState('');
    const [showRecipeImageWarning, setShowRecipeImageWarning] = useState(false);

    const [mealType, setMealType] = useState('');
    const [showMealTypeWarning, setShowMealTypeWarning] = useState(false);

    const [servings, setServings] = useState(1);
    const [difficulty, setDifficulty] = useState('');
    const [calories, setCalories] = useState('');
    const [caloriesFocus, setCaloriesFocus] = useState(false);
    const [time, setTime] = useState({
        hours: 0,
        minutes: 10,
    });
    const [loader, setLoader] = useState(false);

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

    const onPressPickImage = () => {
        ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
            },
            res => {
                // console.log(res);
                
                if(res && res.assets){
                    setRecipeImage(res.assets[0].uri)
                }
            },
        );
    }

    const onPressShareRecipe = () => {
        try{
            setLoader(true);
            const formData = new FormData();

            isEmpty(title) ? setShowTitleWarning(true) : setShowTitleWarning(false)
            formData.append('meal_name', title);

            isEmpty(recipeImage) ? setShowRecipeImageWarning(true) : setShowRecipeImageWarning(false)
            formData.append('image_url', {
                uri: recipeImage,
                name: `${title.replace(/ /g,'')}_${user_id}_${Date.now()}`,
                type: 'multipart/form-data',
            });

            isEmpty(ingredients) ? setShowIngredientsWarning(true) : setShowIngredientsWarning(false)
            ingredients.map(item => {
                formData.append('ingredients', item.text)
            })

            isEmpty(instructions) ? setShowInstructionsWarning(true) : setShowInstructionsWarning(false)
            instructions.map(item => {
                formData.append('recipe', item.text)
            })

            isEmpty(mealType) ?setShowMealTypeWarning(true) :setShowMealTypeWarning(false)
            formData.append('meal_type', mealType);

            formData.append('chef_id', user_id);
            formData.append('meal_cooking_time', time.hours === 0 ? `${time.minutes}mins` : `${time.hours}hrs${time.minutes}mins`);
            formData.append('meal_difficulty', difficulty);
            formData.append('meal_calories', calories);
    
            if(!showTitleWarning && !showIngredientsWarning && !showInstructionsWarning && !showRecipeImageWarning && !showMealTypeWarning){
                GetData.createRecipe(formData).then(response => {
                    if(response && response.status === 200) {
                        console.log("RESPONSE: ", response.data)
                        setTitle('')
                        setIngredients([])
                        setInstructions([])
                        setRecipeImage('')
                        setMealType('')
                        setServings(1)
                        setDifficulty('')
                        setCalories('')
                        setTime({
                            hours: 0,
                            minutes: 10,
                        })
                        setLoader(false);
                        navigation.navigate('Feed')
                    }
                    else console.log(response);
                });
            }

        } catch (e) {
            console.log(e)
        }
    }

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
                            backgroundColor: titleFocus || !isEmpty(title) ? LIGHT_TEXT : TRANSPARENT,
                            borderStyle: titleFocus || !isEmpty(title) ? null : 'dashed',
                            borderColor: showTitleWarning ? INCOMPLETE : GREY
                        }]}
                    />
                </View>

                <View>
                    <TitleText text={"ingredients"} />
                    <TouchableOpacity 
                        activeOpacity={1} 
                        onPress={() => navigation.navigate('AddIngredients', {setIngredients: setIngredients, ingredients: ingredients})} 
                        style={[styles.placeholderContainer, {
                            backgroundColor: isEmpty(ingredients) ? TRANSPARENT : LIGHT_TEXT,
                            borderStyle: !isEmpty(ingredients) ? null : 'dashed',
                            borderColor: showIngredientsWarning ? INCOMPLETE : GREY
                        }]}
                    >
                        <Text numberOfLines={4} ellipsizeMode="tail" style={[styles.ingredientsPlaceholder, {
                            color: isEmpty(ingredients) ? GREY : DARK_TEXT
                        }]}>
                            {isEmpty(ingredients) ? 'Add your ingredients here' : ingredients.map(item => `${item.text} , `)}
                        </Text>
                    </TouchableOpacity>
                    <PlusButton />
                </View>

                <View>
                    <TitleText text={"instructions"} />
                    <TouchableOpacity 
                        activeOpacity={1} 
                        onPress={() => navigation.navigate('AddInstructions', {setInstructions: setInstructions, instructions, instructions})} 
                        style={[styles.placeholderContainer, {
                            backgroundColor: isEmpty(instructions) ? TRANSPARENT : LIGHT_TEXT,
                            borderStyle: !isEmpty(instructions) ? null : 'dashed',
                            borderColor: showInstructionsWarning ? INCOMPLETE : GREY
                        }]}
                    >
                        <Text numberOfLines={4} ellipsizeMode="tail" style={[styles.ingredientsPlaceholder, {
                            color: isEmpty(instructions) ? GREY : DARK_TEXT
                        }]}>
                            {isEmpty(instructions) ? 'Add your instructions here' : instructions.map(item => `${item.text} , `)}
                        </Text>
                    </TouchableOpacity>
                    <PlusButton />
                </View>

                <View>
                    <TitleText text={"recipe image"} />
                    <TouchableOpacity activeOpacity={1} onPress={onPressPickImage} style={[styles.recipeImageContainer, {
                        borderColor: showRecipeImageWarning ? INCOMPLETE : GREY
                    }]}>
                        {recipeImage === '' ? (
                            <>
                                <Ionicons name="image-outline" size={40} color={GREY} />
                                <PlusButton style={{right: 25, bottom: 25, top: 'auto'}} />
                            </>
                        ) : (
                            <Image
                                source={{uri : recipeImage}}
                                style={styles.recipeImage}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.filtersContainer}>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setMealType('veg')}
                        style={[styles.filterMainContainer, {
                            backgroundColor: mealType === 'veg' ? DULL_ACCENT : LIGHT_TEXT,
                            borderColor: showMealTypeWarning ? INCOMPLETE : GREY
                        }]}
                    >
                        <View style={[styles.filterIcon, {borderColor: VEG}]}>
                            <View style={[styles.filterCircle, {backgroundColor: VEG}]} />
                        </View>
                        <Text style={styles.filterText}>Veg</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setMealType('non-veg')}
                        style={[styles.filterMainContainer, {
                            backgroundColor: mealType === 'non-veg' ? DULL_ACCENT : LIGHT_TEXT,
                            borderColor: showMealTypeWarning ? INCOMPLETE : GREY
                        }]}
                    >
                        <View style={[styles.filterIcon, {borderColor: NON_VEG}]}>
                            <View style={[styles.filterCircle, {backgroundColor: NON_VEG}]} />
                        </View>
                        <Text style={styles.filterText}>Non-Veg</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setMealType('vegan')}
                        style={[styles.filterMainContainer, {
                            backgroundColor: mealType === 'vegan' ? DULL_ACCENT : LIGHT_TEXT,
                            borderColor: showMealTypeWarning ? INCOMPLETE : GREY
                        }]}
                    >
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

                    <TouchableOpacity activeOpacity={1} onPress={() => setDifficulty('easy')} style={[styles.filterMainContainer, {backgroundColor: difficulty === 'easy' ? DULL_ACCENT : LIGHT_TEXT}]}>
                        <Text style={[styles.filterText, {marginLeft: 0}]}>Easy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => setDifficulty('intermediate')} style={[styles.filterMainContainer, {backgroundColor: difficulty === 'intermediate' ? DULL_ACCENT : LIGHT_TEXT}]}>
                        <Text style={[styles.filterText, {marginLeft: 0}]}>Intermediate</Text>
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
                            backgroundColor: caloriesFocus || !isEmpty(title) ? LIGHT_TEXT : TRANSPARENT,
                            borderStyle: caloriesFocus || !isEmpty(title) ? null : 'dashed'
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
                    <TouchableOpacity activeOpacity={1} style={styles.postButton} onPress={onPressShareRecipe}>
                        <Text style={styles.postText}>share recipe</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <Portal>
                <Modal visible={loader}>
                    <Loader />
                </Modal>
            </Portal>

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
        borderRadius: BORDER_RADIUS,
        borderColor: GREY,
        fontFamily: REGULAR,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 5,
        color: DARK_TEXT
    },
    placeholderContainer: {
        borderWidth: 1,
        borderRadius: BORDER_RADIUS,
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
        borderRadius: BORDER_RADIUS,
        borderColor: GREY,
        borderStyle: 'dashed',
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    recipeImage: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        borderRadius: BORDER_RADIUS
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
        borderRadius: BORDER_RADIUS,
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
        borderRadius: BORDER_RADIUS
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
        borderRadius: BORDER_RADIUS,
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
        borderRadius: BORDER_RADIUS
    },
    postText: {
        fontSize: 15,
        fontFamily: BOLD,
        color: LIGHT_TEXT,
        textTransform: 'uppercase'
    }
})

export default AddRecipe;