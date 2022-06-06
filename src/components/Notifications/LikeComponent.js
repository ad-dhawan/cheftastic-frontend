import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';

import CacheImage from '../CacheImage';
import { NOTIFICATION_LIKE_HEIGHT, NOTIFICATION_LIKE_RADIUS, REGULAR } from '../../utils/values'
import { DARK_TEXT, GREY, LIGHT_TEXT } from '../../utils/colors';

const LikeComponent = (props) => {
    return(
        <>
            <View style={[styles.mainContainer, props.style]}>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: LIGHT_TEXT, borderRadius: NOTIFICATION_LIKE_RADIUS, paddingLeft: 10}} >

                    <View>
                        <Text style={{fontSize: 13, fontFamily: REGULAR, color: DARK_TEXT}} >{props.data.body}</Text>
                        <Text style={{fontSize: 12, fontFamily: REGULAR, color: GREY, marginTop: 3}}>{moment(props.data.createdAt).fromNow(true)}</Text>
                    </View>

                    <CacheImage uri={props.data.image_url} style={{height: NOTIFICATION_LIKE_HEIGHT, width: 60, borderTopRightRadius:NOTIFICATION_LIKE_RADIUS, borderBottomRightRadius:NOTIFICATION_LIKE_RADIUS }} />

                </View>

            </View>
        </>
    )
};

const styles = StyleSheet.create({});

export default LikeComponent;