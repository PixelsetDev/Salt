import { Platform } from 'react-native';

export const getSignInRedirectUrl = () => {
  if (Platform.OS === 'web') {
    return window.location.protocol + '//' + window.location.host + '/callback';
  } else {
    return 'ourcookbook://callback';
  }
};

export const getLastKnownAuth = () => {
  return localStorage.getItem('ocbIsAuth') === 'true';
}

export const setLastKnownAuth = (isAuth: boolean) => {
  if (isAuth) {
    localStorage.setItem('ocbIsAuth', 'true');
  } else {
    localStorage.setItem('ocbIsAuth', 'false');
  }
}