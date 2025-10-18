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

export default function ApplicationsTracking() {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [recruiterFilter, setRecruiterFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any);
    }

    // Load mock applications
    setApplications([
      { id: 1, candidateName: 'John Smith', position: 'Senior Software Engineer', status: 'SCREENING', appliedDate: '2025-10-15', priority: 'HIGH', recruiterId: 1, department: 'Technology', source: 'LinkedIn', rating: 4.5 },
      { id: 2, candidateName: 'Sarah Johnson', position: 'Marketing Manager', status: 'REVIEWED', appliedDate: '2025-10-14', priority: 'MEDIUM', recruiterId: 2, department: 'Marketing', source: 'Indeed', rating: 4.2 },
      { id: 3, candidateName: 'Michael Chen', position: 'Sales Associate', status: 'SCHEDULED', appliedDate: '2025-10-12', priority: 'HIGH', recruiterId: 3, department: 'Sales', source: 'Referral', rating: 4.8 },
      { id: 4, candidateName: 'Emma Rodriguez', position: 'UX Designer', status: 'SCREENING', appliedDate: '2025-10-10', priority: 'LOW', recruiterId: 1, department: 'Design', source: 'Dribbble', rating: 4.7 },
      { id: 5, candidateName: 'David Kim', position: 'Senior Software Engineer', status: 'REJECTED', appliedDate: '2025-10-08', priority: 'MEDIUM', recruiterId: 2, department: 'Technology', source: 'Glassdoor', rating: 3.9 },
      { id: 6, candidateName: 'Lisa Anderson', position: 'Data Scientist', status: 'COMPLETED', appliedDate: '2025-10-07', priority: 'HIGH', recruiterId: 3, department: 'Technology', source: 'LinkedIn', rating: 4.9 },
      { id: 7, candidateName: 'James Wilson', position: 'Product Manager', status: 'SHORTLISTED', appliedDate: '2025-10-06', priority: 'HIGH', recruiterId: 1, department: 'Product', source: 'Internal', rating: 4.6 },
      { id: 8, candidateName: 'Olivia Brown', position: 'Marketing Manager', status: 'SCREENING', appliedDate: '2025-10-05', priority: 'MEDIUM', recruiterId: 2, department: 'Marketing', source: 'Indeed', rating: 4.1 }
    ]);

    // Load mock positions
    setPositions([
      { id: 1, title: 'Senior Software Engineer', department: 'Technology' },
      { id: 2, title: 'Marketing Manager', department: 'Marketing' },
      { id: 3, title: 'Sales Associate', department: 'Sales' },
      { id: 4, title: 'UX Designer', department: 'Design' }
    ]);

    // Load mock recruiters
    setRecruiters([
      { id: 1, name: 'Alex Johnson' },
      { id: 2, name: 'Sam Wilson' },
      { id: 3, name: 'Taylor Reed' }
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

  const handleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(filteredApplications.map(app => app.id));
    }
  };

  const handleSelectApplication = (id: number) => {
    if (selectedApplications.includes(id)) {
      setSelectedApplications(selectedApplications.filter(appId => appId !== id));
    } else {
      setSelectedApplications([...selectedApplications, id]);
    }
  };

  const bulkUpdateStatus = (newStatus: string) => {
    if (selectedApplications.length === 0) {
      toast.error('Please select at least one application');
      return;
    }

    selectedApplications.forEach(appId => {
      const app = applications.find(a => a.id === appId);
      if (app) {
        let actionType: ActionType;
        let payload: ActionPayload = { applicationId: appId, recruiterId: app.recruiterId };

        switch (newStatus) {
          case 'SCREENED':
            actionType = 'MARK_CANDIDATE_SCREENED';
            break;
          case 'REVIEWED':
            actionType = 'MOVE_CANDIDATE_STAGE';
            payload.stage = 'REVIEWED';
            break;
          case 'SCHEDULED':
            actionType = 'SCHEDULE_INTERVIEW';
            payload.interviewDate = new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0];
            break;
          default:
            actionType = 'MOVE_CANDIDATE_STAGE';
            payload.stage = newStatus;
        }

        handleAction(actionType, payload);
      }
    });

    // Clear selection after bulk action
    setSelectedApplications([]);
    toast.info(`Updated ${selectedApplications.length} applications to ${newStatus}`);
  };

  const bulkAssignRecruiter = (recruiterId: number) => {
    if (selectedApplications.length === 0) {
      toast.error('Please select at least one application');
      return;
    }

    selectedApplications.forEach(appId => {
      handleAction('ASSIGN_RECRUITER', {
        applicationId: appId,
        recruiterId: recruiterId
      });
    });

    // Clear selection after bulk action
    setSelectedApplications([]);
    toast.info(`Assigned ${selectedApplications.length} applications to recruiter`);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchTerm || 
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesRecruiter = recruiterFilter === 'ALL' || 
      (recruiterFilter === 'UNASSIGNED' ? !app.recruiterId : app.recruiterId === parseInt(recruiterFilter));
    const matchesPriority = priorityFilter === 'ALL' || app.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesRecruiter && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCREENING':
        return 'bg-amber-100 text-amber-800';
      case 'REVIEWED':
        return 'bg-blue-100 text-blue-800';
      case 'SCHEDULED':
        return 'bg-cyan-100 text-cyan-800';
      case 'SHORTLISTED':
        return 'bg-emerald-100 text-emerald-800';
      case 'COMPLETED':
        return 'bg-teal-100 text-teal-800';
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-rose-100 text-rose-800';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800';
      case 'LOW':
        return 'bg-slate-100 text-slate-800';
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
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Application Tracking</h1>
          <p className="text-slate-600">Track, update, and manage applications end-to-end with bulk actions</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, position..."
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
                <option value="SCHEDULED">Scheduled</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="COMPLETED">Completed</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Recruiter</label>
              <select
                value={recruiterFilter}
                onChange={(e) => setRecruiterFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="ALL">All Recruiters</option>
                <option value="UNASSIGNED">Unassigned</option>
                {recruiters.map(recruiter => (
                  <option key={recruiter.id} value={recruiter.id}>{recruiter.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="ALL">All Priorities</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div className="flex items-end">
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('ALL');
                  setRecruiterFilter('ALL');
                  setPriorityFilter('ALL');
                }}
                className="w-full text-sm text-slate-600 hover:text-slate-800 font-medium py-2"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedApplications.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between">
              <div className="text-sm text-slate-600 mb-2 md:mb-0">
                {selectedApplications.length} application{selectedApplications.length !== 1 ? 's' : ''} selected
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="bg-amber-500 text-white py-1 px-3 rounded-lg hover:bg-amber-600 transition duration-300 text-sm"
                  onClick={() => bulkUpdateStatus('SCREENED')}
                  disabled={isProcessing}
                >
                  Mark Screened
                </button>
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300 text-sm"
                  onClick={() => bulkUpdateStatus('REVIEWED')}
                  disabled={isProcessing}
                >
                  Move to Review
                </button>
                <button
                  className="bg-emerald-500 text-white py-1 px-3 rounded-lg hover:bg-emerald-600 transition duration-300 text-sm"
                  onClick={() => bulkUpdateStatus('SHORTLISTED')}
                  disabled={isProcessing}
                >
                  Shortlist
                </button>
                <button
                  className="bg-purple-500 text-white py-1 px-3 rounded-lg hover:bg-purple-600 transition duration-300 text-sm"
                  onClick={() => bulkUpdateStatus('SCHEDULED')}
                  disabled={isProcessing}
                >
                  Schedule Interview
                </button>
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      bulkAssignRecruiter(parseInt(e.target.value));
                      e.target.value = ''; // Reset the select
                    }
                  }}
                  className="border border-slate-300 rounded-lg px-3 py-1 text-sm disabled:opacity-50"
                  disabled={isProcessing}
                >
                  <option value="">Assign Recruiter</option>
                  {recruiters.map(recruiter => (
                    <option key={recruiter.id} value={recruiter.id}>{recruiter.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-600">{applications.filter(a => a.status === 'SCREENING').length}</p>
            <p className="text-sm text-slate-600">Screening</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">{applications.filter(a => a.status === 'REVIEWED').length}</p>
            <p className="text-sm text-slate-600">Reviewed</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-600">{applications.filter(a => a.status === 'SCHEDULED').length}</p>
            <p className="text-sm text-slate-600">Scheduled</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-600">{applications.filter(a => a.status === 'REJECTED').length}</p>
            <p className="text-sm text-slate-600">Rejected</p>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Applications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500 border-slate-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applied</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Recruiter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredApplications.map(application => (
                  <tr key={application.id} className={`hover:bg-slate-50 ${selectedApplications.includes(application.id) ? 'bg-purple-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedApplications.includes(application.id)}
                        onChange={() => handleSelectApplication(application.id)}
                        className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500 border-slate-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold">{application.candidateName.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{application.candidateName}</div>
                          <div className="text-sm text-slate-500">{application.source}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {application.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                        {application.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                        {application.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {getRecruiterName(application.recruiterId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                            applicationId: application.id, 
                            recruiterId: application.recruiterId 
                          })}
                          disabled={isProcessing}
                          className="text-indigo-600 hover:text-indigo-900 text-sm disabled:opacity-50"
                        >
                          Screen
                        </button>
                        <button
                          onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                            applicationId: application.id, 
                            stage: 'REVIEWED' 
                          })}
                          disabled={isProcessing}
                          className="text-teal-600 hover:text-teal-900 text-sm disabled:opacity-50"
                        >
                          Review
                        </button>
                        <div className="relative group inline-block">
                          <button className="text-amber-600 hover:text-amber-900 text-sm disabled:opacity-50"
                            disabled={isProcessing}>
                            More
                          </button>
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-10 border border-slate-200">
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                              onClick={() => handleAction('SCHEDULE_INTERVIEW', { 
                                applicationId: application.id,
                                interviewDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
                              })}
                              disabled={isProcessing}
                            >
                              Schedule
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                              onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                                applicationId: application.id, 
                                stage: 'SHORTLISTED' 
                              })}
                              disabled={isProcessing}
                            >
                              Shortlist
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                              onClick={() => handleAction('ASSIGN_RECRUITER', { 
                                applicationId: application.id,
                                recruiterId: application.recruiterId || 1
                              })}
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
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Bulk Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Bulk Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md disabled:opacity-50"
              onClick={() => bulkUpdateStatus('SCREENED')}
              disabled={isProcessing || selectedApplications.length === 0}
            >
              Screen All Selected
            </button>
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md disabled:opacity-50"
              onClick={() => bulkUpdateStatus('REVIEWED')}
              disabled={isProcessing || selectedApplications.length === 0}
            >
              Review All Selected
            </button>
            <button
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-md disabled:opacity-50"
              onClick={() => bulkUpdateStatus('SCHEDULED')}
              disabled={isProcessing || selectedApplications.length === 0}
            >
              Schedule Interviews
            </button>
            <button
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md disabled:opacity-50"
              onClick={() => {
                // Bulk action: mark all screening as reviewed
                const screeningApps = applications.filter(a => a.status === 'SCREENING').map(a => a.id);
                setSelectedApplications(screeningApps);
                bulkUpdateStatus('REVIEWED');
              }}
              disabled={isProcessing}
            >
              Process All Screening
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}