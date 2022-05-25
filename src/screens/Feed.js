import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'

import {DARK_TEXT, PRIMARY} from '../utils/colors';
import StatusBar from '../components/StatusBar';
import RoundButton from '../components/RoundButton';
import SpecialRecipes from '../components/Feed/SpecialRecipes';
import FeedList from '../components/Feed/FeedList';
import { Avatar } from 'react-native-paper';

const {WIDTH, HEIGHT} = Dimensions.get('screen')

const Feed = () => {
  const {user_avatar} = useSelector(state => state);

  return (
    <>

      <SafeAreaView>

        <View style={styles.header}>

          <RoundButton icon={<Entypo name="menu" size={22} color={DARK_TEXT} />} onPress={() => console.log("PRESSED MENU BUTTON")} />

          <Text style={styles.headerTitle}>Cheftastic</Text>

          <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={() => console.log('PROFILE BUTTON PRESSED')} >
            <Avatar.Image size={35} source={{uri: user_avatar}} />
          </TouchableOpacity>


          {/* <RoundButton icon={<Feather name="user" size={22} color={DARK_TEXT} />} onPress={() => console.log("PRESSED PROFILE BUTTON")} /> */}

        </View>

        {/* <SpecialRecipes style={{margin: 10}} /> */}
        <FeedList style={{margin: 10}} />


      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10
  }
});

export default Feed;
