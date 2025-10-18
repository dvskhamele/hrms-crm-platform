'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { 
  executeAction, 
  getDashboardData,
  ActionType, 
  ActionPayload 
} from '../../utils/actionAutomation';
import { toast } from 'react-toastify';

export default function RecruitersManagement() {
  const [user, setUser] = useState<any>(null);
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState<number | null>(null);
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any);
    }

    // Load mock recruiters
    setRecruiters([
      { id: 1, name: 'Alex Johnson', email: 'alex@gem.com', phone: '+1 (555) 123-4567', taskCount: 5, performance: 85, availability: 'Available', lastActive: '2025-10-15' },
      { id: 2, name: 'Sam Wilson', email: 'sam@gem.com', phone: '+1 (555) 987-6543', taskCount: 3, performance: 92, availability: 'Busy', lastActive: '2025-10-15' },
      { id: 3, name: 'Taylor Reed', email: 'taylor@gem.com', phone: '+1 (555) 456-7890', taskCount: 7, performance: 78, availability: 'Available', lastActive: '2025-10-14' },
      { id: 4, name: 'Jordan Smith', email: 'jordan@gem.com', phone: '+1 (555) 234-5678', taskCount: 2, performance: 88, availability: 'On Leave', lastActive: '2025-10-10' }
    ]);

    // Load mock applications
    setApplications([
      { id: 1, candidateName: 'John Smith', position: 'Senior Software Engineer', status: 'SCREENING', appliedDate: '2025-10-15', priority: 'HIGH', recruiterId: 1 },
      { id: 2, candidateName: 'Sarah Johnson', position: 'Marketing Manager', status: 'REVIEWED', appliedDate: '2025-10-14', priority: 'MEDIUM', recruiterId: 2 },
      { id: 3, candidateName: 'Michael Chen', position: 'Sales Associate', status: 'SCHEDULED', appliedDate: '2025-10-12', priority: 'HIGH', recruiterId: 3 },
      { id: 4, candidateName: 'Emma Rodriguez', position: 'UX Designer', status: 'SCREENING', appliedDate: '2025-10-10', priority: 'LOW', recruiterId: 1 },
      { id: 5, candidateName: 'David Kim', position: 'Data Scientist', status: 'REJECTED', appliedDate: '2025-10-08', priority: 'MEDIUM', recruiterId: 2 },
      { id: 6, candidateName: 'Lisa Anderson', position: 'Product Manager', status: 'COMPLETED', appliedDate: '2025-10-07', priority: 'HIGH', recruiterId: 3 }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleAction = async (actionType: ActionType, payload: ActionPayload) => {
    setIsProcessing(true);
    try {
      const result = await executeAction(actionType, payload);
      
      if (result.success) {
        toast.success(result.message);
        // Refresh data after action
        // In a real app, we would fetch updated data
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Action failed');
      console.error('Action execution error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const assignCandidateToRecruiter = (candidateId: number, recruiterId: number) => {
    handleAction('ASSIGN_RECRUITER', {
      applicationId: candidateId,
      recruiterId: recruiterId
    });

    // Update local state
    setApplications(prev => 
      prev.map(app => 
        app.id === candidateId ? { ...app, recruiterId: recruiterId } : app
      )
    );

    setRecruiters(prev => 
      prev.map(recruiter => 
        recruiter.id === recruiterId 
          ? { ...recruiter, taskCount: recruiter.taskCount + 1 } 
          : recruiter
      )
    );
  };

  const reassignCandidate = (candidateId: number, newRecruiterId: number) => {
    // Find the current recruiter
    const currentApp = applications.find(app => app.id === candidateId);
    if (!currentApp) return;

    const oldRecruiterId = currentApp.recruiterId;

    // Update assignment
    assignCandidateToRecruiter(candidateId, newRecruiterId);

    // Decrement old recruiter's task count
    setRecruiters(prev => 
      prev.map(recruiter => 
        recruiter.id === oldRecruiterId 
          ? { ...recruiter, taskCount: Math.max(0, recruiter.taskCount - 1) } 
          : recruiter
      )
    );

    toast.info(`Candidate reassigned from Recruiter ${oldRecruiterId} to ${newRecruiterId}`);
  };

  const updateRecruiterPerformance = (recruiterId: number, newPerformance: number) => {
    setRecruiters(prev => 
      prev.map(recruiter => 
        recruiter.id === recruiterId 
          ? { ...recruiter, performance: newPerformance } 
          : recruiter
      )
    );
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800';
      case 'Busy':
        return 'bg-amber-100 text-amber-800';
      case 'On Leave':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-emerald-600';
    if (performance >= 75) return 'text-blue-600';
    if (performance >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getRecruiterApplications = (recruiterId: number) => {
    return applications.filter(app => app.recruiterId === recruiterId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Recruiter Management</h1>
          <p className="text-slate-600">Manage recruiters and their assignments with auto-updates</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-indigo-500">
            <p className="text-2xl font-bold text-indigo-600">{recruiters.length}</p>
            <p className="text-sm text-slate-600">Total Recruiters</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-600">{recruiters.filter(r => r.availability === 'Available').length}</p>
            <p className="text-sm text-slate-600">Available</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-600">{recruiters.filter(r => r.availability === 'Busy').length}</p>
            <p className="text-sm text-slate-600">Busy</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-600">{applications.length}</p>
            <p className="text-sm text-slate-600">Assigned Apps</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recruiters List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Recruiters</h2>
                <span className="bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full">
                  {recruiters.length} recruiters
                </span>
              </div>
              <div className="space-y-4">
                {recruiters.map(recruiter => {
                  const recruiterApps = getRecruiterApplications(recruiter.id);
                  return (
                    <div 
                      key={recruiter.id} 
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        selectedRecruiter === recruiter.id 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedRecruiter(recruiter.id === selectedRecruiter ? null : recruiter.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                            {recruiter.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium text-slate-800">{recruiter.name}</h3>
                            <p className="text-sm text-slate-600">{recruiter.email}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getAvailabilityColor(recruiter.availability)}`}>
                          {recruiter.availability}
                        </span>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-slate-500">Tasks</p>
                          <p className="text-sm font-medium text-slate-800">{recruiter.taskCount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Performance</p>
                          <p className={`text-sm font-medium ${getPerformanceColor(recruiter.performance)}`}>
                            {recruiter.performance}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${recruiter.taskCount * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-500 ml-2">{recruiter.taskCount}/10</span>
                      </div>
                      
                      <div className="mt-2 text-xs text-slate-500">
                        Last active: {new Date(recruiter.lastActive).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Applications & Actions */}
          <div className="lg:col-span-2">
            {selectedRecruiter ? (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Applications for {recruiters.find(r => r.id === selectedRecruiter)?.name}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      className="bg-indigo-500 text-white py-1 px-3 rounded-lg hover:bg-indigo-600 transition duration-300 text-sm"
                      onClick={() => setShowAssignModal(true)}
                      disabled={isProcessing}
                    >
                      Assign Candidate
                    </button>
                    <button
                      className="bg-purple-500 text-white py-1 px-3 rounded-lg hover:bg-purple-600 transition duration-300 text-sm"
                      onClick={() => {
                        // Update recruiter performance badge based on actions
                        const currentRecruiter = recruiters.find(r => r.id === selectedRecruiter);
                        if (currentRecruiter) {
                          const newPerformance = Math.min(100, currentRecruiter.performance + 2);
                          updateRecruiterPerformance(selectedRecruiter, newPerformance);
                          toast.info(`Performance updated to ${newPerformance}%`);
                        }
                      }}
                      disabled={isProcessing}
                    >
                      Update Badge
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {getRecruiterApplications(selectedRecruiter).map(app => (
                        <tr key={app.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold">{app.candidateName.charAt(0)}</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-slate-900">{app.candidateName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {app.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                              app.status === 'SCREENING' ? 'bg-amber-100 text-amber-800' :
                              app.status === 'REVIEWED' ? 'bg-blue-100 text-blue-800' :
                              app.status === 'SCHEDULED' ? 'bg-cyan-100 text-cyan-800' :
                              app.status === 'COMPLETED' ? 'bg-teal-100 text-teal-800' :
                              'bg-rose-100 text-rose-800'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                                  applicationId: app.id, 
                                  recruiterId: selectedRecruiter 
                                })}
                                disabled={isProcessing}
                                className="text-indigo-600 hover:text-indigo-900 text-sm disabled:opacity-50"
                              >
                                Screen
                              </button>
                              <button
                                onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                                  applicationId: app.id, 
                                  stage: 'REVIEWED' 
                                })}
                                disabled={isProcessing}
                                className="text-teal-600 hover:text-teal-900 text-sm disabled:opacity-50"
                              >
                                Review
                              </button>
                              <div className="relative group inline-block">
                                <button className="text-purple-600 hover:text-purple-900 text-sm disabled:opacity-50"
                                  disabled={isProcessing}>
                                  More
                                </button>
                                <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-10 border border-slate-200">
                                  <button 
                                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                                    onClick={() => handleAction('SCHEDULE_INTERVIEW', { 
                                      applicationId: app.id,
                                      interviewDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
                                    })}
                                    disabled={isProcessing}
                                  >
                                    Schedule
                                  </button>
                                  <button 
                                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                                    onClick={() => {
                                      // Reassign to another recruiter
                                      const otherRecruiters = recruiters.filter(r => r.id !== selectedRecruiter);
                                      if (otherRecruiters.length > 0) {
                                        reassignCandidate(app.id, otherRecruiters[0].id);
                                      }
                                    }}
                                    disabled={isProcessing}
                                  >
                                    Reassign
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {getRecruiterApplications(selectedRecruiter).length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-slate-500">
                            No applications assigned to this recruiter
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Performance Metrics */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-700 mb-2">Tasks Completed</h4>
                      <div className="text-2xl font-bold text-indigo-600">
                        {recruiterApps.filter(app => app.status === 'COMPLETED').length}
                      </div>
                      <div className="text-sm text-slate-500">
                        out of {getRecruiterApplications(selectedRecruiter).length} assigned
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-700 mb-2">Avg. Response Time</h4>
                      <div className="text-2xl font-bold text-emerald-600">2.4d</div>
                      <div className="text-sm text-slate-500">days per application</div>
                    </div>
                  </div>
                </div>

                {/* Auto-Update Badges */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Auto-Update Badges</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 text-sm"
                      onClick={() => {
                        // Based on actions: screened, schedule, placed
                        updateRecruiterPerformance(selectedRecruiter, 95);
                        toast.info('Performance badge updated to Excellent');
                      }}
                      disabled={isProcessing}
                    >
                      Excellent
                    </button>
                    <button
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition duration-300 text-sm"
                      onClick={() => {
                        updateRecruiterPerformance(selectedRecruiter, 80);
                        toast.info('Performance badge updated to Good');
                      }}
                      disabled={isProcessing}
                    >
                      Good
                    </button>
                    <button
                      className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-2 px-4 rounded-lg hover:from-rose-600 hover:to-rose-700 transition duration-300 text-sm"
                      onClick={() => {
                        updateRecruiterPerformance(selectedRecruiter, 65);
                        toast.info('Performance badge updated to Needs Improvement');
                      }}
                      disabled={isProcessing}
                    >
                      Needs Improvement
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-6 h-full flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-slate-800 mb-1">Select a Recruiter</h3>
                  <p className="text-slate-600">Choose a recruiter from the list to view their applications and performance metrics</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assign Candidate Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Assign Candidate to {recruiters.find(r => r.id === selectedRecruiter)?.name}</h3>
                  <button 
                    onClick={() => setShowAssignModal(false)}
                    className="text-slate-400 hover:text-slate-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Candidate</label>
                  <select
                    value=""
                    onChange={(e) => {
                      const candidateId = parseInt(e.target.value);
                      if (candidateId) {
                        assignCandidateToRecruiter(candidateId, selectedRecruiter!);
                        toast.success(`Candidate assigned to ${recruiters.find(r => r.id === selectedRecruiter)?.name}`);
                        setShowAssignModal(false);
                      }
                    }}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select a candidate...</option>
                    {applications
                      .filter(app => !app.recruiterId) // Only unassigned candidates
                      .map(app => (
                        <option key={app.id} value={app.id}>
                          {app.candidateName} - {app.position}
                        </option>
                      ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-2">
                    Only unassigned candidates are available for assignment
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}