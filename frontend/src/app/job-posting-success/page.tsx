'use client'

import React from 'react'
import Link from 'next/link'
import Header from '../../components/Header'

export default function JobPostingSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={null} onLogout={() => {}} />
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Job Posted Successfully!</h1>
          <p className="text-slate-600 mb-8">
            Your job posting has been successfully created and is now live. Candidates will be able to apply directly through the platform.
          </p>
          
          <div className="bg-white rounded-2xl shadow-md p-6 max-w-md mx-auto mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Next Steps</h2>
            <ul className="space-y-2 text-left text-slate-600">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>Review incoming applications</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>Shortlist candidates</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>Schedule interviews</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>Extend offers</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/jobs" 
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
            >
              View All Jobs
            </Link>
            <Link 
              href="/dashboard" 
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}