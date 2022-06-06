import React from 'react';
import {SafeAreaView} from 'react-native';


import FeedList from '../components/Feed/FeedList';
import FeedHeader from '../components/Feed/FeedHeader';

const Feed = () => {

  return (
    <>

      <SafeAreaView>

        <FeedHeader />

        <FeedList style={{marginHorizontal: 15}} />

      </SafeAreaView>
    </>
  );
};

export default Feed;
