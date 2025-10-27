'use client'

import React from 'react'
import Link from 'next/link'

const MinimalStandaloneHeader = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center flex-shrink-0">
            <Link href="/dashboard" className="text-xl font-bold text-slate-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="hidden sm:inline">Gem</span>
              <span className="sm:hidden">G</span>
            </Link>
          </div>
          
          <nav className="flex space-x-6 flex-grow justify-center mx-4">
            <Link href="/dashboard" className="text-slate-600 hover:text-teal-600 px-3 py-2 text-sm font-medium transition duration-300 flex items-center">
              Dashboard
            </Link>
            <Link href="/candidate-profiles" className="text-slate-600 hover:text-teal-600 px-3 py-2 text-sm font-medium transition duration-300 flex items-center">
              Candidates
            </Link>
            <Link href="/positions" className="text-slate-600 hover:text-teal-600 px-3 py-2 text-sm font-medium transition duration-300 flex items-center">
              Positions
            </Link>
            <Link href="/applications" className="text-slate-600 hover:text-teal-600 px-3 py-2 text-sm font-medium transition duration-300 flex items-center">
              Applications
            </Link>
            <Link href="/recruiters" className="text-slate-600 hover:text-teal-600 px-3 py-2 text-sm font-medium transition duration-300 flex items-center">
              Recruiters
            </Link>
            <Link href="/analytics" className="text-slate-600 hover:text-teal-600 px-3 py-2 text-sm font-medium transition duration-300 flex items-center">
              Analytics
            </Link>
            <Link href="/settings" className="text-slate-600 hover:text-teal-600 px-3 py-2 text-sm font-medium transition duration-300 flex items-center">
              Settings
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="hidden sm:block">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell h-6 w-6">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-900">
                <span className="mr-1 hidden md:inline">Admin User</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default MinimalStandaloneHeader