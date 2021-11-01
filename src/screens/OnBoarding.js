import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {PRIMARY, BLACK_TEXT, BACKGROUND, ACCENT, TRANSPARENT} from '../utils/colors';
import StatusBar from '../components/StatusBar'
import Button from '../components/Button';

const {width, height} = Dimensions.get('screen');

const DATA = [
  {
    key: 1,
    title: 'Share Your Recipes With the World',
    description: '',
    animation: require('../assets/lottie/recipesAnim.json'),
  },
  {
    key: 2,
    title: 'Explore Delicious Recipes and Cook with Ease',
    description: '',
    animation: require('../assets/lottie/cookingAnim.json'),
  },
  {
    key: 3,
    title: 'Never Forget to Buy Grocery from Store',
    description: '',
    animation: require('../assets/lottie/basketAnim.json'),
  },
];

const Indicator = ({scrollX}) => {
  return (
    <View style={styles.indicatorContainer}>
      {DATA.map((_, i) => {
        const scale = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0.7, 1.2, 0.7],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0.5, 0.9, 0.5],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`indicator=${i}`}
            style={[styles.indicator, {transform: [{scale}], opacity}]}
          />
        );
      })}
    </View>
  );
};

const Square = ({scrollX}) => {
  const modulo = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );

  const rotate = modulo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });

  const translateX = modulo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={[styles.squareBg, {transform: [{rotate: '35deg'}]}]}
    />
  );
};

const onGetStarted = async() => {
}

const OnBoarding = (props) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.mainContainer}>
      <StatusBar bgColor={TRANSPARENT} translucent={true} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={{paddingBottom: 100}}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.itemImageContainer}>
                <LottieView
                  style={styles.itemAnim}
                  source={item.animation}
                  autoPlay
                  loop
                />
              </View>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <Button
        text="Get Started"
        style={styles.button}
        onPress={() => {
          AsyncStorage.setItem('isAppFirstLaunched', 'true');
          props.setIsNew(false)
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  itemImageContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  itemAnim: {
    width: width / 2,
    height: width / 2,
  },
  itemTextContainer: {
    flex: 0.3,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
    color: BLACK_TEXT,
    textAlign: 'center',
  },
  itemDescription: {
    fontWeight: '300',
    fontSize: 20,
    textAlign: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 150,
    flexDirection: 'row',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: PRIMARY,
    margin: 10,
  },
  squareBg: {
    width: height,
    height: height,
    backgroundColor: ACCENT,
    borderRadius: 86,
    position: 'absolute',
    top: -height * 0.6,
    left: -height * 0.3,
  },
  button: {
    position: 'absolute',
    bottom: 75,
  },
});

export default OnBoarding;
