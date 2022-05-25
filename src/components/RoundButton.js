import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {GREY, BACKGROUND} from '../utils/colors';
const CONTAINER_SIZE = 40;

const RoundButton = props => {
  return (
    <>
      <TouchableOpacity
        onPress={props.onPress}
        hitSlop={styles.hitSlop}
        style={[styles.container, props.style]}>
        {props.icon}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    borderWidth: 0.5,
    borderRadius: CONTAINER_SIZE,
    borderColor: GREY,
    backgroundColor: BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hitSlop: {
      top: 10,
      bottom: 10,
      right: 10,
      left: 10
  }
});

export default RoundButton;
