'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RoleSelectPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState(null)

  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Full access to all features',
      icon: '🔐',
      color: 'from-purple-500 to-purple-600',
      email: 'admin@gem.com',
      password: 'password123'
    },
    {
      id: 'hr-manager',
      title: 'HR Manager',
      description: 'HR functions and recruitment management',
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      email: 'david.wilson@gem.com',
      password: 'password123'
    },
    {
      id: 'recruiter',
      title: 'Recruiter',
      description: 'Candidate management and applications',
      icon: '🕵️',
      color: 'from-green-500 to-green-600',
      email: 'alice.johnson@gem.com',
      password: 'password123'
    },
    {
      id: 'candidate',
      title: 'Candidate',
      description: 'Application and profile access',
      icon: '👤',
      color: 'from-amber-500 to-amber-600',
      email: 'john.doe@example.com',
      password: 'password123'
    }
  ]

  const handleRoleSelect = (role: any) => {
    setSelectedRole(role.id)
    
    // Store the selected role credentials in localStorage
    localStorage.setItem('autoLoginData', JSON.stringify({
      email: role.email,
      password: role.password,
      role: role.id
    }))
    
    // Redirect to login page
    router.push('/login/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center text-3xl font-bold text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Gem</span>
          </Link>
          <p className="mt-2 text-slate-600">AI-first recruiting platform</p>
          <h1 className="text-3xl font-bold text-slate-800 mt-6">Select Your Role</h1>
          <p className="text-slate-600 mt-2">Choose your role to access the appropriate dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div 
              key={role.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleRoleSelect(role)}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center text-2xl mb-4`}>
                {role.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{role.title}</h3>
              <p className="text-slate-600 mb-4">{role.description}</p>
              <div className="text-sm text-slate-500">
                <p><span className="font-medium">Email:</span> {role.email}</p>
                <p><span className="font-medium">Password:</span> {role.password}</p>
              </div>
              <button 
                className={`w-full mt-4 py-3 px-4 rounded-lg text-white bg-gradient-to-r ${role.color} hover:opacity-90 transition-opacity duration-300`}
              >
                Login as {role.title}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Gem. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}