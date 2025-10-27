'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RoleSelector() {
  const router = useRouter()
  const [showRoleSelector, setShowRoleSelector] = useState(false)

  // Check if we should show the role selector
  useEffect(() => {
    const autoLoginData = localStorage.getItem('autoLoginData')
    if (!autoLoginData) {
      setShowRoleSelector(true)
    }
  }, [])

  const selectRole = (role: any) => {
    const roleCredentials = {
      admin: { email: 'admin@gem.com', password: 'password123' },
      'hr-manager': { email: 'david.wilson@gem.com', password: 'password123' },
      recruiter: { email: 'alice.johnson@gem.com', password: 'password123' },
      candidate: { email: 'john.doe@example.com', password: 'password123' }
    }

    const credentials = roleCredentials[role as keyof typeof roleCredentials]
    if (credentials) {
      // Store credentials for auto-login
      localStorage.setItem('autoLoginData', JSON.stringify(credentials))
      // Redirect to login page
      router.push('/login')
    }
  }

  if (!showRoleSelector) return null

  return (
    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
      <h3 className="text-sm font-medium text-slate-800 mb-2">Select a role to login as:</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => selectRole('admin')}
          className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition"
        >
          Admin
        </button>
        <button
          onClick={() => selectRole('hr-manager')}
          className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition"
        >
          HR Manager
        </button>
        <button
          onClick={() => selectRole('recruiter')}
          className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition"
        >
          Recruiter
        </button>
        <button
          onClick={() => selectRole('candidate')}
          className="px-3 py-1 text-xs bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition"
        >
          Candidate
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-600">
        Or <Link href="/role-select" className="text-purple-600 hover:text-purple-500">view all roles</Link>
      </p>
    </div>
  )
}