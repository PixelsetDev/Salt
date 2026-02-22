import { useLogto } from '@logto/rn';
import { useCallback } from 'react';

export const useApiCall = () => {
  const { getAccessToken, getIdToken, isAuthenticated } = useLogto();
  return useCallback(
    async (url: string, requiredAuth = false, options: RequestInit = {}) => {
      console.log(`Is authenticated for ${url}: ${isAuthenticated}`);

      if (!isAuthenticated && requiredAuth) {
        throw new Error('User is not authenticated');
      }

      let accessToken, idToken;

      if (isAuthenticated) {
        accessToken = await getAccessToken('https://api.ourcookbook.org');
        idToken = await getIdToken();

        return fetch(url, {
          ...options,
          headers: {
            ...(options.headers ?? {}),
            Authorization: `Bearer ${accessToken}`,
            'X-PIXELSET-IDENTITY': idToken ?? '',
          },
        });
      } else {
        return fetch(url, {
          ...options,
          headers: {...(options.headers ?? {})},
        });
      }
    },
    []
  );
};