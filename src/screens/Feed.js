import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {TRANSPARENT} from '../utils/colors'
import StatusBar from '../components/StatusBar';
import Carousel from '../components/Caraousel';

const Feed = () => {
  return (
    <>
    <StatusBar translucent={true} bgColor={TRANSPARENT} />
        <Carousel />
      <SafeAreaView style={styles.safe}>
        <Text>Hey There</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
});

export default Feed;
