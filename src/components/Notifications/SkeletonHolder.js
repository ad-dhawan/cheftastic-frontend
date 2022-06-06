import React from 'react'
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import {BACKGROUND} from '../../utils/colors'
import { NOTIFICATION_LIKE_HEIGHT, NOTIFICATION_LIKE_WIDTH } from '../../utils/values'

const SkeletonHolder = () => 
    Array.from({length: 12}).map((_, index) => (

        <SkeletonPlaceholder>
                
            <View style={{ height: NOTIFICATION_LIKE_HEIGHT, marginBottom: 10, marginHorizontal: 10, borderRadius: 8 }} />

        </SkeletonPlaceholder>

    ));


export default SkeletonHolder
