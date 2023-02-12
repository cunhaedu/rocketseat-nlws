import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import { StatusBar } from 'react-native';
import { useEffect, useRef } from 'react';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';

import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import './src/services/notificationConfig';
import { getPushNotificationsToken } from './src/services/getPushNotification';

export default function App() {
  const [isFontLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificationsListener = useRef<Subscription>();
  const responseNotificationsListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationsToken();
  }, []);

  useEffect(() => {
    getNotificationsListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log(notification);
      });

    responseNotificationsListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      if(
        getNotificationsListener.current &&
        responseNotificationsListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationsListener.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationsListener.current
        );
      }
    }
  }, []);

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {isFontLoaded ? <Routes /> : <Loading /> }

    </Background>
  );
}
