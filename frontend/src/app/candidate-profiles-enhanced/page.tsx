'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { 
  executeAction, 
  getCandidates,
  getApplications,
  getRecruiters,
  ActionType, 
  ActionPayload 
} from '../../utils/actionAutomation';
import { toast } from 'react-toastify';

export default function EnhancedCandidateProfiles() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setCandidates(getCandidates());
    setApplications(getApplications());
    setRecruiters(getRecruiters());
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

  // Filter candidates based on search and status
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = !searchTerm || 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
    const app = applications.find(a => a.candidateName === candidate.name);
    const matchesStatus = statusFilter === 'ALL' || 
      (app && (statusFilter === app.status || candidate.stage === statusFilter));
    
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-rose-100 text-rose-800';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800';
      case 'LOW':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getApplicationForCandidate = (candidateName: string) => {
    return applications.find(app => app.candidateName === candidateName);
  };

  const getCandidateScore = (candidateId: number) => {
    const candidate = candidates.find(c => c.id === candidateId);
    return candidate ? candidate.score : 0;
  };

  // Get recruiter name by ID
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
              <h1 className="text-3xl font-bold text-slate-800">Candidate Profiles</h1>
              <p className="text-slate-600">One-tap actions with multiple outcomes</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Search Candidates</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name..."
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

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map(candidate => {
            const app = getApplicationForCandidate(candidate.name);
            const recruiterName = app && app.recruiterId ? getRecruiterName(app.recruiterId) : 'Unassigned';
            const score = getCandidateScore(candidate.id) || 0;

            return (
              <div key={candidate.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                      {candidate.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-slate-800">{candidate.name}</h3>
                      <p className="text-slate-600 text-sm">{app?.position || 'Position not specified'}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(candidate.stage)}`}>
                    {candidate.stage}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Screening Score:</span>
                    <span className="font-medium">{score}%</span>
                  </div>
                  
                  {app && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Recruiter:</span>
                        <span className="font-medium">{recruiterName}</span>
                      </div>
                      
                      {app.priority && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Priority:</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(app.priority)}`}>
                            {app.priority}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Multi-task Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md disabled:opacity-50"
                    onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                      candidateId: candidate.id, 
                      applicationId: app?.id || candidate.id, 
                      recruiterId: app?.recruiterId || 1 
                    })}
                    disabled={isProcessing}
                  >
                    Mark Screened
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 text-sm disabled:opacity-50"
                      onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                        candidateId: candidate.id, 
                        applicationId: app?.id || candidate.id, 
                        stage: 'REVIEWED' 
                      })}
                      disabled={isProcessing}
                    >
                      Move to Reviewed
                    </button>
                    <button
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2 px-3 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition duration-300 text-sm disabled:opacity-50"
                      onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                        candidateId: candidate.id, 
                        applicationId: app?.id || candidate.id, 
                        stage: 'SHORTLISTED' 
                      })}
                      disabled={isProcessing}
                    >
                      Shortlist
                    </button>
                  </div>
                  
                  <button
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md disabled:opacity-50"
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setShowDetails(true);
                    }}
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Candidate Details Modal */}
        {showDetails && selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{selectedCandidate.name} Details</h3>
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="text-slate-400 hover:text-slate-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-slate-700">Personal Info</h4>
                      <p className="text-slate-600">Name: {selectedCandidate.name}</p>
                      <p className="text-slate-600">Stage: {selectedCandidate.stage}</p>
                      <p className="text-slate-600">Score: {selectedCandidate.score}%</p>
                    </div>
                    
                    {getAppForCandidate(selectedCandidate.name) && (
                      <div>
                        <h4 className="font-medium text-slate-700">Application Info</h4>
                        <p className="text-slate-600">Position: {getAppForCandidate(selectedCandidate.name)?.position}</p>
                        <p className="text-slate-600">Status: {getAppForCandidate(selectedCandidate.name)?.status}</p>
                        <p className="text-slate-600">Priority: {getAppForCandidate(selectedCandidate.name)?.priority}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-slate-700 mb-2">Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        className="bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition duration-300"
                        onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                          candidateId: selectedCandidate.id, 
                          applicationId: getAppForCandidate(selectedCandidate.name)?.id || selectedCandidate.id, 
                          recruiterId: getAppForCandidate(selectedCandidate.name)?.recruiterId || 1 
                        })}
                        disabled={isProcessing}
                      >
                        Mark Screened
                      </button>
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                          candidateId: selectedCandidate.id, 
                          applicationId: getAppForCandidate(selectedCandidate.name)?.id || selectedCandidate.id, 
                          stage: 'REVIEWED' 
                        })}
                        disabled={isProcessing}
                      >
                        Move to Review
                      </button>
                      <button
                        className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition duration-300"
                        onClick={() => handleAction('SCHEDULE_INTERVIEW', { 
                          applicationId: getAppForCandidate(selectedCandidate.name)?.id || selectedCandidate.id,
                          interviewDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
                        })}
                        disabled={isProcessing}
                      >
                        Schedule Interview
                      </button>
                      <button
                        className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300"
                        onClick={() => handleAction('ASSIGN_RECRUITER', { 
                          applicationId: getAppForCandidate(selectedCandidate.name)?.id || selectedCandidate.id,
                          recruiterId: recruiters[0]?.id || 1
                        })}
                        disabled={isProcessing}
                      >
                        Assign Recruiter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
  
  // Helper function to get application for candidate
  function getAppForCandidate(candidateName: string) {
    return applications.find(app => app.candidateName === candidateName);
  }
}