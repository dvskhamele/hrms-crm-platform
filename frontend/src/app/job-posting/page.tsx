'use client'

import React from 'react'
import Link from 'next/link'

export default function JobPostingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Simple Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-slate-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Gem</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Create New Job Posting</h1>
          <p className="text-slate-600 mt-2">Coming Soon</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Feature Under Development</h2>
          <p className="text-slate-600 mb-6">
            The job posting feature is currently under development. Please check back later.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition duration-300 shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Gem. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}