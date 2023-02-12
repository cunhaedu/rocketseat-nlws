import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '../interfaces/IUser';
import * as AuthSession from 'expo-auth-session';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENT_ID = '7dbb21fa67486bdc1bca';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type IAuthContext = {
  user: IUser | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type IAuthProvider = {
  children: React.ReactNode;
}

type AuthResponse = {
  token: string;
  user: IUser;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string
  },
  type?: string;
}

export const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: IAuthProvider) {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  async function signIn() {
    try {
      setIsSigningIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const { data: response } = await api.post<AuthResponse>('authenticate', {
          code: authSessionResponse.params.code
        });

        const { user, token } = response;

        api.defaults.headers.common['authorization'] = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUser(user);
      }

      setIsSigningIn(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.multiRemove([USER_STORAGE, TOKEN_STORAGE]);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['authorization'] = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }

      setIsSigningIn(false);
    }

    loadUserStorageData();
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isSigningIn,
      signIn,
      signOut,
    }}>
      { children }
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
