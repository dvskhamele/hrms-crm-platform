import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Candidates', href: '/candidate-profiles' },
    { name: 'Bench', href: '/bench' },
    { name: 'Positions', href: '/positions' },
    { name: 'Applications', href: '/applications' },
    { name: 'Recruiters', href: '/recruiters' },
    { name: 'Recruiter Tracking', href: '/recruiter-tracking' },
    { name: 'AI Sourcing', href: '/ai-sourcing' },
    { name: 'Voice Commands', href: '/voice-commands' },
    { name: 'Screening', href: '/screening' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Tools', href: '/tools' },
    { name: 'Departments', href: '/departments' }
  ]

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-slate-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Gem</span>
              <span className="sm:hidden">G</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${router.pathname === item.href ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-600 hover:text-teal-600'} px-1 py-2 text-sm font-medium transition duration-300 flex items-center`}
              >
                <span className="truncate max-w-[100px]">{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-900">
                <span className="mr-1 hidden md:inline">User</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                <button
                  onClick={() => {
                    // Clear all user data
                    localStorage.removeItem('token')
                    localStorage.removeItem('onboardingComplete')
                    
                    // Redirect to login page
                    router.push('/login')
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
  )
}