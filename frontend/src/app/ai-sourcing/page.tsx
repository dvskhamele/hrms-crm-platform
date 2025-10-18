'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import AIPoweredSourcing from '../../components/AIPoweredSourcing'

export default function AISourcing() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">AI Sourcing</h2>
          <p className="text-slate-600">Leverage AI to find and engage top talent</p>
        </div>

        <AIPoweredSourcing />
      </main>
    </div>
  )
}