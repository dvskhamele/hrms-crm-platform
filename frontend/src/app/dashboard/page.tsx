'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    pendingApplications: 12,
    activeCandidates: 65,
    availablePositions: 35,
    revenueToday: 12500,
    hiringRate: 65,
    recruitersActive: 24,
    pendingInterviews: 8,
    avgResponseTime: 32,
    candidateSatisfaction: 94
  })
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    // Mock user data for demo
    const userData = {
      id: 1,
      email: 'admin@gem.com',
      name: 'Admin User',
      role: 'ADMIN'
    }
    
    setUser(userData)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  // Simple notification component
  const NotificationToast = ({ message, onClose }: { message: string; onClose: () => void }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }, [onClose])

    return (
      <div className="fixed top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
        {message}
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Loading Dashboard...</h1>
          <p className="mb-6 text-center text-slate-600">Please wait while we load your dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Simple Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-slate-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">Gem</span>
                <span className="sm:hidden">G</span>
              </Link>
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
                    onClick={handleLogout}
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
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600">Welcome back, {user.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-purple-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Applications</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.pendingApplications || 0}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-blue-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Candidates</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.activeCandidates || 0}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-emerald-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Available Positions</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.availablePositions || 0}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-amber-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Revenue Today</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">₹{(stats?.revenueToday || 0).toLocaleString()}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: 'Dashboard', href: '/dashboard/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { name: 'Candidates', href: '/candidate-profiles/', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { name: 'Bench', href: '/bench-list/', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z' },
            { name: 'Positions', href: '/positions/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { name: 'Applications', href: '/applications/', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
            { name: 'Recruiters', href: '/recruiters/', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { name: 'Recruiter Tracking', href: '/recruiter-tracking/', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zm-9.193-3.515a4 4 0 105.656 0M9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' },
            { name: 'AI Sourcing', href: '/ai-sourcing/', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' }
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="bg-white rounded-2xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{item.name}</h3>
            </Link>
          ))}
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