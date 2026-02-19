import { useLogto } from '@logto/rn';

export const useAuthenticatedFetch = () => {
  const { getAccessToken, isAuthenticated } = useLogto();

  return async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    if (!isAuthenticated) {
      throw new Error('User is not authenticated');
    }

    const token = await getAccessToken('https://api.ourcookbook.org');
    console.log(token);

    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
    });
  };
};