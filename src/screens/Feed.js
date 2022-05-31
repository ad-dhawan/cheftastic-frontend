import React from 'react';
import {SafeAreaView} from 'react-native';


import FeedList from '../components/Feed/FeedList';
import FeedHeader from '../components/Feed/FeedHeader';

const Feed = () => {

  return (
    <>

      <SafeAreaView>

        <FeedHeader />

        <FeedList style={{margin: 10}} />

      </SafeAreaView>
    </>
  );
};

export default Feed;
