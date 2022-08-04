import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isEmpty } from 'lodash';
import ImageResizer from 'react-native-image-resizer';
import PageHeader from '../../components/PageHeader';
import { ACCENT, BACKGROUND, DARK_TEXT, DULL_ACCENT, GREY, INCOMPLETE, LIGHT_TEXT, NON_VEG, TRANSPARENT, VEG, VEGAN } from '../../utils/colors';
import { BOLD, REGULAR } from '../../utils/values';

const {width, height} = Dimensions.get('screen')
const IMAGE_SIZE = width - 100
const BORDER_RADIUS = 5
const ARROW_SIZE = 50

export const PlusButton = (props) => (
    <View style={[styles.plus, props.style]}>
        <Entypo name="plus" size={18} color={LIGHT_TEXT} />
    </View>
)

export const TitleText = (props) => {
    return(
        <Text style={styles.titleText}>{props.text}</Text>
    )
}

const AddRecipe = ({navigation}) => {
    const [isIncomplete, setIsIncomplete] = useState(false);
    const [title, setTitle] = useState('');
    const [titleFocus, setTitleFocus] = useState(false);
    const [recipeImage, setRecipeImage] = useState('');
    const [mealType, setMealType] = useState('');

    const onPressPickImage = async () => {
        ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
            },
            res => {
                // console.log(res);
                
                if(res && res.assets){
                    ImageResizer.createResizedImage(res.assets[0].uri, 1080, 1080, 'JPEG', 50, undefined)
                    .then(response => {
                        setRecipeImage(response.uri)
                        // response.uri is the URI of the new image that can now be displayed, uploaded...
                        // response.path is the path of the new image
                        // response.name is the name of the new image with the extension
                        // response.size is the size of the new image
                    })
                    .catch(err => {
                        console.log(err)
                    });
                }
            },
        );
    }

    const onPressNextArrow = () => {
        if(!isEmpty(title) || !isEmpty(recipeImage) || !isEmpty(mealType)){
            navigation.navigate('Recipe', {title: title, recipeImage: recipeImage, mealType: mealType})
            setIsIncomplete(false)
        } else {
            setIsIncomplete(true)
        }
    }

    return(
        <>
            <ScrollView style={{height: '100%', backgroundColor: BACKGROUND}} >

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
                        }]}
                    />
                </View>

                <View style={styles.filtersContainer}>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setMealType('veg')}
                        style={[styles.filterMainContainer, {
                            backgroundColor: mealType === 'veg' ? DULL_ACCENT : LIGHT_TEXT,
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
                        }]}
                    >
                        <View style={[styles.filterIcon, {borderColor: VEGAN}]}>
                            <Entypo name="leaf" size={15} color={VEGAN} />
                        </View>
                        <Text style={styles.filterText}>Vegan</Text>
                    </TouchableOpacity>

                </View>

                <View>
                    <TitleText text={"recipe image"} />
                    <TouchableOpacity activeOpacity={1} onPress={onPressPickImage} style={[styles.recipeImageContainer]}>
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
                
                {isIncomplete ? (
                    <Text style={styles.incompleteText} >Please fill all the details</Text>
                ) : null }

                <TouchableOpacity 
                    onPress={onPressNextArrow} 
                    hitSlop={styles.hitSlop} 
                    activeOpacity={1}
                    style={styles.arrowContainer}
                >
                    <AntDesign name="arrowright" size={20} color={LIGHT_TEXT} />
                </TouchableOpacity>

            </View>

            </ScrollView>

        </>
    )
}

export const styles = StyleSheet.create({
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
        color: DARK_TEXT,
        marginTop: 10
    },
    placeholderContainer: {
        borderWidth: 1,
        borderRadius: BORDER_RADIUS,
        borderColor: GREY,
        borderStyle: 'dashed',
        paddingVertical: 10,
        paddingHorizontal: 5,
        height: 120,
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
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    recipeImage: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        borderRadius: BORDER_RADIUS
    },
    filtersContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filterMainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: LIGHT_TEXT,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: GREY,
        marginVertical: 15
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
    },
    incompleteText: {
        fontSize: 14,
        fontFamily: REGULAR,
        textTransform: 'lowercase',
        textAlign: 'center',
        color: INCOMPLETE,
        marginTop: 20
    },
    arrowContainer: {
        backgroundColor: ACCENT,
        padding: 15,
        borderRadius: ARROW_SIZE,
        width: ARROW_SIZE,
        height: ARROW_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 30
    },
})

export default AddRecipe;