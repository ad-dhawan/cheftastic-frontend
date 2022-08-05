import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import { BOLD, PROFILE_ITEM_HEIGHT, PROFILE_ITEM_HEIGHT_DIFFERENCE } from '../../utils/values'
import { BACKGROUND, CHECK, DARK_TEXT, LIGHT_TEXT, TRANSPARENT } from '../../utils/colors';
import { GetData } from '../../services/axios';
import CacheImage from '../CacheImage';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = (width / 2) - 20

const ContentList = ({route}) => {
    const {user_id, recipes, saved_recipes} = useSelector(state => state);
    const dispatch = useDispatch();

    const [data, setData] = useState(route.params.uid === user_id ? recipes : []);
    const [savedRecipes, setSavedRecipes] = useState(saved_recipes);

    useEffect(() => {
        if(route.params.screen === 'feed') getUserFeed()
        else if (route.params.screen === 'saved') getUserSaved()
    }, []);

    async function getUserFeed() {
        await GetData.getUserRecipe(route.params.uid).then(res => {
            if (res && res.status === 200) {
                setData(res.data);
                
                if(route.params.uid === user_id)
                    dispatch({
                        type: 'RECIPES',
                        payload: res.data,
                    });
            } else console.log(res);
        });
    }

    async function getUserSaved() {
        await GetData.getSavedRecipes(route.params.uid).then(res => {
            if (res && res.status === 200) {
                setSavedRecipes(res.data);
                
                if(route.params.uid === user_id)
                    dispatch({
                        type: 'SAVE',
                        payload: res.data,
                    });
            } else console.log(res);
        });
    }

    const ListItem = ({item, index}) => {
        return (
            <>
                <TouchableOpacity
                    onPress={() => route.params.navigation.navigate('RecipeItem', {data: item})}
                     style={[styles.itemContainer,{
                        height: index === 1 ? PROFILE_ITEM_HEIGHT - PROFILE_ITEM_HEIGHT_DIFFERENCE :
                        index === data.length - 2 ? PROFILE_ITEM_HEIGHT - PROFILE_ITEM_HEIGHT_DIFFERENCE : PROFILE_ITEM_HEIGHT,
                        bottom: index > 1 && index % 2 !== 0 ? PROFILE_ITEM_HEIGHT_DIFFERENCE : 0
                    }]}
                    activeOpacity={1}
                >

                    <CacheImage
                        // uri={item.image_url}
                        uri={item.image_url}
                        style={[styles.image, {height: index === 1 ? PROFILE_ITEM_HEIGHT - PROFILE_ITEM_HEIGHT_DIFFERENCE :
                        index === data.length - 2 ? PROFILE_ITEM_HEIGHT - PROFILE_ITEM_HEIGHT_DIFFERENCE : PROFILE_ITEM_HEIGHT}]} />

                    <LinearGradient
                        colors={[TRANSPARENT, '#00000050', DARK_TEXT]}
                        style={styles.linearGradient}
                    />

                    <Text style={styles.meal_name} numberOfLines={3} >{item.meal_name}</Text>

                </TouchableOpacity>
            </>
        )
    }

    const ListEmptyComponent = ({type}) => {
        return(
            <>
                {route.params.uid === user_id ? (
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                        <LottieView
                            source={require('../../assets/lottie/cooking_loading.json')}
                            loop={true}
                            autoPlay={true}
                            style={{width: '60%'}}
                            colorFilters={[
                                {
                                keypath: 'White Solid 4',
                                color: BACKGROUND,
                                },
                            ]}
                        />
                        <Text
                            style={{fontSize: 14, fontFamily: BOLD, color: DARK_TEXT, marginTop: 20}}
                        >{type === 'feed' ? 'your feed is empty' : "you don't have any saved posts"}</Text>
                        <TouchableOpacity
                            onPress={() => type === 'feed' ? route.params.navigation.navigate('AddRecipe') : route.params.navigation.navigate('Feed')}
                            activeOpacity={1}
                            hitSlop={styles.hitSlop}
                        >
                            <Text
                                style={{fontSize: 14, fontFamily: BOLD, color: CHECK, marginTop: 10}}
                            >{type === 'feed' ? 'share your first recipe' : 'explore and save new recipes for later'}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <LottieView
                        source={require('../../assets/lottie/cooking_loading.json')}
                        loop={true}
                        autoPlay={true}
                        style={{width: '60%'}}
                        colorFilters={[
                            {
                            keypath: 'White Solid 4',
                            color: BACKGROUND,
                            },
                        ]}
                    />
                    <Text
                        style={{fontSize: 14, fontFamily: BOLD, color: DARK_TEXT, marginTop: 20}}
                    >the user has no recipes yet</Text>
                    </View>
                )}
            </>
        )
    }

    return(
        <>
            <View style={{flex: 1, backgroundColor: BACKGROUND}}>
                
                <FlatList
                    data={route.params.screen === 'feed' ? data : savedRecipes}
                    numColumns={2}
                    contentContainerStyle={{marginTop: 10, paddingBottom: 50}}
                    columnWrapperStyle={{justifyContent: 'space-between', marginHorizontal:10}}
                    renderItem={({item, index}) => (
                        <ListItem item={item} index={index} />
                    )}
                    ListEmptyComponent={() => <ListEmptyComponent type={route.params.screen === 'feed' ? 'feed' : 'saved'}  />}
                />

            </View>
        </>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        width: ITEM_WIDTH,
        borderRadius: 20,
        marginBottom: 10,
    },
    image: {
        width: ITEM_WIDTH,
        borderRadius: 20
    },
    linearGradient: {
        position: 'absolute',
        bottom: 0,
        height: PROFILE_ITEM_HEIGHT / 3,
        width: ITEM_WIDTH,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    meal_name: {
        position: 'absolute',
        bottom: 20,
        left: 15,
        textTransform: 'lowercase',
        color: LIGHT_TEXT,
        fontSize: 14,
        fontFamily: BOLD,
        alignSelf: 'flex-start',
        flexWrap: 'wrap',
        width: ITEM_WIDTH - 50
    },
    hitSlop: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
    }
});

export default ContentList;