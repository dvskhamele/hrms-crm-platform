'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthWrapperProps {
  children: React.ReactNode
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    // For development, bypass authentication entirely
    console.log('Bypassing authentication for development')
    setIsCheckingAuth(false)
    
    // Also set it after a short delay as a backup
    const timer = setTimeout(() => {
      setIsCheckingAuth(false)
    }, 50)
    
    return () => clearTimeout(timer)
  }, [pathname, router])

  // Force isCheckingAuth to false after mount
  useEffect(() => {
    setIsCheckingAuth(false)
  }, [])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return <>{children}</>
}

export default AuthWrapper