'use client'

import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function PositionsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect to login page if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Loading Positions...</h1>
          <p className="mb-6 text-center text-slate-600">Please wait while we load the positions page.</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // or a redirect component
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Simple Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/dashboard')}
                className="text-xl font-bold text-slate-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">Gem</span>
                <span className="sm:hidden">G</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <button className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-900">
                  <span className="mr-1 hidden md:inline">{user?.name || 'User'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                  <button
                    onClick={() => {
                      localStorage.removeItem('token')
                      router.push('/')
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Job Positions</h1>
          <p className="text-slate-600">Manage your company's job positions</p>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h2 className="text-2xl font-semibold mt-4 text-slate-800">Job Positions Management</h2>
            <p className="text-slate-600 mt-2">
              This page is under construction. Coming soon: Manage your company's job positions.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Gem. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  )
}