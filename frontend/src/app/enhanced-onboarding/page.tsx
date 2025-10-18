'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import EnhancedOnboardingControls from '../../components/EnhancedOnboardingControls'

export default function EnhancedOnboarding() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('controls')

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
          <h2 className="text-2xl font-bold text-slate-800">Enhanced Onboarding Management</h2>
          <p className="text-slate-600">Manage the new hire onboarding process and integration</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'controls'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('controls')}
            >
              Onboarding Steps
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'automation'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('automation')}
            >
              Automation Rules
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Onboarding Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'controls' && (
          <EnhancedOnboardingControls />
        )}

        {activeTab === 'automation' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Automation Rules</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Active Rules</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-emerald-100 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Welcome Email</p>
                        <p className="text-sm text-slate-600">Send welcome email when candidate status changes to HIRED</p>
                      </div>
                      <div className="ml-auto relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="welcomeEmail" id="welcomeEmail" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                        <label htmlFor="welcomeEmail" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-emerald-100 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Document Request</p>
                        <p className="text-sm text-slate-600">Automatically request required documents after hire confirmation</p>
                      </div>
                      <div className="ml-auto relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="docRequest" id="docRequest" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                        <label htmlFor="docRequest" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-emerald-100 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">IT Setup</p>
                        <p className="text-sm text-slate-600">Notify IT team to create accounts and setup equipment</p>
                      </div>
                      <div className="ml-auto relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="itSetup" id="itSetup" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                        <label htmlFor="itSetup" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Create New Rule</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Rule Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                        placeholder="Enter rule name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Trigger</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                        <option>Select trigger</option>
                        <option>Candidate status changes to HIRED</option>
                        <option>Documents submitted</option>
                        <option>Onboarding start date</option>
                        <option>First day of work</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Action</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                        <option>Select action</option>
                        <option>Send email notification</option>
                        <option>Create onboarding task</option>
                        <option>Update candidate status</option>
                        <option>Schedule meeting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Responsible Party</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
                        <option>Select team</option>
                        <option>HR Team</option>
                        <option>IT Team</option>
                        <option>Management</option>
                        <option>Direct Report</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300">
                      Create Rule
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Rule Templates</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">New Hire Onboarding</p>
                      <p className="text-xs text-slate-600 mt-1">Complete automation for welcoming and setting up new employees</p>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">Remote Setup Process</p>
                      <p className="text-xs text-slate-600 mt-1">Automated steps for remote employees including equipment and access</p>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">Intern Onboarding</p>
                      <p className="text-xs text-slate-600 mt-1">Simplified process for temporary positions with time-based tasks</p>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">Executive Onboarding</p>
                      <p className="text-xs text-slate-600 mt-1">Extended process for leadership with additional steps and approvals</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Integration Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">HR System</p>
                        <p className="text-xs text-slate-600">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">IT Provisioning</p>
                        <p className="text-xs text-slate-600">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Benefits Portal</p>
                        <p className="text-xs text-slate-600">Partially Connected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Onboarding Analytics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-4">Onboarding Completion Overview</h4>
                  <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="mt-2 text-slate-600">Onboarding completion chart would appear here</p>
                      <p className="text-sm text-slate-500">Visualization requires charting library integration</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-4">Process Efficiency</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Documentation Setup</span>
                        <span className="text-sm font-medium text-slate-700">87% Efficiency</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">IT Provisioning</span>
                        <span className="text-sm font-medium text-slate-700">76% Efficiency</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Team Integration</span>
                        <span className="text-sm font-medium text-slate-700">92% Efficiency</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Onboarding Performance</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Avg. Time to Productivity</p>
                        <p className="text-xs text-slate-600">This month vs last month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">-3 days</p>
                        <p className="text-xs text-slate-600">Improved from 18 to 15 days</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Satisfaction Score</p>
                        <p className="text-xs text-slate-600">New hire feedback</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">4.7/5</p>
                        <p className="text-xs text-slate-600">Based on 32 responses</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Recommendations</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Add more interactive elements to onboarding process</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Implement buddy system for new hires</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Create more comprehensive documentation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}