import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './src/navigators/AppNavigation';
import Statusbar from './src/components/StatusBar';
import {persistor, store} from './src/redux/store';
import { BACKGROUND } from './src/utils/colors';

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
    <>
      <Statusbar translucent={false} bgColor={BACKGROUND} theme={'dark'} />
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppNavigation />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </>
  );
};

export default App;
