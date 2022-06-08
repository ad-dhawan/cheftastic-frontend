import React from 'react';
import {SafeAreaView} from 'react-native';


import FeedList from '../components/Feed/FeedList';
import FeedHeader from '../components/Feed/FeedHeader';
import { BACKGROUND } from '../utils/colors';

const Feed = ({navigation}) => {

  return (
    <>

      <SafeAreaView style={{flex: 1, backgroundColor: BACKGROUND}}>

        <FeedHeader navigation={navigation} />

        <FeedList style={{marginHorizontal: 15, marginTop: 10}} />

      </SafeAreaView>
    </>
  );
};

export default Feed;
