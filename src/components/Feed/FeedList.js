import React, {useEffect, useState, useRef} from 'react'
import {View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity, Share, Alert} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import { isEmpty, size, includes, delay } from 'lodash';
import DoubleClick from 'react-native-double-tap';
import LottieView from 'lottie-react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SkeletonHolder from './SkeletonHolder';
import { UserAvatar } from './FeedHeader';
import {DARK_TEXT, BACKGROUND, GREY, LIKE} from '../../utils/colors';
import {EXTRA_BOLD, REGULAR, FEED_ITEM_RADIUS, FEED_MEAL_IMAGE_HEIGHT, FEED_MEAL_IMAGE_WIDTH, MEAL_DETAILS_CONTAINER_HEIGHT} from '../../utils/values';
import {GetData, SERVER_URL, BASE_URL} from '../../services/axios'
import CacheImage from '../CacheImage';
import SpecialRecipes from './SpecialRecipes'
import Loader from '../Loader';
import RoundButton from '../RoundButton';
import AdComp from '../AdComponents';

export async function onPressShare(userId, mealName, recipeId, imageUrl) {
    // console.log(contentId);
    const message = `Try this delicious *${mealName}* by *${userId}* on cheftastic`
    try {
      const result = await Share.share({
        title: 'Cheftastic',
        message: `${message} \n\n ${SERVER_URL}/${BASE_URL}/post/get/${recipeId}`,
        url: imageUrl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
}

const FeedList = (props) => {
    const {feed, user_id, specials} = useSelector(state => state);
    const dispatch = useDispatch();

    const [feedData, setFeedData] = useState(feed);
    const [specialsData, setSpecialsData] = useState(specials);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        !isEmpty(feedData) ? setIsLoading(false) : null
        getFeedData();
        getSpecials();
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

    /** GET SPECIALS */
    async function getSpecials () {
        GetData.getSpecials().then(res => {
            if (res && res.status === 200) {
                setSpecialsData(res.data);
                
                dispatch({
                  type: 'SPECIALS',
                  payload: res.data,
                });
            } else console.log(res);
        });
    }

    const RecipeListItem = ({index, item}) => {
        const [likeCount, setLikeCount] = useState(size(item.likes));
        const [isLiked, setIsLiked] = useState(item.likes.includes(user_id))

        const LikeAnimRef = useRef(null);

        function likeRecipe() {
            GetData.likeRecipe(item._id, {user_id: user_id}).then(res => {
                if (res && res.status === 200) {
                    console.log(res.data);
                } else console.log(res);
            });
        }

        function unlikeRecipe() {
            if(isLiked){
                setLikeCount(likes => likes -= 1)
                setIsLiked(false)
                likeRecipe()
            } else {
                LikeAnimRef.current.play()
                setLikeCount(likes => likes += 1)
                setIsLiked(true)
                likeRecipe()
            }
        }
        
        return(
            <>
                {index%6 === 0 ? (
                    <AdComp />
                ) : (
                    <DoubleClick
                    //active opacity of touchable opacity from node modules
                    singleTap={() => {
                        props.navigation.navigate('RecipeItem', {data: item})
                    }}

                    doubleTap={() => {
                        LikeAnimRef.current.play()
                        isLiked ? null : setLikeCount(likes => likes += 1)
                        setIsLiked(true)
                        
                        if(!isLiked){
                            likeRecipe()
                        }
                    }}
                    >
                    <View style={{marginBottom: 10}}>
                        <CacheImage
                            uri={item.image_url}
                            style={styles.mealImage}
                        />

                        <RoundButton
                            icon={<Ionicons name="share-social-sharp" size={18} color={DARK_TEXT} />}
                            onPress={() => onPressShare(item.user_name, item.meal_name, item._id, item.image_url)}
                            style={{position: 'absolute', top: 10, right: 10}}
                        />

                        <View style={styles.detailsContainer}>

                            <View style={styles.mealNameContainer}>
                                <Text style={styles.mealName}>{item.meal_name}</Text>

                                <TouchableOpacity activeOpacity={1} hitSlop={styles.hitSlop}
                                    onPress={() => unlikeRecipe()} style={styles.likesContainer} >
                                    <MaterialCommunityIcons name={isLiked ? 'cards-heart' : 'cards-heart-outline'}
                                        size={15} color={isLiked ? LIKE : GREY} style={{marginRight: 4}}
                                    />
                                    <Text style={[styles.mealLikeCount, {
                                        color: isLiked ? LIKE : GREY
                                    }]}>{likeCount}</Text>
                                </TouchableOpacity>
                                
                            </View> 

                            <TouchableOpacity activeOpacity={1} hitSlop={styles.hitSlop}
                                onPress={() => props.navigation.navigate('Profile', {"uid": item.user_id, "uavatar": item.user_avatar, "uname": item.user_name})}
                                style={styles.userNameContainer}>
                                <UserAvatar size={18} avatar={item.user_avatar} />
                                <Text style={styles.userName}>{item.user_name}</Text>
                            </TouchableOpacity>

                            <Text style={styles.mealType}>{item.meal_type}</Text>
                        </View>

                            <LottieView
                                ref={LikeAnimRef}
                                source={require('../../assets/lottie/like_anim.json')}
                                loop={false}
                                autoPlay={false}
                                speed={2}
                                onAnimationFinish={() => LikeAnimRef.current.reset()}
                                style={styles.likeAnim}
                            />

                    </View>
                    </DoubleClick>
                )}
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
                        contentContainerStyle={{paddingBottom: 50}}
                        refreshControl={
                            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                        }
                        onEndReached={onLoadMore}
                        ListHeaderComponent={<SpecialRecipes data={specialsData} style={{marginBottom: 30}} />}
                        renderItem={({index, item}) => <RecipeListItem index={index} item={item} />}
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
    likeAnim: {
        height: 250,
        width: 250,
        position: 'absolute',
        alignSelf: 'center',
    },
    hitSlop: {
        top: 5,
        bottom: 5,
        right: 5,
        left: 5
    }
});

export default FeedList
