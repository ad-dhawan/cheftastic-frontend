import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Animated,
  Image,
  View,
  Text,
  Dimensions
} from 'react-native';

import {ACCENT, GREY, PRIMARY} from '../../utils/colors';
import { FEED_ITEM_RADIUS, CAROUSEL_CONTENT_HEIGHT, CAROUSEL_CONTENT_WIDTH } from '../../utils/values';

const images = [
  'https://images.unsplash.com/photo-1526763025764-2a8073a0cd43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG9wZW4lMjBzb3VyY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1495507015875-089a5c9bd885?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fG9wZW4lMjBzb3VyY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1624964562774-9d27c0c7d27f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fG9wZW4lMjBzb3VyY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1509573563917-a778dc0a5477?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fG9wZW4lMjBzb3VyY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1506222761176-7f60d01a7cb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
];

const {WIDTH} = Dimensions.get('screen')
const ACTIVE_INDICATOR_SIZE = 10;
const INACTIVE_INDICATOR_SIZE = 7

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });
  
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback?.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const InifiniteCarousel = ({data}) => {
  const animation = useRef(new Animated.Value(0));
  const [currentImage, setCurrentImage] = useState(0);
  useInterval(() => handleAnimation(), 4000);

  const handleAnimation = () => {
    let newCurrentImage = currentImage + 1;

    if (newCurrentImage >= images.length) {
      newCurrentImage = 0;
    }

    Animated.spring(animation.current, {
      toValue: -(CAROUSEL_CONTENT_WIDTH * newCurrentImage),
      useNativeDriver: true,
    }).start();

    setCurrentImage(newCurrentImage);
  };

  return (
    <>

      <View>

        <Animated.View
          style={[
            styles.container,
            {
              transform: [{translateX: animation.current}],
            },
          ]}>
          {images.map(image => (
            <Image source={{uri: image}} style={styles.image} />
          ))}
        </Animated.View>

        <View style={styles.indicatorContainer}>
          {images.map((image, index) => (
            <View
              key={`${image}_${index}`}
              style={[
                styles.indicator,
                index === currentImage
                  ? styles.activeIndicator
                  : styles.inActiveIndicator,
              ]}
            />
          ))}
        </View>

      </View>

    </>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    width: WIDTH,
  },
  image: {
    resizeMode: 'cover',
    height: CAROUSEL_CONTENT_HEIGHT,
    width: CAROUSEL_CONTENT_WIDTH,
    borderRadius: FEED_ITEM_RADIUS,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: CAROUSEL_CONTENT_WIDTH,
    top: 10,
  },
  indicator: {
    marginHorizontal: 6,
    marginBottom: 5,
  },
  activeIndicator: {
    backgroundColor: ACCENT,
    width: ACTIVE_INDICATOR_SIZE,
    height: ACTIVE_INDICATOR_SIZE,
    borderRadius: ACTIVE_INDICATOR_SIZE,
  },
  inActiveIndicator: {
    width: INACTIVE_INDICATOR_SIZE,
    height: INACTIVE_INDICATOR_SIZE,
    borderRadius: INACTIVE_INDICATOR_SIZE,
    opacity: 0.7,
    backgroundColor: GREY
  },
});

export default InifiniteCarousel;