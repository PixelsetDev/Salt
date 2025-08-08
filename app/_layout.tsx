import { LogtoProvider, LogtoConfig } from '@logto/rn';
import { Slot } from 'expo-router';

let config: LogtoConfig;

config = {
  endpoint: 'https://auth.portalsso.com/',
  appId: 'lcjrqsxgiqxt27dyygoby',
  scopes: ['email', 'profile', 'roles']
};

export default () => (
  <LogtoProvider config={config}>
    <Slot />
  </LogtoProvider>
);