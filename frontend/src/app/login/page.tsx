'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Check for auto-login data when component mounts
  useEffect(() => {
    const autoLoginData = localStorage.getItem('autoLoginData')
    if (autoLoginData) {
      try {
        const data = JSON.parse(autoLoginData)
        setEmail(data.email)
        setPassword(data.password)
        
        // Auto-login after a short delay to show the page
        setTimeout(() => {
          handleAutoLogin(data.email, data.password)
        }, 1000)
      } catch (err) {
        console.error('Error parsing auto-login data:', err)
      }
    }
  }, [])

  const handleAutoLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setError('')

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, always succeed
      localStorage.setItem('token', 'demo-token')
      
      // Clear auto-login data
      localStorage.removeItem('autoLoginData')
      
      // Redirect to dashboard
      router.push('/dashboard/')
    } catch (err) {
      setError('Auto-login failed')
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, always succeed
      localStorage.setItem('token', 'demo-token')
      
      // Redirect to dashboard
      router.push('/dashboard/')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-3xl font-bold text-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Gem</span>
            </Link>
            <p className="mt-2 text-slate-600">AI-first recruiting platform</p>
            <h1 className="text-2xl font-bold mt-6 text-slate-800">Welcome Back</h1>
            <p className="text-slate-600 mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-center">
              Signing in...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-700 font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 bg-white text-slate-800"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-slate-700 font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 bg-white text-slate-800"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 font-medium"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0zm0 0V9a1 1 0 011-1h3a1 1 0 011 1v4a1 1 0 001 1h1a1 1 0 001-1V9a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <Link href="/role-select/" className="font-medium text-purple-600 hover:text-purple-500">
                Select your role
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Gem. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}