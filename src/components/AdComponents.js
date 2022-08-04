import React, {useRef, useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import NativeAdView from 'react-native-admob-native-ads';
import LinearGradient from 'react-native-linear-gradient';

import { BOLD, FEED_ITEM_RADIUS, FEED_MEAL_IMAGE_HEIGHT, FEED_MEAL_IMAGE_WIDTH, REGULAR } from '../utils/values';
import { DARK_TEXT, LIGHT_TEXT, TRANSPARENT } from '../utils/colors';
import { ADMOB_ANDROID_ID, AD_TEST_DEVICE_ID, ADMOB_IOS_ID } from '@env'


const AdComp = (props) => {
    const nativeAdViewRef = useRef();
    const [headline, setHeadline] = useState('Cheftastic 2.0');
    const [tagline, setTagline] = useState('be your own chef');
    const [imageUrl, setImageUrl] = useState('https://storage.googleapis.com/users-profile-image/Cheftastic%20Logo.png');

    useEffect(() => {
        nativeAdViewRef.current?.loadAd();
      }, []);

    const adUnitId = Platform.OS === 'ios' ? ADMOB_IOS_ID : ADMOB_ANDROID_ID;

    const onAdFailedToLoad = event => {
      console.log('AD', 'FAILED', event.error.message);
    };
  
    const onAdLoaded = () => {
      console.log('AD', 'LOADED', 'Ad has loaded successfully');
    };

    const onNativeAdLoaded = event => {
        console.log("AD", event)
        console.log('AD', 'RECIEVED', 'Unified ad  Recieved', event);
        setLoaded(true);
        setHeadline(event.headline)
        setTagline(event.tagline)
        if (event.images){
            setImagUrl(event.images[0].url)
        } else {
            setImagUrl(event.icon)
        }
    };

    return(
        <NativeAdView
            ref={nativeAdViewRef}
            adUnitID={adUnitId}
            mediaAspectRatio="square"
            onNativeAdLoaded={onNativeAdLoaded}
            onAdLoaded={onAdLoaded}
            onAdFailedToLoad={onAdFailedToLoad}
        >
            <View style={styles.adContainer}>
                <Image source={{uri: imageUrl}} style={styles.adImage} />

                <LinearGradient
                colors={[TRANSPARENT, '#00000050', DARK_TEXT]}
                style={styles.linearGradient}
                />
                
                <View style={styles.adTextContainer}>
                    <Text style={styles.headline} >{headline}</Text>
                    <Text style={styles.tagline} >{tagline}</Text>
                </View>
            </View>
        </NativeAdView>
    );
};

const styles = StyleSheet.create({
    adContainer: {
        marginBottom: 10,
        height: FEED_MEAL_IMAGE_HEIGHT,
        width: FEED_MEAL_IMAGE_WIDTH,
    },
    adImage: {
        height: FEED_MEAL_IMAGE_HEIGHT,
        width: FEED_MEAL_IMAGE_WIDTH,
        borderRadius: FEED_ITEM_RADIUS,
    },
    adTextContainer: {
        position: 'absolute',
        padding: 10,
        bottom: 0,
        left: 15
    },
    headline: {
        fontSize: 16,
        color: LIGHT_TEXT,
        fontFamily: BOLD
    },
    tagline: {
        fontSize: 13,
        color: LIGHT_TEXT,
        fontFamily: REGULAR,
        marginTop: 2
    },
    linearGradient: {
        position: 'absolute',
        bottom: 0,
        // left: 10,
        height: FEED_MEAL_IMAGE_HEIGHT / 2,
        width: FEED_MEAL_IMAGE_WIDTH,
        borderBottomRightRadius: FEED_ITEM_RADIUS,
        borderBottomLeftRadius: FEED_ITEM_RADIUS
    }
})

export default AdComp;