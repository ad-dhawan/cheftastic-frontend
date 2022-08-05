import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { useDebounce } from 'use-debounce';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native'
import { isEmpty } from 'lodash';

import SearchBar from "react-native-dynamic-search-bar";
import { BACKGROUND, DARK_TEXT, GREY, LIGHT_TEXT, PRIMARY } from '../utils/colors';
import { BOLD, FEED_ITEM_RADIUS, REGULAR } from '../utils/values';
import { GetData } from '../services/axios';
import { UserAvatar } from '../components/Feed/FeedHeader';
import CacheImage from '../components/CacheImage';
import PageHeader from '../components/PageHeader'

const MEAL_IMAGE_SIZE = 60

const Search = ({navigation}) => {
    const dispatch = useDispatch();
    const {recent_searches} = useSelector(state => state);

    const [searchText, setSearchText] = useState('');
    const [value] = useDebounce(searchText, 1200);
    const [recipes, setRecipes] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(async() => {
        if(!isEmpty(value)){
            await GetData.getSearch(value).then(res => {
                if (res && res.status === 200) {
                    setRecipes(res.data.recipes);
                    setUsers(res.data.users);
                } else console.log(res);
            });
        }
    }, [value])

    const RecentSearchComponent = ({data}) => {
        return(
            <>
                {data.type === 'recipe' ? (
                    <RecipeComponent data={data} />
                ) : (
                    <UsersComponent data={data} />
                )}
            </>
        )
    }

    const RecipeComponent = ({data}) => {
        const onPressItem = () => {
            navigation.navigate('RecipeItem', {data: data})
            
            dispatch({
                type: 'RECENT_SEARCHES',
                payload: {
                    type: 'recipe',
                    meal_name: data.meal_name,
                    image_url: data.image_url,
                    user_avatar: data.user_avatar,
                    user_name: data.user_name,
                    _id: data._id
                },
              });
        }

        return(
            <>
                <TouchableOpacity onPress={onPressItem} activeOpacity={1} style={styles.rowContainer}>
                    <CacheImage
                        uri={data.image_url}
                        style={styles.mealImage}
                    />

                    <View>
                        <Text style={styles.title}>{data.meal_name}</Text>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 6}}>
                            <UserAvatar size={20} avatar={data.user_avatar} />
                            <Text style={styles.userName}>{data.user_name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    const UsersComponent = ({data}) => {
        const onPressItem = () => {
            navigation.navigate('Profile', {"uid": data._id, "uavatar": data.user_avatar, "uname": data.name})

            dispatch({
                type: 'RECENT_SEARCHES',
                payload: {
                    type: 'user',
                    name: data.name,
                    user_avatar: data.user_avatar,
                    _id: data._id
                },
              });
        }

        return(
            <>
                <TouchableOpacity onPress={onPressItem} activeOpacity={1} style={styles.rowContainer}>
                    {data.user_avatar ? (
                        <UserAvatar size={35} avatar={data.user_avatar} />
                    ) : null }
                    <Text style={styles.title}>{data.name}</Text>
                </TouchableOpacity>
            </>
        )
    }

    return(
        <>
            <View style={styles.mainContainer}>

                <PageHeader title="Search" navigation={navigation} />

                    <SearchBar
                        placeholder="Search any recipe or user"
                        onPress={() => alert("onPress")}
                        onChangeText={(text) => setSearchText(text)}
                        autoFocus={true}
                        style={styles.searchBar}
                        placeholderTextColor={GREY}
                        fontColor={DARK_TEXT}
                        iconColor={DARK_TEXT}
                        shadowColor={GREY}
                        cancelIconColor={DARK_TEXT}
                        backgroundColor={LIGHT_TEXT}
                    />

                {isEmpty(recent_searches) && isEmpty(value) ? (
                    <>
                        <LottieView
                            source={require('../assets/lottie/cooking_loading.json')}
                            loop={true}
                            autoPlay={true}
                            style={styles.animation}
                            colorFilters={[
                                {
                                keypath: 'White Solid 4',
                                color: BACKGROUND,
                                },
                            ]}
                        />

                        <Text style={styles.emptySearchText}>your search history is empty, search something</Text>
                    </>

                ) : isEmpty(value) ? (
                    <>
                        <Text style={styles.heading}>recent</Text>
                        <FlatList
                            data={recent_searches.splice(0,10)}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.flatListContainer}
                            renderItem={({item}) => <RecentSearchComponent data={item} />}
                        />
                    </>
                ) : null}

                {!isEmpty(recipes) && !isEmpty(value) ? (
                    <>
                        <Text style={styles.heading}>recipes</Text>
                        <FlatList
                            data={recipes}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.flatListContainer}
                            renderItem={({item}) => <RecipeComponent data={item} />}
                        />
                        <View style={styles.divider} />
                    </>
                ) : null}


                {!isEmpty(users) && !isEmpty(value) ? (
                    <>
                        <Text style={styles.heading}>users</Text>
                        <FlatList
                            data={users}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.flatListContainer}
                            renderItem={({item}) => <UsersComponent data={item} />}
                        />
                    </>
                ) : null}

            </View>
        </>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },
    searchBar: {
        borderRadius: FEED_ITEM_RADIUS,
        marginTop: 10,
        backgroundColor: LIGHT_TEXT
    },
    animation: {
        width: '100%',
    },
    emptySearchText: {
        fontSize: 12,
        color: DARK_TEXT,
        fontFamily: BOLD,
        textAlign: 'center',
        marginTop: 50
    },
    heading: {
        fontSize: 18,
        color: DARK_TEXT,
        fontFamily: BOLD,
        textTransform: 'uppercase',
        paddingTop: 10,
        paddingLeft: 10
    },
    title: {
        fontSize: 16,
        color: DARK_TEXT,
        fontFamily: BOLD,
        marginLeft: 10,
        textTransform: 'lowercase'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    flatListContainer: {
        padding: 15,
    },
    divider: {
        borderColor: GREY,
        borderWidth: 1
    },
    mealImage: {
        width: MEAL_IMAGE_SIZE,
        height: MEAL_IMAGE_SIZE,
        borderRadius: FEED_ITEM_RADIUS
    },
    userName: {
        fontSize: 13,
        color: DARK_TEXT,
        fontFamily: REGULAR,
        marginLeft: 5,
        textTransform: 'lowercase'
    }
});

export default Search;