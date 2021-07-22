import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RNBootSplash from 'react-native-bootsplash';

import Main from './src/navigators/Main';
import {PRIMARY, BACKGROUND, BLACK_TEXT} from './src/utils/colors';
import {persistor, store} from './src/redux/store';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  return (
    <View style={{backgroundColor: BACKGROUND, flex: 1}}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    </View>
  );
};

export default App;
