import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View, Image } from 'react-native';

const ImageIconButton = ({noFeedback, icon, style, size, onPress}) => {
  if (noFeedback) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[style, {width: size, height: size}]}>
          <Image
            source={icon}
            style={{width: size, height: size}}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={[style, {width: size, height: size}]}>
        <Image
            source={icon}
            style={{width: size, height: size}}
        />
      </TouchableOpacity>
    )
  }
};

export default React.memo(ImageIconButton);