import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Animated,
  Text,
  View,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

import {ACCENT, DARK_TEXT, GREY, LIGHT_TEXT, TRANSPARENT} from '../../utils/colors';
import { FEED_ITEM_RADIUS, CAROUSEL_CONTENT_HEIGHT, CAROUSEL_CONTENT_WIDTH, BOLD, REGULAR } from '../../utils/values';
import { GetData } from '../../services/axios';
import CacheImage from '../CacheImage';
import { UserAvatar } from './FeedHeader';

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
  const [specialsFeed, setSpecialsFeed] = useState([]);

  useInterval(() => handleAnimation(), 4000);

  const handleAnimation = () => {
    let newCurrentImage = currentImage + 1;

    if (newCurrentImage >= specialsFeed.length) {
      newCurrentImage = 0;
    }

    Animated.spring(animation.current, {
      toValue: -(CAROUSEL_CONTENT_WIDTH * newCurrentImage),
      useNativeDriver: true,
    }).start();

    setCurrentImage(newCurrentImage);
  };

  useEffect(() => {
    data.map(item => {
      GetData.getSpecificRecipe(item._id).then(res => {
          if (res && res.status === 200) {
              specialsFeed.push(res.data)
          } else console.log(res);
      });
    })
  }, [])

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

              {specialsFeed.map(item => (
                <View>

                  <CacheImage
                      uri={item.image_url}
                      style={styles.image}
                  />
                  
                  <LinearGradient
                    colors={[TRANSPARENT, '#00000050', DARK_TEXT]}
                    style={styles.linearGradient}
                  />

                  <View style={styles.detailsContainer}>

                    <View style={styles.usernameContainer}>
                      <UserAvatar size={18} avatar={item.user_avatar} />
                      <Text style={styles.username}>{item.user_name}</Text>
                    </View>

                    <Text style={styles.mealName}>{item.meal_name}</Text>
                  </View>

                </View>
              ))}

        </Animated.View>


        <View style={styles.indicatorContainer}>
          {specialsFeed.map((item, index) => (
            <View
              key={`${item.meal_name}_${index}`}
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
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    height: CAROUSEL_CONTENT_HEIGHT / 1.5,
    width: CAROUSEL_CONTENT_WIDTH,
    borderBottomRightRadius: FEED_ITEM_RADIUS,
    borderBottomLeftRadius: FEED_ITEM_RADIUS
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 10,
    width: CAROUSEL_CONTENT_WIDTH,
    alignItems: 'center'
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  username: {
    fontSize: 12,
    color: LIGHT_TEXT,
    fontFamily: REGULAR,
    textTransform: 'lowercase',
    marginLeft: 5
  },
  mealName: {
    fontSize: 12,
    color: LIGHT_TEXT,
    fontFamily: BOLD,
    textTransform: 'lowercase'
  },
});

export default InifiniteCarousel;