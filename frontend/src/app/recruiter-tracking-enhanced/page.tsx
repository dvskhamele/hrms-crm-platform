'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { 
  executeAction, 
  getRecruiters,
  getApplications,
  getCandidates,
  ActionType, 
  ActionPayload 
} from '../../utils/actionAutomation';
import { toast } from 'react-toastify';

export default function EnhancedRecruiterTracking() {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRecruiters(getRecruiters());
    setApplications(getApplications());
    setCandidates(getCandidates());
  }

  const handleAction = async (actionType: ActionType, payload: ActionPayload) => {
    setIsProcessing(true);
    try {
      const result = await executeAction(actionType, payload);
      
      if (result.success) {
        loadData(); // Refresh data after action
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Action failed');
    } finally {
      setIsProcessing(false);
    }
  }

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, application: any) => {
    setDraggedItem(application);
    e.dataTransfer.setData('applicationId', application.id.toString());
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop on recruiter
  const handleDrop = (e: React.DragEvent, recruiterId: number) => {
    e.preventDefault();
    if (draggedItem) {
      // When candidate is dropped on recruiter, assign the recruiter
      handleAction('ASSIGN_RECRUITER', {
        applicationId: draggedItem.id,
        recruiterId: recruiterId
      });
      setDraggedItem(null);
    }
  };

  // Handle mark task complete
  const handleMarkComplete = (application: any) => {
    handleAction('MARK_TASK_COMPLETE', {
      candidateId: candidates.find(c => c.name === application.candidateName)?.id,
      applicationId: application.id,
      recruiterId: application.recruiterId
    });
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchTerm || 
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCREENING':
        return 'bg-amber-100 text-amber-800';
      case 'REVIEWED':
        return 'bg-blue-100 text-blue-800';
      case 'SHORTLISTED':
        return 'bg-emerald-100 text-emerald-800';
      case 'SCHEDULED':
        return 'bg-cyan-100 text-cyan-800';
      case 'COMPLETED':
        return 'bg-teal-100 text-teal-800';
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecruiterName = (recruiterId: number) => {
    const recruiter = recruiters.find(r => r.id === recruiterId);
    return recruiter ? recruiter.name : 'Unassigned';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        user={{ name: 'Admin User', role: 'ADMIN' }} 
        onLogout={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }} 
      />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Recruiter Tracking</h1>
              <p className="text-slate-600">Drag & drop assignments with multi-outcome automation</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Search Applications</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or position..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="SCREENING">Screening</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div className="flex items-end">
              <button 
                onClick={loadData}
                className="w-full text-sm text-slate-600 hover:text-slate-800 font-medium py-2"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recruiters Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Recruiters</h2>
              <div className="space-y-4">
                {recruiters.map(recruiter => {
                  const assignedApps = applications.filter(app => app.recruiterId === recruiter.id);
                  
                  return (
                    <div 
                      key={recruiter.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        draggedItem ? 'border-dashed border-purple-400 bg-purple-50' : 'border-slate-200'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, recruiter.id)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-slate-800">{recruiter.name}</h3>
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                          {assignedApps.length} tasks
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (recruiter.taskCount / 10) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        Performance: {recruiter.performance}%
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        {assignedApps.slice(0, 3).map(app => (
                          <div key={app.id} className="text-sm p-2 bg-slate-50 rounded flex justify-between items-center">
                            <span>{app.candidateName}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
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
          </div>

          {/* Applications Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Applications</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Current Recruiter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredApplications.map((app) => (
                      <tr 
                        key={app.id} 
                        className={`hover:bg-slate-50 ${
                          draggedItem?.id === app.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, app)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold">
                              {app.candidateName.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-900">{app.candidateName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {app.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {app.recruiterId ? getRecruiterName(app.recruiterId) : 'Unassigned'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                                candidateId: candidates.find(c => c.name === app.candidateName)?.id,
                                applicationId: app.id, 
                                recruiterId: app.recruiterId || 1 
                              })}
                              disabled={isProcessing}
                            >
                              Screen
                            </button>
                            <button
                              className="text-teal-600 hover:text-teal-900"
                              onClick={() => handleMarkComplete(app)}
                              disabled={isProcessing}
                            >
                              Complete
                            </button>
                            <button
                              className="text-purple-600 hover:text-purple-900"
                              onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                                candidateId: candidates.find(c => c.name === app.candidateName)?.id,
                                applicationId: app.id, 
                                stage: 'REVIEWED' 
                              })}
                              disabled={isProcessing}
                            >
                              Review
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Unassigned Applications */}
            <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Unassigned Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications
                  .filter(app => !app.recruiterId)
                  .map(app => (
                    <div 
                      key={app.id}
                      className="border rounded-lg p-4 cursor-move hover:bg-slate-50 transition-colors duration-300"
                      draggable
                      onDragStart={(e) => handleDragStart(e, app)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-slate-800">{app.candidateName}</h3>
                          <p className="text-sm text-slate-600">{app.position}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="mt-3 text-xs text-slate-500">
                        Drag to assign to a recruiter
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Multi-Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md"
              onClick={() => {
                // Assign all unassigned to first recruiter as example
                const unassignedApps = applications.filter(app => !app.recruiterId);
                if (unassignedApps.length > 0 && recruiters.length > 0) {
                  unassignedApps.slice(0, 3).forEach(app => {
                    handleAction('ASSIGN_RECRUITER', {
                      applicationId: app.id,
                      recruiterId: recruiters[0].id
                    });
                  });
                }
              }}
              disabled={isProcessing}
            >
              Assign Unassigned
            </button>
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
              onClick={() => handleAction('PROCESS_DAILY_APPLICATIONS', {})}
              disabled={isProcessing}
            >
              Process All Daily
            </button>
            <button
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-md"
              onClick={() => {
                // Mark all in screening as reviewed
                const screeningApps = applications.filter(app => app.status === 'SCREENING');
                screeningApps.slice(0, 3).forEach(app => {
                  handleAction('MOVE_CANDIDATE_STAGE', {
                    candidateId: candidates.find(c => c.name === app.candidateName)?.id,
                    applicationId: app.id,
                    stage: 'REVIEWED'
                  });
                });
              }}
              disabled={isProcessing}
            >
              Bulk Review
            </button>
            <button
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md"
              onClick={loadData}
              disabled={isProcessing}
            >
              Refresh All
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}