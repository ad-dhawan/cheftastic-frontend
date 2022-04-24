import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {TRANSPARENT, PRIMARY} from '../utils/colors';
import StatusBar from '../components/StatusBar';
import Carousel from '../components/Caraousel';

const Feed = () => {

  return (
    <>
      <StatusBar translucent={false} backgroundColor={PRIMARY} />
      {/* <Carousel /> */}

      <SafeAreaView>
        <Text>Feed</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
});

export default Feed;
