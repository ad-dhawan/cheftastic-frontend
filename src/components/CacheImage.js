import React from 'react';
import FastImage from 'react-native-fast-image';

import {SERVER_URL} from '../services/axios'

const CacheImage = (props) => {
  return (
    <>
      <FastImage
        style={props.style}
        source={{
          uri: props.uri.startsWith("https") ? props.uri : `${SERVER_URL}/${props.uri}`,
          priority: FastImage.priority.high,
        }}
        // resizeMode={FastImage.resizeMode.cover}
      />
    </>
  );
};

export default CacheImage;
