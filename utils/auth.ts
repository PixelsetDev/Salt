// utils/auth.js (or wherever you keep utilities)
import { Platform } from 'react-native'; // or your platform detection

export const getSignInRedirectUrl = () => {
  if (Platform.OS === 'web') {
    return window.location.protocol + '//' + window.location.host + '/callback';
  } else {
    return 'ourcookbook://callback';
  }
};