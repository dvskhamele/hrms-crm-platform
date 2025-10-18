'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  email: string
  name: string
  role: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: any) => Promise<void>
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Always authenticated in prototype mode
  const [user, setUser] = useState<User | null>({
    id: 1,
    email: 'admin@gem.com',
    name: 'Admin User',
    role: 'ADMIN'
  })
  const [isLoading, setIsLoading] = useState(false) // Never loading in prototype mode
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // In prototype mode, always set as authenticated
    setIsAuthenticated(true)
    setUser({
      id: 1,
      email: 'admin@gem.com',
      name: 'Admin User',
      role: 'ADMIN'
    })
    setIsLoading(false)
  }, [])

  const checkAuthStatus = () => {
    // In prototype mode, always return authenticated
    setIsAuthenticated(true)
    setUser({
      id: 1,
      email: 'admin@gem.com',
      name: 'Admin User',
      role: 'ADMIN'
    })
    setIsLoading(false)
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // In prototype mode, always succeed
      localStorage.setItem('token', 'prototype-token')
      setIsAuthenticated(true)
      setUser({
        id: 1,
        email: 'admin@gem.com',
        name: 'Admin User',
        role: 'ADMIN'
      })
      
      // Check if onboarding is complete
      const onboardingComplete = localStorage.getItem('onboardingComplete')
      if (!onboardingComplete) {
        router.push('/onboarding')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('onboardingComplete')
    setIsAuthenticated(false)
    setUser(null)
    router.push('/login')
  }

  const register = async (userData: any) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // In prototype mode, always succeed
      localStorage.setItem('token', 'prototype-token')
      setIsAuthenticated(true)
      setUser({
        id: 1,
        email: 'admin@gem.com',
        name: 'Admin User',
        role: 'ADMIN'
      })
      router.push('/onboarding')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    isLoading,
    error
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}