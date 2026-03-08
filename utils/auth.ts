import { Platform } from 'react-native';

export const getSignInRedirectUrl = () => {
  if (Platform.OS === 'web') {
    return window.location.protocol + '//' + window.location.host + '/callback';
  } else {
    return 'ourcookbook://callback';
  }
};