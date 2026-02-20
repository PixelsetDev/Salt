import { useLogto } from '@logto/rn';

export const useAuthenticatedFetch = () => {
  const { getAccessToken, getIdToken, isAuthenticated } = useLogto();

  return async (url: string, options: RequestInit = {}): Promise<Response> => {
    if (!isAuthenticated) {
      return Promise.reject(new Error('User is not authenticated'));
    }

    const accessToken = await getAccessToken('https://api.ourcookbook.org');
    const idToken = await getIdToken();

    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        Authorization: `Bearer ${accessToken}`,
        'X-PIXELSET-IDENTITY': idToken ?? '',
      },
    });
  };
};

