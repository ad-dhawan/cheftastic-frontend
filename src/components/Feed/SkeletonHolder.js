import React from 'react'
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import {BACKGROUND} from '../../utils/colors'
import {FEED_ITEM_RADIUS, FEED_MEAL_IMAGE_HEIGHT} from '../../utils/values'

const SkeletonHolder = () => 
    Array.from({length: 3}).map((_, index) => (
        <View style={{marginBottom: 10}}>
            <SkeletonPlaceholder>
                <View style={{height: FEED_MEAL_IMAGE_HEIGHT, width: '100%', borderRadius: FEED_ITEM_RADIUS}} />
            </SkeletonPlaceholder>

            <View style={{position: 'absolute', backgroundColor: BACKGROUND, height: 100, bottom: 10, left: 10, right: 10, borderRadius: FEED_ITEM_RADIUS, padding: 10}}>

                <SkeletonPlaceholder>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{height: 20, width: 200, borderRadius: FEED_ITEM_RADIUS}} />
                        <View style={{height: 15, width: 30, borderRadius: FEED_ITEM_RADIUS}} />
                    </View>

                    <View style={{height: 15, width: 150, borderRadius: FEED_ITEM_RADIUS, marginTop: 10}} />
                    <View style={{height: 15, width: 100, borderRadius: FEED_ITEM_RADIUS, marginTop: 10}} />
                </SkeletonPlaceholder>

            </View>

        </View>
    ));


export default SkeletonHolder
