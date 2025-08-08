import { LogtoProvider, LogtoConfig } from '@logto/rn';
import { Slot } from 'expo-router';
import { Text } from 'react-native';

const config: LogtoConfig = {
  endpoint: 'https://auth.portalsso.com/',
  appId: 'lcjrqsxgiqxt27dyygoby',
  scopes: ['email','profile','roles']
};

const App = () => (
  <LogtoProvider config={config}>
    <Text>Test</Text>
    <Slot />
  </LogtoProvider>
);