import React, {useEffect} from 'react';
import { Text } from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import { Provider as RNPProvider } from 'react-native-paper';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import {AdManager} from "react-native-admob-native-ads";

import AppNavigation from './src/navigators/AppNavigation';
import linking from './src/services/linking';
import Statusbar from './src/components/StatusBar';
import {persistor, store} from './src/redux/store';
import { BACKGROUND } from './src/utils/colors';
import { AD_TEST_DEVICE_ID } from '@env'

const App = () => {
  useEffect(() => {
    const init = async () => {
      
      admob()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,

        tagForChildDirectedTreatment: true,

        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        console.log('AD CONFIGURATION SET')
      });

      AdManager.setRequestConfiguration({
        testDeviceIds:[AD_TEST_DEVICE_ID]
      });
      
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
