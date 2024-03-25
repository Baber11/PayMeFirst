/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {NativeBaseProvider} from 'native-base';

import {store, persistor} from './SRC/Store/index';
import {stripeKey} from './SRC/Config';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import SplashScreen from './SRC/Screens/SplashScreen';
import Walkthrough from './SRC/Screens/Walkthrough';
import AppNavigator, {DrawerRoot} from './SRC/appNavigation';

import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './SRC/Screens/LoginScreen';
import NetworkErrorAlert from './SRC/Components/NetworkErrorAlert';
import Color from './SRC/Assets/Utilities/Color';
import { Get } from './SRC/Axios/AxiosInterceptorFunction';

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };

  


  console.reportErrorsAsExceptions = false;
  return (
    <StripeProvider 
    publishableKey={"pk_test_51McSueJ0WRwehn2Uuf4rm6WNHPQvaJY9NGU235gUEqPA3AJuc9Mq1x98Y8B8uE5eMfivo5l2xK4Vau21zau7ZBDp00g7qWfkx3"}
    // merchantIdentifier="merchant.identifier" // required for Apple Pay
    // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <MainContainer />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
    </StripeProvider>
  );
};

const MainContainer = () => {
  const dispatch = useDispatch();

  // fcm
  //  useEffect(() => {
  //    Notifications.registerRemoteNotifications();
  //    // app opened
  //    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //      Notifications.postLocalNotification({
  //        title: remoteMessage.notification.title,
  //        body: remoteMessage.notification.body,
  //      });

  //      Notifications.events().registerNotificationOpened(
  //        (notification: Notification, completion) => {
  //          if (remoteMessage?.data?.flag == "Chat") {
  //            navigationService.navigate("ChatScreen", {
  //              roomId: remoteMessage?.data?.roomId,
  //            });
  //          }
  //          completion();
  //        }
  //      );
  //    });
console.log('baber')
  //    // app opened from background
  //    messaging().onNotificationOpenedApp((remoteMessage) => {
  //      if (remoteMessage?.data?.flag == "Chat") {
  //        navigationService.navigate("ChatScreen", {
  //          roomId: remoteMessage?.data?.roomId,
  //        });
  //      }
  //    });

  //    // when app is in quite state
  //    messaging()
  //      .getInitialNotification()
  //      .then((remoteMessage) => {
  //        if (remoteMessage) {
  //          if (remoteMessage?.data?.flag == "Chat") {
  //            navigationService.navigate("ChatScreen", {
  //              roomId: remoteMessage?.data?.roomId,
  //            });
  //          }
  //        }
  //      });

  //    // Register background handler
  //    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //      console.log("Message handled in the background!", remoteMessage);
  //    });

  //    return unsubscribe;
  //  }, []);
  // fcm ends

  useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
    }
    // console.log('hererererer');
    //  messaging()
    //    .getToken()
    //    .then((_token) => {
    //      dispatch(SetFCMToken(_token));
    //    })
    //    .catch(() => console.log("token error"));
    GetPermission();
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  return <AppNavigator />;
};

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(2000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
export default App;
