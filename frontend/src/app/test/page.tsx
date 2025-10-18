'use client'

import React from 'react'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Test Page</h1>
        <p className="text-lg text-slate-600">If you can see this, JSX parsing is working correctly</p>
      </div>
    </div>
  )
}