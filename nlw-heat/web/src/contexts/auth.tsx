import { createContext, ReactNode, useEffect, useState } from 'react'
import { IUser } from '../interfaces/IUser'
import { api } from '../services/api'

type AuthContextData = {
  user: IUser | null
  signInUrl: string
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode
}

type AuthResponse = {
  token: string
  user: IUser
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`

  async function signIn(githubCode: string) {
    const { data: response } = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })

    const { token, user } = response

    localStorage.setItem('@dowhile:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('dowhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<IUser>('profile').then(data => {
        const { data: response } = data;

        setUser(response)
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutCode)

      signIn(githubCode)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      signInUrl,
      user,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
