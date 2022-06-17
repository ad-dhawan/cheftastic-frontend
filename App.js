import React, {useEffect} from 'react';
import { Text } from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import { Provider as RNPProvider } from 'react-native-paper';

import AppNavigation from './src/navigators/AppNavigation';
import linking from './src/services/linking';
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
      <RNPProvider>
        <Statusbar translucent={false} bgColor={BACKGROUND} theme={'dark'} />
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>} >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppNavigation />
            </PersistGate>
          </Provider>
        </NavigationContainer>
      </RNPProvider>
    </>
  );
};

export default App;
