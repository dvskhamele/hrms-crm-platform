'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { useSidebar } from '../../context/SidebarContext'
import CandidateScreeningAnalytics from '../../components/CandidateScreeningAnalytics'
import RecruiterLeaderboard from '../../components/RecruiterLeaderboard'
import MobileNavigation from '../../components/MobileNavigation'
import OfflineIndicator from '../../components/OfflineIndicator'
import AIOverview from '../../components/AIOverview'
import AgenticAI from '../../components/AgenticAI'
import AIPoweredSourcing from '../../components/AIPoweredSourcing'
import apiService from '../../utils/apiService'
import MobileDashboard from './page-mobile'
import { 
  executeAction, 
  getDashboardData,
  ActionType, 
  ActionPayload 
} from '../../utils/actionAutomation';
import { toast } from 'react-toastify';

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

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
  const [activity, setActivity] = useState<any[]>([])
  const [positions, setPositions] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [performance] = useState({
    candidateScreening: 92,
    interviewScheduling: 87,
    onboarding: 95
  })
  const [timeRange, setTimeRange] = useState('7d') // For charts
  const [isMobile, setIsMobile] = useState(false)
  const [expandedKPI, setExpandedKPI] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Notification state
  const [notification, setNotification] = useState<{ message: string; show: boolean } | null>(null)

  const router = useRouter()

  useEffect(() => {
    // Check if user is on mobile device
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    // Check if onboarding is complete
    console.log('Checking onboardingComplete...')
    const onboardingComplete = localStorage.getItem('onboardingComplete')
    console.log('onboardingComplete value:', onboardingComplete)
    if (!onboardingComplete) {
      console.log('onboardingComplete not found, redirecting to /onboarding')
      router.push('/onboarding')
      return
    }
    
    // For prototype, always allow access and mock login
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      setIsLoggedIn(true)
      fetchDashboardData()
    } else {
      // Redirect to login if no token
      router.push('/login')
    }
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [router])

  const showNotification = (message: string) => {
    setNotification({ message, show: true })
  }

  const hideNotification = () => {
    setNotification(null)
  }
  
  const handleAction = async (actionType: ActionType, payload: ActionPayload) => {
    setIsProcessing(true);
    try {
      const result = await executeAction(actionType, payload);
      
      if (result.success) {
        // Refresh local data after action
        const data = getDashboardData();
        setStats(data.stats);
        setApplications(data.applications);
        setCandidates(data.candidates);
        setRecruiters(data.recruiters);
        setActivity(data.applications.slice(0, 5)); // Use first 5 as recent activity
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Action failed');
      console.error('Action execution error:', error);
    } finally {
      setIsProcessing(false);
    }
  }
  
  const toggleKPIExpansion = (kpiName: string) => {
    setExpandedKPI(expandedKPI === kpiName ? null : kpiName);
  }
  
  const getRecruiters = () => {
    // Return mock recruiters data for now
    return [
      { id: 1, name: 'Alex Johnson', taskCount: 3, performance: 85 },
      { id: 2, name: 'Sam Wilson', taskCount: 5, performance: 72 },
      { id: 3, name: 'Taylor Reed', taskCount: 4, performance: 91 }
    ];
  };
  
  const getCandidates = () => {
    // Return mock candidates data for now
    return [
      { id: 1, name: 'John Smith', stage: 'SCREENING', score: 85 },
      { id: 2, name: 'Sarah Johnson', stage: 'REVIEWED', score: 78 },
      { id: 3, name: 'Michael Chen', stage: 'SCREENING', score: 92 },
      { id: 4, name: 'Emma Rodriguez', stage: 'SHORTLISTED', score: 88 },
      { id: 5, name: 'David Kim', stage: 'REJECTED', score: 65 }
    ];
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats
      const statsData = await apiService.getDashboardStats()
      if (statsData && statsData.stats) {
        setStats(prevStats => ({ ...prevStats, ...statsData.stats }))
      }
      
      // Fetch recent activity
      const activityData = await apiService.getDashboardActivity()
      setActivity(activityData?.activity || [])
      
      // Fetch positions for preview
      const positionsData = await apiService.getDashboardPositions()
      setPositions(positionsData?.positions || [])
      
      // Fetch applications for preview
      const applicationsData = await apiService.getDashboardApplications()
      setApplications(applicationsData?.applications || [])
      
      // Fetch performance data
      const performanceData = await apiService.getDashboardPerformance()
      // Note: performance is a constant state object and cannot be updated
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Fallback to mock data if API fails
      setStats({
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
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return 'bg-emerald-100 text-emerald-800'
      case 'REVIEWED':
        return 'bg-amber-100 text-amber-800'
      case 'INTERVIEWING':
        return 'bg-blue-100 text-blue-800'
      case 'HIRED':
        return 'bg-indigo-100 text-indigo-800'
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800'
      case 'PENDING':
        return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityColor = (type: string, status: string) => {
    if (type === 'application') {
      if (status === 'HIRED') return 'border-l-4 border-emerald-500'
      return 'border-l-4 border-blue-500'
    } else if (type === 'position') {
      return 'border-l-4 border-amber-500'
    } else {
      return 'border-l-4 border-indigo-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-gray-100 text-gray-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      case 'URGENT':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-gray-100 text-gray-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      case 'URGENT':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDepartmentClass = (department: string) => {
    switch (department) {
      case 'TECHNOLOGY':
        return 'bg-purple-100 text-purple-800'
      case 'MARKETING':
        return 'bg-amber-100 text-amber-800'
      case 'SALES':
        return 'bg-emerald-100 text-emerald-800'
      case 'HUMAN_RESOURCES':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Function to generate chart data for candidate conversion
  const generateConversionData = () => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        conversionRate: Math.floor(Math.random() * 15) + 65 // Random between 65-80%
      })
    }
    return data
  }

  // Function to generate chart data for revenue
  const generateRevenueData = () => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: Math.floor(Math.random() * 5000) + 8000 // Random between 8000-13000
      })
    }
    return data
  }

  const conversionData = generateConversionData()
  const revenueData = generateRevenueData()

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Gem Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            // Mock login for prototype - in a real app, this would call the API
            localStorage.setItem('token', 'mock-jwt-token')
            setUser({ name: 'Admin User', role: 'ADMIN' } as any)
            setIsLoggedIn(true)
            fetchDashboardData()
            // Redirect to dashboard after login
            router.push('/dashboard')
          }}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition input text-slate-800 bg-white"
                placeholder="Enter your email"
                defaultValue="admin@gem.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-slate-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition input text-slate-800 bg-white"
                placeholder="Enter your password"
                defaultValue="password123"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Only render mobile dashboard for very small screens (not laptops)
  if (isMobile) {
    return <MobileDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {notification && notification.show && (
        <NotificationToast 
          message={notification.message} 
          onClose={hideNotification} 
        />
      )}
      <OfflineIndicator />
      <Header user={user} onLogout={handleLogout} />
      <Sidebar />

      <main className="flex-1 lg:ml-64 px-4 py-6 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Good morning, {user?.name}</h1>
              <p className="text-slate-600">Here's what's happening with your recruitment today.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500">Last updated:</span>
                <span className="text-sm font-medium text-slate-700">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <button 
                  className="p-1 rounded-full hover:bg-slate-200 transition focus-ring"
                  onClick={fetchDashboardData}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v7a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Pending Applications Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-purple-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => toggleKPIExpansion('pendingApplications')}>
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
            <div className="mt-4">
              <span className="text-xs text-slate-500">+2 from yesterday</span>
            </div>
          </div>

          {/* Expanded Pending Applications Actions */}
          {expandedKPI === 'pendingApplications' && (
            <div className="col-span-full bg-purple-50 rounded-2xl shadow-md p-6 border border-purple-200 mt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-purple-800">Pending Applications Actions</h3>
                <button 
                  onClick={() => setExpandedKPI(null)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md"
                  onClick={() => handleAction('PROCESS_DAILY_APPLICATIONS', {})}
                  disabled={isProcessing}
                >
                  Process All Pending
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                  onClick={() => {
                    // Check deadlines and highlight urgent candidates
                    const urgentApps = applications.filter(app => 
                      app.status === 'SCREENING' && 
                      new Date(app.date || new Date()) < new Date(Date.now() - 3*24*60*60*1000)
                    );
                    if (urgentApps.length > 0) {
                      toast.info(`Found ${urgentApps.length} urgent applications`);
                      // In real implementation, this would highlight urgent apps
                    } else {
                      toast.info('No urgent applications found');
                    }
                  }}
                  disabled={isProcessing}
                >
                  Check Deadlines
                </button>
                <button
                  className="bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition duration-300 shadow-md"
                  onClick={() => {
                    // Auto-check if backlog > threshold
                    if (stats?.pendingApplications > 10) {
                      toast.warn(`High backlog: ${stats.pendingApplications} pending`);
                      // In real implementation, this would notify managers
                    } else {
                      toast.info('Backlog is manageable');
                    }
                  }}
                  disabled={isProcessing}
                >
                  Check Backlog
                </button>
              </div>
            </div>
          )}

          {/* Hiring Rate Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-blue-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => toggleKPIExpansion('hiringRate')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Hiring Rate</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.hiringRate || 0}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 3% from last week</span>
            </div>
          </div>

          {/* Expanded Hiring Rate Actions */}
          {expandedKPI === 'hiringRate' && (
            <div className="col-span-full bg-blue-50 rounded-2xl shadow-md p-6 border border-blue-200 mt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-800">Hiring Rate Actions</h3>
                <button 
                  onClick={() => setExpandedKPI(null)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                  onClick={() => {
                    // Move all reviewed candidates to next stage
                    candidates.filter(c => c.stage === 'REVIEWED').forEach(c => {
                      handleAction('MOVE_CANDIDATE_STAGE', { 
                        candidateId: c.id, 
                        applicationId: applications.find(a => a.candidateName === c.name)?.id || c.id, 
                        stage: 'SHORTLISTED' 
                      });
                    });
                  }}
                  disabled={isProcessing}
                >
                  Move All Reviewed
                </button>
                <button
                  className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md"
                  onClick={() => handleAction('REFRESH_STATS', {})}
                  disabled={isProcessing}
                >
                  Refresh Metrics
                </button>
              </div>
            </div>
          )}

          {/* Revenue Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-emerald-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => router.push('/analytics')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Revenue Today</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">₹{(stats?.revenueToday || 0).toLocaleString()}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 12% from yesterday</span>
            </div>
          </div>

          {/* Active Recruiters Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-indigo-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => toggleKPIExpansion('activeRecruiters')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Recruiters</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.recruitersActive || 0}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">4 on break</span>
            </div>
          </div>

          {/* Expanded Active Recruiters Actions */}
          {expandedKPI === 'activeRecruiters' && (
            <div className="col-span-full bg-indigo-50 rounded-2xl shadow-md p-6 border border-indigo-200 mt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-indigo-800">Recruiter Actions</h3>
                <button 
                  onClick={() => setExpandedKPI(null)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
                  onClick={() => {
                    // Auto-assign pending applications to available recruiters
                    const unassignedApps = applications.filter(app => !app.recruiterId);
                    const availableRecruiters = getRecruiters().filter(r => r.taskCount < 5); // Assuming max 5 tasks per recruiter
                    
                    if (unassignedApps.length > 0 && availableRecruiters.length > 0) {
                      unassignedApps.slice(0, availableRecruiters.length).forEach((app, index) => {
                        handleAction('ASSIGN_RECRUITER', {
                          applicationId: app.id,
                          recruiterId: availableRecruiters[index].id
                        });
                      });
                      toast.success(`Assigned ${Math.min(unassignedApps.length, availableRecruiters.length)} applications`);
                    } else {
                      toast.info('No unassigned applications or no available recruiters');
                    }
                  }}
                  disabled={isProcessing}
                >
                  Auto Assign
                </button>
                <button
                  className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300 shadow-md"
                  onClick={() => {
                    // Update workload distribution
                    const recruiters = getRecruiters();
                    const totalApps = applications.length;
                    const avgPerRecruiter = Math.ceil(totalApps / recruiters.length);
                    
                    toast.info(`Average: ${avgPerRecruiter} apps per recruiter`);
                    // In real app, this would redistribute workload
                  }}
                  disabled={isProcessing}
                >
                  Balance Workload
                </button>
                <button
                  className="bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition duration-300 shadow-md"
                  onClick={() => {
                    // Check breaks and availability
                    toast.info('Checked recruiter availability');
                    // In real app, this would update availability status
                  }}
                  disabled={isProcessing}
                >
                  Check Availability
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hiring Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Candidate Conversion Trend</h2>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '7d' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('7d')}
                >
                  7D
                </button>
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '30d' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('30d')}
                >
                  30D
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end space-x-2 mt-8 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => router.push('/analytics')}>
              {conversionData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div className="text-xs text-slate-500 mb-1 group-hover:text-purple-600 transition-colors">
                    {data.conversionRate}%
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-purple-400 to-purple-600 rounded-t transition-all duration-300 group-hover:from-purple-500 group-hover:to-purple-700"
                    style={{ height: `${(data.conversionRate / 100) * 200}px` }}
                  ></div>
                  <div className="text-xs text-slate-600 mt-1 group-hover:text-slate-800 transition-colors">
                    {data.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Revenue Trend</h2>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '7d' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('7d')}
                >
                  7D
                </button>
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '30d' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('30d')}
                >
                  30D
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end space-x-2 mt-8 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => router.push('/analytics')}>
              {revenueData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div className="text-xs text-slate-500 mb-1 group-hover:text-emerald-600 transition-colors">
                    ₹{(data.revenue / 1000).toFixed(1)}k
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-t transition-all duration-300 group-hover:from-emerald-500 group-hover:to-emerald-700"
                    style={{ height: `${(data.revenue / 15000) * 200}px` }}
                  ></div>
                  <div className="text-xs text-slate-600 mt-1 group-hover:text-slate-800 transition-colors">
                    {data.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Daily Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="bg-gradient-to-br from-purple-500 to-purple-600 text-white py-4 px-4 rounded-xl text-center hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => handleAction('PROCESS_DAILY_APPLICATIONS', {})}
                title="Process all daily applications, update metrics, and adjust recruiter workloads"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-sm font-medium">Process All</span>
              </div>
              <div 
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-4 px-4 rounded-xl text-center hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => handleAction('MARK_TASK_COMPLETE', { candidateId: 1, applicationId: 1, recruiterId: 1 })}
                title="Mark tasks as complete, update recruiter badges, and refresh pipeline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Complete Tasks</span>
              </div>
              <div 
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-4 px-4 rounded-xl text-center hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Mark multiple candidates as screened with multi-outcome updates
                  candidates.filter(c => c.stage === 'SCREENING').slice(0, 3).forEach(c => {
                    const app = applications.find(a => a.candidateName === c.name);
                    if (app) {
                      handleAction('MARK_CANDIDATE_SCREENED', { 
                        candidateId: c.id, 
                        applicationId: app.id, 
                        recruiterId: app.recruiterId || 1 
                      });
                    }
                  });
                }}
                title="Mark multiple candidates as screened, update recruiter workload, and pipeline progress"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium">Screen All</span>
              </div>
              <div 
                className="bg-gradient-to-br from-amber-500 to-amber-600 text-white py-4 px-4 rounded-xl text-center hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Move all reviewed candidates to interview stage
                  candidates.filter(c => c.stage === 'REVIEWED').forEach(c => {
                    const app = applications.find(a => a.candidateName === c.name);
                    if (app) {
                      handleAction('MOVE_CANDIDATE_STAGE', { 
                        candidateId: c.id, 
                        applicationId: app.id, 
                        stage: 'SCHEDULED' 
                      });
                    }
                  });
                }}
                title="Move candidates to next stage, update pipeline, and adjust metrics"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4l4-4m0 0l4 4l4-4m-8 0l4-4l-4-4" />
                </svg>
                <span className="text-sm font-medium">Move Stage</span>
              </div>
              
              {/* Additional Quick Actions */}
              <div 
                className="bg-gradient-to-br from-rose-500 to-rose-600 text-white py-4 px-4 rounded-xl text-center hover:from-rose-600 hover:to-rose-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => handleAction('SCHEDULE_INTERVIEW', { 
                  applicationId: applications[0]?.id || 1,
                  interviewDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
                })}
                title="Schedule interview, update calendar, notify recruiter & candidate"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Schedule</span>
              </div>
              <div 
                className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white py-4 px-4 rounded-xl text-center hover:from-indigo-600 hover:to-indigo-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => handleAction('REFRESH_STATS', {})}
                title="Refresh all metrics, analytics, and dashboard KPIs"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm font-medium">Refresh All</span>
              </div>
              <div 
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-4 px-4 rounded-xl text-center hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Auto-assign candidates to recruiters
                  const unassignedApps = applications.filter(app => !app.recruiterId);
                  const recruiters = getRecruiters();
                  
                  if (unassignedApps.length > 0 && recruiters.length > 0) {
                    unassignedApps.slice(0, recruiters.length).forEach((app, index) => {
                      handleAction('ASSIGN_RECRUITER', {
                        applicationId: app.id,
                        recruiterId: recruiters[index].id
                      });
                    });
                    toast.success(`Auto-assigned ${Math.min(unassignedApps.length, recruiters.length)} candidates`);
                  }
                }}
                title="Auto-assign candidates to recruiters, update workload, and badges"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">Auto Assign</span>
              </div>
              <div 
                className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white py-4 px-4 rounded-xl text-center hover:from-cyan-600 hover:to-cyan-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Update pipeline progress bars
                  toast.info('Pipeline progress updated');
                  // In real implementation, this would update all pipeline progress indicators
                }}
                title="Update pipeline progress bars and visual indicators"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-medium">Update Pipeline</span>
              </div>
            </div>

            {/* Daily Progress Visualization */}
            <h3 className="text-lg font-medium text-slate-800 mt-6 mb-4">Daily Progress</h3>
            <div className="space-y-4">
              {/* Screening Progress */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Screening</span>
                  <span className="text-sm font-medium text-slate-700">65%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 hover:bg-emerald-600"
                    style={{ width: '65%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>13/20 candidates</span>
                  <span>Screened</span>
                </div>
              </div>
              
              {/* Interview Progress */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Interviews</span>
                  <span className="text-sm font-medium text-slate-700">40%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-500 hover:bg-amber-600"
                    style={{ width: '40%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>4/10 tasks</span>
                  <span>Completed</span>
                </div>
              </div>
              
              {/* Applications Progress */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Applications</span>
                  <span className="text-sm font-medium text-slate-700">75%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 hover:bg-blue-600"
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>15/20 applications</span>
                  <span>Processed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Recent Activity</h2>
              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium cursor-pointer" onClick={() => router.push('/reports')}>
                View All
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {activity && Array.isArray(activity) ? activity.map((item: any) => (
                <div 
                  key={item.id} 
                  className={`${getActivityColor(item.type, item.status)} pl-4 py-3 bg-slate-50 rounded-lg transition-all duration-300 hover:shadow-md animate-fade-in cursor-pointer`}
                  onClick={() => {
                    // Navigate to appropriate page based on activity type
                    switch(item.type) {
                      case 'application':
                        router.push('/applications');
                        break;
                      case 'position':
                        router.push('/positions');
                        break;
                      case 'recruiter':
                        router.push('/recruiters');
                        break;
                      default:
                        router.push('/reports');
                    }
                  }}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-slate-800">{item.title}</h3>
                    <span className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                </div>
              )) : (
                <div className="text-center py-4 text-slate-500">
                  No recent activity
                </div>
              )}
            </div>

            {/* Recent Applications with Action Buttons */}
            <h3 
              className="text-lg font-medium text-slate-800 mt-6 mb-4 cursor-pointer hover:text-purple-600 transition-colors" 
              onClick={() => router.push('/applications')}
            >
              Recent Applications
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {applications && Array.isArray(applications) ? applications.slice(0, 5).map((application: any) => (
                    <tr 
                      key={application.id} 
                      className="hover:bg-slate-50 transition-all duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">{application.candidateName.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{application.candidateName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {application.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getDepartmentClass(application.department)}`}>
                          {application.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusClass(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                              candidateId: candidates.find(c => c.name === application.candidateName)?.id,
                              applicationId: application.id, 
                              recruiterId: application.recruiterId || 1 
                            })}
                            disabled={isProcessing}
                            title="Mark as screened - updates status, recruiter workload, pipeline"
                          >
                            Screen
                          </button>
                          <button
                            className="text-teal-600 hover:text-teal-900"
                            onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                              candidateId: candidates.find(c => c.name === application.candidateName)?.id,
                              applicationId: application.id, 
                              stage: 'REVIEWED' 
                            })}
                            disabled={isProcessing}
                            title="Move to next stage - updates pipeline, metrics, and visual indicators"
                          >
                            Move
                          </button>
                          <button
                            className="text-purple-600 hover:text-purple-900"
                            onClick={() => handleAction('SCHEDULE_INTERVIEW', { 
                              applicationId: application.id,
                              interviewDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
                            })}
                            disabled={isProcessing}
                            title="Schedule interview - updates calendar, notifies recruiter & candidate"
                          >
                            Interview
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-slate-500">
                        No recent applications
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Candidate Screening Analytics */}
        <div className="mb-8">
          <CandidateScreeningAnalytics />
        </div>

        {/* Recruiter Leaderboard */}
        <div className="mb-8">
          <RecruiterLeaderboard />
        </div>

        {/* AI Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <AIOverview />
          </div>
          <div>
            <AgenticAI />
          </div>
        </div>

        {/* Additional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-rose-500 card cursor-pointer hover:shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={() => router.push('/requests')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Interviews</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.pendingInterviews || 0}</p>
              </div>
              <div className="bg-rose-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-rose-500">3 urgent</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500 card cursor-pointer hover:shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={() => router.push('/analytics')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Avg. Response Time</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.avgResponseTime || 0} min</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↓ 5 min from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-emerald-500 card cursor-pointer hover:shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={() => router.push('/reports')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Candidate Satisfaction</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.candidateSatisfaction || 0}%</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10h-2M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 2% from last week</span>
            </div>
          </div>
        </div>

        {/* AI-Powered Sourcing */}
        <div className="mb-8">
          <AIPoweredSourcing />
        </div>
      </main>
    </div>
  )
}