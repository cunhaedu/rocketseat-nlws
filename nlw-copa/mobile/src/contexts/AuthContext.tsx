import * as Google from 'expo-auth-session/providers/google';
import { createContext, ReactNode, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

export type UserProps = {
  name: string;
  avatarUrl: string;
}

export type AuthContextData = {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => void;
}

export type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [_request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);
      const { data: tokenData } = await api.post<{ token: string }>('users', {
        access_token
      });

      api.defaults.headers.common['Authorization'] = `Bearer ${tokenData.token}`;

      const userInfoResponse = await api.get<{ user: UserProps }>('users/me');

      setUser(userInfoResponse.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();

    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (response && response.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
