import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { isEmpty } from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign'

import {styles, PlusButton, TitleText} from './AddRecipe';
import { BACKGROUND, DARK_TEXT, GREY, LIGHT_TEXT, TRANSPARENT } from '../../utils/colors';

const Recipe = ({navigation, route}) => {
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [isIncomplete, setIsIncomplete] = useState(false);

    const onPressNextArrow = () => {
        if(!isEmpty(ingredients) || !isEmpty(instructions)){
            navigation.navigate('Optional', {
                title: route.params.title,
                recipeImage: route.params.recipeImage,
                mealType: route.params.mealType,
                ingredients: ingredients,
                instructions: instructions
            })
            setIsIncomplete(false)
        } else {
            setIsIncomplete(true)
        }
    }

    return(
        <>
            <ScrollView style={{flex: 1, backgroundColor: BACKGROUND}} >
                <View style={{paddingHorizontal: 20}} >
                    <View>
                            <TitleText text={"ingredients"} />
                            <TouchableOpacity 
                                activeOpacity={1} 
                                onPress={() => navigation.navigate('AddIngredients', {setIngredients: setIngredients, ingredients: ingredients})} 
                                style={[styles.placeholderContainer, {
                                    backgroundColor: isEmpty(ingredients) ? TRANSPARENT : LIGHT_TEXT,
                                    borderStyle: !isEmpty(ingredients) ? null : 'dashed',
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

                        {isIncomplete ? (
                            <Text style={styles.incompleteText} >Please fill all the details</Text>
                        ) : null }

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
                                onPress={onPressNextArrow} 
                                hitSlop={styles.hitSlop} 
                                activeOpacity={1}
                                style={styles.arrowContainer}
                            >
                                <AntDesign name="arrowright" size={20} color={LIGHT_TEXT} />
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
        </>
    )
}

export default Recipe;