'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function UserRoleDisplay() {
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    // Check for user role in localStorage
    const userData = localStorage.getItem('userData')
    if (userData) {
      try {
        const parsedData = JSON.parse(userData)
        setUserRole(parsedData.role || null)
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
  }, [])

  // Return null if no role is detected
  if (!userRole) return null

  const roleLabels = {
    'admin': 'Administrator',
    'hr-manager': 'HR Manager',
    'recruiter': 'Recruiter',
    'candidate': 'Candidate'
  }

  const roleColors = {
    'admin': 'bg-purple-100 text-purple-800',
    'hr-manager': 'bg-blue-100 text-blue-800',
    'recruiter': 'bg-green-100 text-green-800',
    'candidate': 'bg-amber-100 text-amber-800'
  }

  return (
    <div className="flex items-center space-x-2">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[userRole] || 'bg-slate-100 text-slate-800'}`}>
        {roleLabels[userRole] || 'User'}
      </span>
      <Link href="/role-select" className="text-xs text-purple-600 hover:text-purple-800 underline">
        Change Role
      </Link>
    </div>
  )
}