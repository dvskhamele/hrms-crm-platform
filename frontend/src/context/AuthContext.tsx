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
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Never loading in prototype mode
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for existing token to maintain login state
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      
      // Check for auto-login data from role selection
      const autoLoginData = localStorage.getItem('autoLoginData');
      if (autoLoginData) {
        try {
          const data = JSON.parse(autoLoginData);
          let userRole = 'ADMIN';
          let userName = 'Admin User';
          
          if (data.email === 'david.wilson@gem.com') {
            userRole = 'HR_MANAGER';
            userName = 'David Wilson';
          } else if (data.email === 'alice.johnson@gem.com') {
            userRole = 'RECRUITER';
            userName = 'Alice Johnson';
          } else if (data.email === 'john.doe@example.com') {
            userRole = 'CANDIDATE';
            userName = 'John Doe';
          }
          
          setUser({
            id: 1,
            email: data.email,
            name: userName,
            role: userRole
          });
          
          // Clear auto-login data after use
          localStorage.removeItem('autoLoginData');
        } catch (err) {
          // Fallback to admin user if parsing fails
          setUser({
            id: 1,
            email: 'admin@gem.com',
            name: 'Admin User',
            role: 'ADMIN'
          });
        }
      } else {
        // Fallback to admin user
        setUser({
          id: 1,
          email: 'admin@gem.com',
          name: 'Admin User',
          role: 'ADMIN'
        });
      }
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
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
    setIsLoading(true);
    setError(null);
    
    try {
      // Determine login email and password
      let loginEmail = email;
      let loginPassword = password;
      
      // In prototype mode, always succeed
      localStorage.setItem('token', 'prototype-token');
      setIsAuthenticated(true);
      
      // Determine user role based on email
      let userRole = 'ADMIN';
      let userName = 'Admin User';
      
      if (loginEmail === 'david.wilson@gem.com') {
        userRole = 'HR_MANAGER';
        userName = 'David Wilson';
      } else if (loginEmail === 'alice.johnson@gem.com') {
        userRole = 'RECRUITER';
        userName = 'Alice Johnson';
      } else if (loginEmail === 'john.doe@example.com') {
        userRole = 'CANDIDATE';
        userName = 'John Doe';
      }
      
      setUser({
        id: 1,
        email: loginEmail,
        name: userName,
        role: userRole
      });
      
      // Check if onboarding is complete
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      if (!onboardingComplete) {
        router.push('/onboarding');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('onboardingComplete')
    
    // Also clear the auth cookie server-side
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {
      // If logout API fails, still update client state
    });
    
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