'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  name: string
  companyName: string
  companySize: string
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // In frontend-only mode, always succeed
      console.log('Using mock login for prototype')
      localStorage.setItem('token', 'prototype-token')
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // In frontend-only mode, always succeed
      console.log('Using mock registration for prototype')
      localStorage.setItem('token', 'prototype-token')
      router.push('/onboarding')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('onboardingComplete')
    router.push('/login')
  }

  return {
    login,
    register,
    logout,
    isLoading,
    error
  }
}