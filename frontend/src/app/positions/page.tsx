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

export default function PositionsManagement() {
  const [user, setUser] = useState<any>(null);
  const [positions, setPositions] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddPosition, setShowAddPosition] = useState(false);
  const [newPosition, setNewPosition] = useState({
    title: '',
    department: '',
    description: '',
    requirements: ''
  });

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any);
    }

    // Load mock positions
    setPositions([
      { id: 1, title: 'Senior Software Engineer', department: 'Technology', status: 'Open', applications: 12, postedDate: '2025-10-01', deadline: '2025-10-30', priority: 'HIGH' },
      { id: 2, title: 'Marketing Manager', department: 'Marketing', status: 'Open', applications: 8, postedDate: '2025-10-05', deadline: '2025-10-25', priority: 'MEDIUM' },
      { id: 3, title: 'Sales Associate', department: 'Sales', status: 'On Hold', applications: 5, postedDate: '2025-09-20', deadline: '2025-10-20', priority: 'HIGH' },
      { id: 4, title: 'UX Designer', department: 'Design', status: 'Filled', applications: 15, postedDate: '2025-08-15', deadline: '2025-09-15', priority: 'MEDIUM' }
    ]);

    // Load mock applications
    setApplications([
      { id: 1, candidateName: 'John Smith', positionId: 1, status: 'SCREENING', appliedDate: '2025-10-10', priority: 'HIGH' },
      { id: 2, candidateName: 'Sarah Johnson', positionId: 1, status: 'REVIEWED', appliedDate: '2025-10-09', priority: 'MEDIUM' },
      { id: 3, candidateName: 'Michael Chen', positionId: 2, status: 'SCREENING', appliedDate: '2025-10-08', priority: 'HIGH' },
      { id: 4, candidateName: 'Emma Rodriguez', positionId: 1, status: 'SCHEDULED', appliedDate: '2025-10-07', priority: 'MEDIUM' }
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

  const closePosition = (positionId: number) => {
    handleAction('MARK_TASK_COMPLETE', {
      applicationId: positionId,
      recruiterId: 1 // placeholder
    });

    // Update local state
    setPositions(prev => 
      prev.map(pos => 
        pos.id === positionId 
          ? { ...pos, status: 'Filled', applications: 0 } 
          : pos
      )
    );
  };

  const putOnHold = (positionId: number) => {
    setPositions(prev => 
      prev.map(pos => 
        pos.id === positionId 
          ? { ...pos, status: 'On Hold' } 
          : pos
      )
    );
    
    // Update dashboard alerts
    toast.info(`Position "${positions.find(p => p.id === positionId)?.title}" is now on hold`);
  };

  const reopenPosition = (positionId: number) => {
    setPositions(prev => 
      prev.map(pos => 
        pos.id === positionId 
          ? { ...pos, status: 'Open' } 
          : pos
      )
    );
    
    // Resume notifications
    toast.info(`Position "${positions.find(p => p.id === positionId)?.title}" reopened`);
  };

  const handleViewApplications = (positionId: number) => {
    const positionTitle = positions.find(p => p.id === positionId)?.title;
    toast.info(`Viewing applications for ${positionTitle}`);
    // In a real app, navigate to applications page filtered by position
  };

  const handleAddPosition = () => {
    if (!newPosition.title || !newPosition.department) {
      toast.error('Title and department are required');
      return;
    }

    const newId = Math.max(...positions.map(p => p.id), 0) + 1;
    setPositions(prev => [
      ...prev,
      {
        id: newId,
        title: newPosition.title,
        department: newPosition.department,
        status: 'Open',
        applications: 0,
        postedDate: new Date().toISOString().split('T')[0],
        deadline: '2025-12-31', // Default deadline
        priority: 'MEDIUM'
      }
    ]);

    toast.success(`Position "${newPosition.title}" created successfully`);
    setNewPosition({ title: '', department: '', description: '', requirements: '' });
    setShowAddPosition(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-emerald-100 text-emerald-800';
      case 'On Hold':
        return 'bg-amber-100 text-amber-800';
      case 'Filled':
        return 'bg-slate-100 text-slate-800';
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

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Technology':
        return 'bg-indigo-100 text-indigo-800';
      case 'Marketing':
        return 'bg-amber-100 text-amber-800';
      case 'Sales':
        return 'bg-emerald-100 text-emerald-800';
      case 'Design':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Positions Management</h1>
              <p className="text-slate-600">Manage open positions and their applications</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md disabled:opacity-50"
                onClick={() => setShowAddPosition(true)}
                disabled={isProcessing}
              >
                Add New Position
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-600">{positions.filter(p => p.status === 'Open').length}</p>
            <p className="text-sm text-slate-600">Open Positions</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-600">{positions.filter(p => p.status === 'On Hold').length}</p>
            <p className="text-sm text-slate-600">On Hold</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-600">{positions.filter(p => p.status === 'Filled').length}</p>
            <p className="text-sm text-slate-600">Filled</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
            <p className="text-sm text-slate-600">Total Applications</p>
          </div>
        </div>

        {/* Add Position Modal */}
        {showAddPosition && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Add New Position</h3>
                  <button 
                    onClick={() => setShowAddPosition(false)}
                    className="text-slate-400 hover:text-slate-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Position Title</label>
                    <input
                      type="text"
                      value={newPosition.title}
                      onChange={(e) => setNewPosition({...newPosition, title: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <select
                      value={newPosition.department}
                      onChange={(e) => setNewPosition({...newPosition, department: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Department</option>
                      <option value="Technology">Technology</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Design">Design</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                      value={newPosition.description}
                      onChange={(e) => setNewPosition({...newPosition, description: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Position description..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Requirements</label>
                    <textarea
                      value={newPosition.requirements}
                      onChange={(e) => setNewPosition({...newPosition, requirements: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Key requirements..."
                      rows={2}
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddPosition(false)}
                    className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPosition}
                    className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Creating...' : 'Create Position'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Positions Table */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Open Positions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applications</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Posted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {positions.map(position => (
                  <tr key={position.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{position.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getDepartmentColor(position.department)}`}>
                        {position.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(position.status)}`}>
                        {position.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {position.applications}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(position.postedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(position.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getPriorityColor(position.priority)}`}>
                        {position.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-wrap gap-2">
                        {position.status === 'Open' ? (
                          <>
                            <button
                              onClick={() => handleViewApplications(position.id)}
                              className="text-indigo-600 hover:text-indigo-900 text-sm"
                              disabled={isProcessing}
                              title="View applications - auto-highlight urgent, flag deadlines, suggest next actions"
                            >
                              View Apps
                            </button>
                            <button
                              onClick={() => closePosition(position.id)}
                              className="text-rose-600 hover:text-rose-900 text-sm"
                              disabled={isProcessing}
                              title="Close position - mark filled, notify recruiters, update metrics"
                            >
                              Close
                            </button>
                            <button
                              onClick={() => putOnHold(position.id)}
                              className="text-amber-600 hover:text-amber-900 text-sm"
                              disabled={isProcessing}
                              title="Put on hold - adjust dashboard alerts, pause notifications"
                            >
                              Hold
                            </button>
                          </>
                        ) : position.status === 'On Hold' ? (
                          <>
                            <button
                              onClick={() => reopenPosition(position.id)}
                              className="text-emerald-600 hover:text-emerald-900 text-sm"
                              disabled={isProcessing}
                              title="Reopen position"
                            >
                              Reopen
                            </button>
                            <button
                              onClick={() => closePosition(position.id)}
                              className="text-rose-600 hover:text-rose-900 text-sm"
                              disabled={isProcessing}
                              title="Close position"
                            >
                              Close
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => reopenPosition(position.id)}
                            className="text-emerald-600 hover:text-emerald-900 text-sm"
                            disabled={isProcessing}
                            title="Reopen position"
                          >
                            Reopen
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Applications */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applied Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {applications.map(application => {
                  const position = positions.find(p => p.id === application.positionId);
                  return (
                    <tr key={application.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{application.candidateName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {position?.title || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                          application.status === 'SCREENING' ? 'bg-amber-100 text-amber-800' :
                          application.status === 'REVIEWED' ? 'bg-blue-100 text-blue-800' :
                          application.status === 'SCHEDULED' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                          {application.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                              applicationId: application.id,
                              recruiterId: 1
                            })}
                            disabled={isProcessing}
                            className="text-indigo-600 hover:text-indigo-900 text-sm"
                          >
                            Screen
                          </button>
                          <button
                            onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                              applicationId: application.id,
                              stage: 'REVIEWED'
                            })}
                            disabled={isProcessing}
                            className="text-teal-600 hover:text-teal-900 text-sm"
                          >
                            Review
                          </button>
                          <button
                            onClick={() => handleAction('SCHEDULE_INTERVIEW', { 
                              applicationId: application.id,
                              interviewDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
                            })}
                            disabled={isProcessing}
                            className="text-purple-600 hover:text-purple-900 text-sm"
                          >
                            Interview
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}