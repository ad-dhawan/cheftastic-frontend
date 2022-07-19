import React, {useState} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CacheImage from '../CacheImage';
import { RECIPE_ITEM_HEIGHT, RECIPE_ITEM_WIDTH, DARK_TEXT } from '../../utils/values';
import RoundButton from '../RoundButton';
import { onPressShare } from '../Feed/FeedList';
import { GetData } from '../../services/axios';
import Modal from '../Modal';

const Header = ({navigation, item}) => {
    const {saved_recipes, user_id} = useSelector(state => state);

    const [isSaved, setIsSaved] = useState(saved_recipes.map(data => data._id === item._id))
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onPressSave = () => {
        setIsSaved(!isSaved)
        
        const data = {
            user_id: user_id,
            action: isSaved ? 'unsave' : 'save'
        }

        GetData.saveRecipe(item._id, data).then(response => {
            if(response && response.status === 200) {
                console.log("RESPONSE: ", response.data)
            }
            else console.log(response);
        });
    }

    const onPressDelete = () => {
        GetData.deleteRecipe(item._id).then(res => {
            if (res && res.status === 200) {
                
                console.log(res.data)
                setIsModalVisible(false)
                navigation.goBack();
                
            } else console.log(res);
        });
    }

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
                        {item.user_id === user_id ? (
                            <RoundButton
                                icon={<MaterialCommunityIcons name={"delete"} size={20} color={DARK_TEXT} />}
                                onPress={() => setIsModalVisible(true)}
                                style={{marginRight: 10}}
                            />
                        ) : null}

                        <RoundButton
                            icon={<Ionicons name={isSaved.toString() === 'true' ? "bookmark" : "bookmark-outline"} size={20} color={DARK_TEXT} />}
                            onPress={onPressSave}
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

            <Modal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                title={"Are you sure?"}
                titleAlign={"left"}
                body={"The action is permanent and irreversible . Make sure you want to do this."}
                bodyAlign={"left"}
                leftButtonText={"Cancel"}
                rightButtonText={"Yes, Delete"}
                leftButtonAction={() => setIsModalVisible(false)}
                rightButtonAction={onPressDelete}
            />

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