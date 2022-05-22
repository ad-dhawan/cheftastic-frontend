import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {TRANSPARENT, PRIMARY} from '../utils/colors';
import StatusBar from '../components/StatusBar';

const Feed = () => {

  return (
    <>
      <StatusBar translucent={false} backgroundColor={PRIMARY} theme={'light'} />

      <SafeAreaView>
        <Text>Feed</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
});

export default Feed;
