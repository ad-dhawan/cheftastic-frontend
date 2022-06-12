import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { BOLD, PROFILE_ITEM_HEIGHT, PROFILE_ITEM_HEIGHT_DIFFERENCE } from '../../utils/values'
import { BACKGROUND, DARK_TEXT, LIGHT_TEXT, TRANSPARENT } from '../../utils/colors';
import { GetData } from '../../services/axios';
import CacheImage from '../CacheImage';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = (width / 2) - 20

const ContentList = ({route}) => {
    const {user_id, recipes} = useSelector(state => state);
    const dispatch = useDispatch();

    const [data, setData] = useState(route.params.uid === user_id ? recipes : []);

    useEffect(() => {
        getUserFeed();
        // getUserSaved();
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

    const ListItem = ({item, index}) => {
        return (
            <>
                <TouchableOpacity style={[styles.itemContainer,{
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

    return(
        <>
            <View style={{flex: 1, backgroundColor: BACKGROUND}}>
                
                <FlatList
                    data={data}
                    numColumns={2}
                    contentContainerStyle={{marginTop: 10}}
                    columnWrapperStyle={{justifyContent: 'space-between', marginHorizontal:10}}
                    renderItem={({item, index}) => (
                        <ListItem item={item} index={index} />
                    )}
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
    }
});

export default ContentList;