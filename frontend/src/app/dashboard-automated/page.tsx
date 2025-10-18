'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
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

export default function AutomatedDashboard() {
  const [stats, setStats] = useState<any>({});
  const [applications, setApplications] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [notification, setNotification] = useState<{ message: string; show: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getDashboardData();
    setStats(data.stats);
    setApplications(data.applications);
    setCandidates(data.candidates);
    setRecruiters(data.recruiters);
  }

  const showNotification = (message: string) => {
    setNotification({ message, show: true });
  }

  const hideNotification = () => {
    setNotification(null);
  }

  const handleAction = async (actionType: ActionType, payload: ActionPayload) => {
    setIsProcessing(true);
    try {
      const result = await executeAction(actionType, payload);
      
      if (result.success) {
        // Refresh local data after action
        loadData();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return 'bg-emerald-100 text-emerald-800';
      case 'REVIEWED':
        return 'bg-amber-100 text-amber-800';
      case 'INTERVIEWING':
        return 'bg-blue-100 text-blue-800';
      case 'HIRED':
        return 'bg-indigo-100 text-indigo-800';
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800';
      case 'PENDING':
        return 'bg-amber-100 text-amber-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800';
      case 'SCREENED':
        return 'bg-teal-100 text-teal-800';
      case 'SHORTLISTED':
        return 'bg-purple-100 text-purple-800';
      case 'SCHEDULED':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-gray-100 text-gray-800';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800';
      case 'HIGH':
        return 'bg-rose-100 text-rose-800';
      case 'URGENT':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Get some sample data for display
  const pendingApps = applications.filter(app => app.status === 'SCREENING' || app.status === 'REVIEWED').slice(0, 5);
  const highPriority = applications.filter(app => app.priority === 'HIGH').slice(0, 3);
  const candidateScreened = candidates.filter(c => c.stage === 'SCREENED').length;
  const candidateReviewed = candidates.filter(c => c.stage === 'REVIEWED').length;
  const candidateShortlisted = candidates.filter(c => c.stage === 'SHORTLISTED').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {notification && notification.show && (
        <NotificationToast 
          message={notification.message} 
          onClose={hideNotification} 
        />
      )}

      <Header 
        user={{ name: 'Admin User', role: 'ADMIN' }} 
        onLogout={() => {
          localStorage.removeItem('token');
          router.push('/login');
        }} 
      />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Gem Automated Dashboard</h1>
              <p className="text-slate-600">One tap, multiple outcomes - Action-triggered automation</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg"
                onClick={() => handleAction('REFRESH_STATS', {})}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Refresh Stats'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards with Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-purple-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Applications</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.pendingApplications || 0}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <button 
                className="text-xs text-purple-600 font-medium hover:text-purple-800"
                onClick={() => handleAction('PROCESS_DAILY_APPLICATIONS', {})}
                disabled={isProcessing}
              >
                Process All
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-blue-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Screened Candidates</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{candidateScreened}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">{candidateReviewed} reviewed</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-emerald-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Shortlisted Candidates</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{candidateShortlisted}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4l4-4m0 0l4 4l4-4m-8 0l4-4l-4-4" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">Ready for next stage</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-indigo-500 card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Recruiters</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.recruitersActive || 0}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">{recruiters.filter(r => r.taskCount > 0).length} busy</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 card mb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Multi-Actions</h2>
              <div className="space-y-3">
                <button 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md"
                  onClick={() => handleAction('PROCESS_DAILY_APPLICATIONS', {})}
                  disabled={isProcessing}
                >
                  Process All Applications
                </button>
                <button 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
                  onClick={() => handleAction('REFRESH_STATS', {})}
                  disabled={isProcessing}
                >
                  Refresh All Stats
                </button>
                <button 
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-md"
                  onClick={() => handleAction('MARK_TASK_COMPLETE', { candidateId: 1, applicationId: 1, recruiterId: 1 })}
                  disabled={isProcessing}
                >
                  Mark Task Complete
                </button>
              </div>
            </div>

            {/* High Priority Applications */}
            <div className="bg-white rounded-2xl shadow-md p-6 card">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">High Priority</h3>
              <div className="space-y-3">
                {highPriority.map(app => (
                  <div key={app.id} className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">{app.candidateName}</p>
                      <p className="text-sm text-slate-600">{app.position}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(app.priority)}`}>
                      {app.priority}
                    </span>
                  </div>
                ))}
                {highPriority.length === 0 && (
                  <p className="text-slate-500 text-center py-4">No high priority applications</p>
                )}
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Applications</h2>
              <button 
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                onClick={() => router.push('/applications')}
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {pendingApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">{app.candidateName.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{app.candidateName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {app.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getPriorityColor(app.priority)}`}>
                          {app.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                              candidateId: app.id, 
                              applicationId: app.id, 
                              recruiterId: app.recruiterId || 1 
                            })}
                            disabled={isProcessing}
                          >
                            Screen
                          </button>
                          <button
                            className="text-teal-600 hover:text-teal-900"
                            onClick={() => handleAction('SCHEDULE_INTERVIEW', { 
                              applicationId: app.id,
                              interviewDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
                            })}
                            disabled={isProcessing}
                          >
                            Interview
                          </button>
                          <button
                            className="text-amber-600 hover:text-amber-900"
                            onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                              candidateId: app.id, 
                              applicationId: app.id, 
                              stage: 'SHORTLISTED' 
                            })}
                            disabled={isProcessing}
                          >
                            Move
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Candidate Pipeline */}
        <div className="bg-white rounded-2xl shadow-md p-6 card mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Candidate Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium text-slate-700 mb-2">Screening</h3>
              <div className="space-y-2">
                {candidates.filter(c => c.stage === 'SCREENING').map(c => (
                  <div key={c.id} className="p-2 bg-amber-100 rounded flex justify-between items-center">
                    <span className="text-sm">{c.name}</span>
                    <button 
                      className="text-xs bg-amber-600 text-white px-2 py-1 rounded hover:bg-amber-700"
                      onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                        candidateId: c.id, 
                        applicationId: applications.find(a => a.candidateName === c.name)?.id || c.id, 
                        recruiterId: 1 
                      })}
                      disabled={isProcessing}
                    >
                      Mark
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium text-slate-700 mb-2">Reviewed</h3>
              <div className="space-y-2">
                {candidates.filter(c => c.stage === 'REVIEWED').map(c => (
                  <div key={c.id} className="p-2 bg-blue-100 rounded flex justify-between items-center">
                    <span className="text-sm">{c.name}</span>
                    <button 
                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                        candidateId: c.id, 
                        applicationId: applications.find(a => a.candidateName === c.name)?.id || c.id, 
                        stage: 'SHORTLISTED' 
                      })}
                      disabled={isProcessing}
                    >
                      Move
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium text-slate-700 mb-2">Shortlisted</h3>
              <div className="space-y-2">
                {candidates.filter(c => c.stage === 'SHORTLISTED').map(c => (
                  <div key={c.id} className="p-2 bg-emerald-100 rounded flex justify-between items-center">
                    <span className="text-sm">{c.name}</span>
                    <button 
                      className="text-xs bg-emerald-600 text-white px-2 py-1 rounded hover:bg-emerald-700"
                      onClick={() => handleAction('SCHEDULE_INTERVIEW', { 
                        applicationId: applications.find(a => a.candidateName === c.name)?.id || c.id,
                        interviewDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
                      })}
                      disabled={isProcessing}
                    >
                      Interview
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium text-slate-700 mb-2">Interviewed</h3>
              <div className="space-y-2">
                {candidates.filter(c => c.stage === 'SCHEDULED').map(c => (
                  <div key={c.id} className="p-2 bg-cyan-100 rounded flex justify-between items-center">
                    <span className="text-sm">{c.name}</span>
                    <button 
                      className="text-xs bg-cyan-600 text-white px-2 py-1 rounded hover:bg-cyan-700"
                      onClick={() => handleAction('MARK_TASK_COMPLETE', { 
                        candidateId: c.id, 
                        applicationId: applications.find(a => a.candidateName === c.name)?.id || c.id,
                        recruiterId: 1
                      })}
                      disabled={isProcessing}
                    >
                      Complete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recruiter Workload */}
        <div className="bg-white rounded-2xl shadow-md p-6 card">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Recruiter Workload</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recruiters.map(recruiter => {
              const assignedApps = applications.filter(app => app.recruiterId === recruiter.id);
              return (
                <div key={recruiter.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-slate-800">{recruiter.name}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {recruiter.taskCount} tasks
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (recruiter.taskCount / 10) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-xs text-slate-500 mt-1">
                      {recruiter.performance}% performance
                    </div>
                  </div>
                  <div className="space-y-2">
                    {assignedApps.slice(0, 3).map(app => (
                      <div key={app.id} className="text-sm p-2 bg-slate-50 rounded">
                        <div className="font-medium">{app.candidateName}</div>
                        <div className="text-slate-600">{app.position}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                    {assignedApps.length > 3 && (
                      <div className="text-xs text-slate-500">+ {assignedApps.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  )
}