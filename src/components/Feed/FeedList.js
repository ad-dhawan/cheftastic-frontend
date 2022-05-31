import React, {useEffect, useState} from 'react'
import {View, Text, Image, FlatList, StyleSheet, RefreshControl} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import { isEmpty, size } from 'lodash';
import { Avatar } from 'react-native-paper';

import SkeletonHolder from './SkeletonHolder';
import {LIGHT_TEXT, DARK_TEXT, GREY, ACCENT, BACKGROUND} from '../../utils/colors';
import {BOLD, EXTRA_BOLD, REGULAR, FEED_ITEM_RADIUS, FEED_MEAL_IMAGE_HEIGHT, FEED_MEAL_IMAGE_WIDTH, MEAL_DETAILS_CONTAINER_HEIGHT, THIN} from '../../utils/values';
import {GetData} from '../../services/axios'

const FeedList = (props) => {
    const {feed} = useSelector(state => state);

    const [feedData, setFeedData] = useState(feed);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        !isEmpty(feedData) ? setIsLoading(false) : null
        getFeedData()
    }, [])

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

    const RecipeListItem = ({item}) => {
        const [likeCount, setLikeCount] = useState(size(item.likes))
        
        return(
            <>
                <View>
                    <Image
                        source={{uri: item.image_url}}
                        style={styles.mealImage}
                    />

                    <View style={styles.detailsContainer}>

                        <View style={styles.mealNameContainer}>
                            <Text style={styles.mealName}>{item.meal_name}</Text>
                            <Text style={styles.mealLikeCount}>{likeCount}</Text>
                        </View> 

                        <View style={styles.userNameContainer}>
                            <Avatar.Image size={18} source={{uri: item.user_avatar}} />
                            <Text style={styles.userName}>{item.user_name}</Text>
                        </View>

                        <Text style={styles.mealType}>{item.meal_type}</Text>
                    </View>

                </View>
            </>
        )
    }

    const onRefresh = () => {
        setIsRefreshing(true);

        if(!isEmpty(feedData)){
            GetData.getFeed(10, feedData[0]._id, 'pull_refresh').then(res => {
                if(res && res.status === 200) {
                    console.log(res.data)
                    if(!isEmpty(res.data)) {
                        setTimeout(() => {
                            setFeedData(data => [...res.data, ...data]);
                        }, 1000);
                    }
                } else console.log(res)
                setIsRefreshing(false);
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
                        renderItem={({item}) => <RecipeListItem item={item} />}
                    />
                )}
            </View>
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
