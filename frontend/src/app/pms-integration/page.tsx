'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function PMSIntegration() {
  const [user, setUser] = useState<any>(null)
  const [syncStatus, setSyncStatus] = useState('')
  const [syncProgress, setSyncProgress] = useState(0)
  const [lastSync, setLastSync] = useState('')
  const [rooms, setRooms] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchPMSData()
    }
  }, [])

  const fetchPMSData = async () => {
    try {
      setLoading(true)
      
      // Mock data for prototype
      const mockPositions = [
        { id: 1, number: 'POS-101', status: 'OPEN', pmsStatus: 'OPEN', synced: true },
        { id: 2, number: 'POS-102', status: 'IN_REVIEW', pmsStatus: 'IN_REVIEW', synced: true },
        { id: 3, number: 'POS-103', status: 'FILLED', pmsStatus: 'OPEN', synced: false },
        { id: 4, number: 'POS-104', status: 'ON_HOLD', pmsStatus: 'ON_HOLD', synced: true }
      ]
      
      const mockRequests = [
        { 
          id: 1, 
          candidateName: 'John Smith', 
          positionId: 'P-205', 
          title: 'Technical interview needed', 
          status: 'PENDING',
          pmsStatus: 'PENDING',
          synced: true
        },
        { 
          id: 2, 
          candidateName: 'Jane Doe', 
          positionId: 'P-108', 
          title: 'Background check required', 
          status: 'IN_PROGRESS',
          pmsStatus: 'IN_PROGRESS',
          synced: true
        },
        { 
          id: 3, 
          candidateName: 'Robert Davis', 
          positionId: 'P-210', 
          title: 'Reference check', 
          status: 'PENDING',
          pmsStatus: 'COMPLETED',
          synced: false
        }
      ]
      
      setRooms(mockPositions)
      setRequests(mockRequests)
      setLastSync(new Date().toLocaleString())
      
      setError('')
    } catch (err) {
      console.error('Error fetching ATS data:', err)
      setError('Failed to fetch ATS data')
    } finally {
      setLoading(false)
    }
  }

  const syncWithPMS = async () => {
    try {
      setSyncStatus('Syncing with ATS...')
      setSyncProgress(0)
      
      // Simulate sync progress
      const interval = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)
      
      // Wait for simulation to complete
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update mock data to show synced status
      setRooms(rooms.map(position => ({ ...position, synced: true })))
      setRequests(requests.map(application => ({ ...application, synced: true })))
      setLastSync(new Date().toLocaleString())
      
      setSyncStatus('Sync completed successfully')
      setTimeout(() => setSyncStatus(''), 3000)
    } catch (err) {
      console.error('Error syncing with ATS:', err)
      setSyncStatus('Sync failed')
      setError('Failed to sync with ATS')
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'CLEAN':
        return 'bg-emerald-100 text-emerald-800'
      case 'DIRTY':
        return 'bg-amber-100 text-amber-800'
      case 'INSPECTED':
        return 'bg-blue-100 text-blue-800'
      case 'OUT_OF_ORDER':
        return 'bg-rose-100 text-rose-800'
      case 'PENDING':
        return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800'
      case 'OPEN':
        return 'bg-emerald-100 text-emerald-800'
      case 'IN_REVIEW':
        return 'bg-blue-100 text-blue-800'
      case 'FILLED':
        return 'bg-indigo-100 text-indigo-800'
      case 'ON_HOLD':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSyncStatusClass = (synced: boolean) => {
    return synced 
      ? 'bg-emerald-100 text-emerald-800' 
      : 'bg-amber-100 text-amber-800'
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">ATS Integration</h2>
          <p className="text-slate-600">Manage integration with Applicant Tracking System</p>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {syncStatus && (
          <div className={`p-4 rounded-lg mb-6 ${syncStatus.includes('failed') ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
            <div className="flex items-center">
              <span className="flex-1">{syncStatus}</span>
              {syncStatus.includes('Syncing') && (
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-teal-600 h-2 rounded-full" 
                    style={{ width: `${syncProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sync Controls */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Integration Status</h3>
              <p className="text-sm text-slate-600">
                Last sync: {lastSync || 'Never'}
              </p>
            </div>
            <button 
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md flex items-center"
              onClick={syncWithPMS}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Sync with ATS
            </button>
          </div>
        </div>

        {/* Position Status Sync */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Position Status Synchronization</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Local Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ATS Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sync Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {rooms.map((position: any) => (
                  <tr key={position.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      Position {position.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(position.status)}`}>
                        {position.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(position.pmsStatus)}`}>
                        {position.pmsStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSyncStatusClass(position.synced)}`}>
                        {position.synced ? 'Synced' : 'Not Synced'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Sync */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Application Synchronization</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Application</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Local Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ATS Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sync Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {requests.map((application: any) => (
                  <tr key={application.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {application.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {application.candidateName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {application.positionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(application.pmsStatus)}`}>
                        {application.pmsStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSyncStatusClass(application.synced)}`}>
                        {application.synced ? 'Synced' : 'Not Synced'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}