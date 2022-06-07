import React, {useEffect, useState} from 'react'
import {View, Text, Image, FlatList, StyleSheet, RefreshControl} from 'react-native'
import {useSelector} from 'react-redux';
import { isEmpty, size, includes } from 'lodash';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SkeletonHolder from './SkeletonHolder';
import { UserAvatar } from './FeedHeader';
import {DARK_TEXT, BACKGROUND, GREY, LIKE} from '../../utils/colors';
import {EXTRA_BOLD, REGULAR, FEED_ITEM_RADIUS, FEED_MEAL_IMAGE_HEIGHT, FEED_MEAL_IMAGE_WIDTH, MEAL_DETAILS_CONTAINER_HEIGHT} from '../../utils/values';
import {GetData} from '../../services/axios'
import CacheImage from '../CacheImage';
import SpecialRecipes from './SpecialRecipes'
import Loader from '../Loader';

const FeedList = (props) => {
    const {feed, user_id} = useSelector(state => state);

    const [feedData, setFeedData] = useState(feed);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        !isEmpty(feedData) ? setIsLoading(false) : null
        getFeedData()
        // getSpecials()
    }, [])

    /** GET FEED DATA */
    async function getFeedData () {
        GetData.getFeed(10).then(res => {
            if (res && res.status === 200) {
                setFeedData(res.data);
                setIsLoading(false);
                
                dispatch({
                  type: 'FEED',
                  payload: res.data,
                });
            } else console.log(res);
        });
    }

    /** GET SPECIALS FEED DATA */
    // async function getSpecials () {
    //     GetData.getSpecials().then(res => {
    //         if (res && res.status === 200) {
    //             setFeedData(res.data);
    //             setIsLoading(false);
                
    //             dispatch({
    //               type: 'SPECIALS',
    //               payload: res.data,
    //             });
    //         } else console.log(res);
    //     });
    // }

    const RecipeListItem = ({item}) => {
        const [likeCount, setLikeCount] = useState(size(item.likes))
        
        return(
            <>
                <View style={{marginBottom: 10}}>
                    <CacheImage
                        uri={item.image_url}
                        style={styles.mealImage}
                    />

                    <View style={styles.detailsContainer}>

                        <View style={styles.mealNameContainer}>
                            <Text style={styles.mealName}>{item.meal_name}</Text>

                            <View style={styles.likesContainer} >
                                <MaterialCommunityIcons name={item.likes.includes(user_id) ? 'cards-heart' : 'cards-heart-outline'}
                                    size={15} color={item.likes.includes(user_id) ? LIKE : GREY} style={{marginRight: 4}}
                                />
                                <Text style={[styles.mealLikeCount, {
                                    color: item.likes.includes(user_id) ? LIKE : GREY
                                }]}>{likeCount}</Text>
                            </View>
                        </View> 

                        <View style={styles.userNameContainer}>
                            <UserAvatar size={18} avatar={item.user_avatar} />
                            <Text style={styles.userName}>{item.user_name}</Text>
                        </View>

                        <Text style={styles.mealType}>{item.meal_type}</Text>
                    </View>

                </View>
            </>
        )
    }

    /** UPWARD PAGINATION */
    const onRefresh = () => {
        setIsRefreshing(true);

        if(!isEmpty(feedData)){
            GetData.getFeed(10, feedData[0]._id, 'pull_refresh').then(res => {
                if(res && res.status === 200) {
                    if(!isEmpty(res.data)) {
                        setTimeout(() => {
                            setFeedData(data => [...res.data, ...data]);
                        }, 1000);
                    }
                } else console.log(res);
                setIsRefreshing(false);
            })
        } else {
            getFeedData()
        }

    }

    /** DOWNWARD PAGINATION */
    const onLoadMore = () => {
        setIsLoadingMore(true);

        if(!isEmpty(feedData)){
            GetData.getFeed(10, feedData[feedData.length - 1]._id, 'load_more').then(res => {
                if(res && res.status === 200) {
                    if(!isEmpty(res.data)) {
                        setTimeout(() => {
                            setFeedData(data => [...data, ...res.data]);
                        }, 1000);
                    }
                } else console.log(res);
                setIsLoadingMore(false);
            })
        } else {
            getFeedData()
        }
    }

    return (
        <>
            <View style={props.style}>
                {isLoading ? <SkeletonHolder /> : (
                    <FlatList
                        data={feedData}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 150}}
                        refreshControl={
                            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                        }
                        onEndReached={onLoadMore}
                        ListHeaderComponent={<SpecialRecipes style={{marginBottom: 30}} />}
                        renderItem={({item}) => <RecipeListItem item={item} />}
                    />
                )}
            </View>

            {isLoadingMore ? <Loader style={{bottom: 80}} /> : null}
        </>
    )
}

const styles = StyleSheet.create({
    mealImage: {
        height: FEED_MEAL_IMAGE_HEIGHT,
        width: FEED_MEAL_IMAGE_WIDTH,
        borderRadius: FEED_ITEM_RADIUS,
        marginBottom: 10,
        opacity: 0.8
    },
    detailsContainer: {
        height: MEAL_DETAILS_CONTAINER_HEIGHT,
        backgroundColor: BACKGROUND,
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        borderRadius: FEED_ITEM_RADIUS,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    mealNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mealName: {
        fontSize: 17,
        color: DARK_TEXT,
        fontFamily: EXTRA_BOLD,
        textTransform: 'lowercase'
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mealLikeCount: {
        fontSize: 12,
        color: DARK_TEXT,
        fontFamily: REGULAR,
    },
    userNameContainer: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
    },
    userName: {
        fontSize: 12,
        color: DARK_TEXT,
        fontFamily: REGULAR,
        textTransform: 'lowercase',
        marginLeft: 5
    },
    mealType: {
        fontSize: 12,
        color: DARK_TEXT,
        fontFamily: REGULAR,
        textTransform: 'lowercase',
        marginTop: 3
    },
});

export default FeedList
