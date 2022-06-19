import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

import CacheImage from '../CacheImage';
import { RECIPE_ITEM_HEIGHT, RECIPE_ITEM_WIDTH, DARK_TEXT } from '../../utils/values';
import RoundButton from '../RoundButton';
import { onPressShare } from '../Feed/FeedList';

const Header = ({navigation, item}) => {
    return(
        <>
            <View>
                <CacheImage
                    uri={item.image_url}
                    style={styles.image}
                />

                <View style={styles.headerContainer}>
                    <RoundButton icon={<Entypo name="chevron-left" size={22} color={DARK_TEXT} />} onPress={() => navigation.goBack()} />

                    <View style={{flexDirection: 'row'}}>
                        <RoundButton
                            icon={<Ionicons name="bookmark-outline" size={20} color={DARK_TEXT} />}
                            onPress={() => navigation.goBack()}
                            style={{marginRight: 10}}
                        />

                        <RoundButton
                            icon={<Ionicons name="share-social-sharp" size={18} color={DARK_TEXT} />}
                            onPress={() => onPressShare(item.user_name, item.meal_name, item._id, item.image_url)}
                        />
                    </View>

                </View>

                {item.meal_video_url !== "" ? (
                    <RoundButton
                        icon={<Feather name="play" size={18} color={DARK_TEXT} />}
                        onPress={() => {
                            Linking.openURL(item.meal_video_url).catch(err => console.log(err))
                        }}
                        style={styles.playButton}
                    />
                ) : null}

            </View>
        </>
    )
};

const styles = StyleSheet.create({
    image: {
        width: RECIPE_ITEM_WIDTH,
        height: RECIPE_ITEM_HEIGHT,
        opacity: 0.8
    },
    headerContainer: {
        position: 'absolute',
        paddingTop: 15,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: RECIPE_ITEM_WIDTH
    },
    playButton: {
        position: 'absolute',
        bottom: 30,
        left: 10
    }
});

export default Header;