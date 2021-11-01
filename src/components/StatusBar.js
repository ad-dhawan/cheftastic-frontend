import React from 'react';
import {StatusBar} from 'react-native';

const Statusbar = (props) => {
  return (
    <StatusBar
      barStyle="dark-content"
      hidden={false}
      translucent={props.translucent}
      backgroundColor={props.bgColor}
    />
  );
};

export default Statusbar;
