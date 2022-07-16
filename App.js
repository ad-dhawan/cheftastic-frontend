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

const App = () => {
  useEffect(() => {
    const init = async () => {
      
      admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });

      AdManager.setRequestConfiguration({
        testDeviceIds:["Your test device id"]
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
