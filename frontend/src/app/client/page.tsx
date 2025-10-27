'use client'

import React from 'react'
import Link from 'next/link'

export default function ClientRolePage() {
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
          <h1 className="text-3xl font-bold text-slate-800">Client Role</h1>
          <p className="text-slate-600 mt-2">Client portal access for job postings and candidate tracking</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-2xl mb-4 mx-auto">
              🏢
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Client Portal</h2>
            <p className="text-slate-600 mb-6">
              Access your job postings, track candidate applications, and manage your recruitment workflow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-50 rounded-xl p-6 text-left">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Job Postings</h3>
                <p className="text-slate-600 mb-4">
                  Create, manage, and track your job postings across multiple platforms.
                </p>
                <Link 
                  href="/job-posting" 
                  className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
                >
                  Create New Job
                </Link>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 text-left">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Candidate Tracking</h3>
                <p className="text-slate-600 mb-4">
                  Monitor applicant progress and communicate with candidates throughout the hiring process.
                </p>
                <button 
                  className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
                >
                  View Candidates
                </button>
              </div>
            </div>
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