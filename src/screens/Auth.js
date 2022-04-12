import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {PRIMARY, BLACK_TEXT, BACKGROUND} from '../utils/colors';
import Button from '../components/Button';

const Auth = ({navigation}) => {
  const dispatch = useDispatch();

  const onSignIn = () => {
    navigation.replace('Feed');
    dispatch({
      type: 'LOGIN',
    });
  };

  return (
      <Button text="login" onPress={onSignIn} style={{position: 'absolute', bottom: 75}} />
  );
};

const styles = StyleSheet.create({});

export default Auth;
