import { LogtoProvider, LogtoConfig } from '@logto/rn';
import { Slot } from 'expo-router';
import * as Sentry from '@sentry/react-native';

//   ██████  ██████  ██    ██████
//   ██      ██  ██  ██      ██
//   ██████  ██████  ██      ██
//       ██  ██  ██  ██      ██
//   ██████  ██  ██  ██████  ██
//   Copyright (c) 2025 Pixelset

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
  scopes: ['email', 'profile', 'roles'],
  resources: ['https://api.ourcookbook.org'],
};

export default Sentry.wrap(() => (<LogtoProvider config={config}>
  <Slot />
</LogtoProvider>));