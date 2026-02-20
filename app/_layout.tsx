import { useEffect } from 'react';
import { LogtoProvider, LogtoConfig } from '@logto/rn';
import { Slot } from 'expo-router';
import * as Sentry from '@sentry/react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Merriweather_400Regular } from '@expo-google-fonts/merriweather';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { UserProvider } from '../components/auth/UserProvider';

//      ██████  ██████  ██    ██████
//      ██      ██  ██  ██      ██
//      ██████  ██████  ██      ██
//          ██  ██  ██  ██      ██
//      ██████  ██  ██  ██████  ██
//   Copyright (c) 2025 - 2026 Pixelset

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: 'https://ab4cc21cf3270eeb0a957a3e0a610a8d@o4509832364687360.ingest.de.sentry.io/4509832365801552',

  sendDefaultPii: true,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

let config: LogtoConfig = {
  endpoint: 'https://auth.portalsso.com/',
  appId: 'lcjrqsxgiqxt27dyygoby',
  scopes: ['openid', 'email', 'profile', 'roles'],
  resources: ['https://api.ourcookbook.org'],
};

export default Sentry.wrap(() => {
  const [loaded, error] = useFonts({
    'Merriweather': Merriweather_400Regular,
    'Roboto': Roboto_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <LogtoProvider config={config}>
      <UserProvider>
        <Slot />
      </UserProvider>
    </LogtoProvider>
  );
});