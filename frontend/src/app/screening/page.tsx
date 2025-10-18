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

export default function ScreeningScheduling() {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  const [showScheduler, setShowScheduler] = useState(false);
  const [schedulerData, setSchedulerData] = useState({
    applicationId: 0,
    date: '',
    time: '',
    recruiterId: 0,
    duration: 60
  });

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any);
    }

    // Load mock applications (only screening stage)
    setApplications([
      { id: 1, candidateName: 'John Smith', position: 'Senior Software Engineer', status: 'SCREENING', appliedDate: '2025-10-15', priority: 'HIGH', recruiterId: 1, department: 'Technology', source: 'LinkedIn', rating: 4.5, skills: ['JavaScript', 'React', 'Node.js'] },
      { id: 2, candidateName: 'Sarah Johnson', position: 'Marketing Manager', status: 'SCREENING', appliedDate: '2025-10-14', priority: 'MEDIUM', recruiterId: 2, department: 'Marketing', source: 'Indeed', rating: 4.2, skills: ['Digital Marketing', 'SEO', 'Analytics'] },
      { id: 3, candidateName: 'Michael Chen', position: 'Sales Associate', status: 'SCREENING', appliedDate: '2025-10-12', priority: 'HIGH', recruiterId: 3, department: 'Sales', source: 'Referral', rating: 4.8, skills: ['Sales', 'Communication', 'CRM'] },
      { id: 4, candidateName: 'Emma Rodriguez', position: 'UX Designer', status: 'SCREENING', appliedDate: '2025-10-10', priority: 'LOW', recruiterId: 1, department: 'Design', source: 'Dribbble', rating: 4.7, skills: ['Figma', 'UI/UX', 'Prototyping'] },
      { id: 5, candidateName: 'David Kim', position: 'Data Scientist', status: 'SCREENING', appliedDate: '2025-10-08', priority: 'MEDIUM', recruiterId: 2, department: 'Technology', source: 'Glassdoor', rating: 3.9, skills: ['Python', 'Machine Learning', 'SQL'] }
    ]);

    // Load mock recruiters
    setRecruiters([
      { id: 1, name: 'Alex Johnson', availability: 'Available', lastActive: '2025-10-15' },
      { id: 2, name: 'Sam Wilson', availability: 'Busy', lastActive: '2025-10-15' },
      { id: 3, name: 'Taylor Reed', availability: 'Available', lastActive: '2025-10-14' }
    ]);

    // Load mock interviews
    setInterviews([
      { id: 1, candidateName: 'Lisa Anderson', position: 'Product Manager', date: '2025-10-18', time: '10:00', recruiter: 'Alex Johnson', status: 'Scheduled', applicationId: 6 },
      { id: 2, candidateName: 'James Wilson', position: 'Data Scientist', date: '2025-10-18', time: '14:00', recruiter: 'Sam Wilson', status: 'Scheduled', applicationId: 7 },
      { id: 3, candidateName: 'Olivia Brown', position: 'UX Designer', date: '2025-10-19', time: '11:00', recruiter: 'Taylor Reed', status: 'Confirmed', applicationId: 8 }
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

  const scheduleInterview = () => {
    if (!schedulerData.applicationId || !schedulerData.date || !schedulerData.time || !schedulerData.recruiterId) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create new interview
    const newInterview = {
      id: interviews.length + 1,
      candidateName: applications.find(app => app.id === schedulerData.applicationId)?.candidateName || 'Unknown',
      position: applications.find(app => app.id === schedulerData.applicationId)?.position || 'Unknown',
      date: schedulerData.date,
      time: schedulerData.time,
      recruiter: recruiters.find(r => r.id === schedulerData.recruiterId)?.name || 'Unknown',
      status: 'Scheduled',
      applicationId: schedulerData.applicationId
    };

    setInterviews(prev => [...prev, newInterview]);

    // Update application status
    setApplications(prev => 
      prev.map(app => 
        app.id === schedulerData.applicationId 
          ? { ...app, status: 'SCHEDULED' } 
          : app
      )
    );

    // Update recruiter workload
    setRecruiters(prev => 
      prev.map(recruiter => 
        recruiter.id === schedulerData.recruiterId 
          ? { ...recruiter, availability: 'Busy' } 
          : recruiter
      )
    );

    handleAction('SCHEDULE_INTERVIEW', {
      applicationId: schedulerData.applicationId,
      interviewDate: schedulerData.date,
      recruiterId: schedulerData.recruiterId
    });

    toast.success(`Interview scheduled for ${newInterview.candidateName}`);
    setShowScheduler(false);
    setSchedulerData({
      applicationId: 0,
      date: '',
      time: '',
      recruiterId: 0,
      duration: 60
    });
  };

  const markScreened = (applicationId: number, recruiterId: number) => {
    handleAction('MARK_CANDIDATE_SCREENED', {
      applicationId: applicationId,
      recruiterId: recruiterId
    });

    // Update local state
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: 'REVIEWED' } 
          : app
      )
    );
  };

  const moveStage = (applicationId: number, newStage: string) => {
    handleAction('MOVE_CANDIDATE_STAGE', {
      applicationId: applicationId,
      stage: newStage
    });

    // Update local state
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStage } 
          : app
      )
    );
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800';
      case 'Busy':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h1 className="text-3xl font-bold text-slate-800">Screening & Scheduling</h1>
          <p className="text-slate-600">Screen candidates and schedule interviews with one-tap actions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Screening Queue */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Screening Queue</h2>
              <span className="bg-amber-100 text-amber-800 text-sm px-2 py-1 rounded-full">
                {applications.filter(app => app.status === 'SCREENING').length} pending
              </span>
            </div>
            <div className="space-y-4">
              {applications
                .filter(app => app.status === 'SCREENING')
                .map(application => (
                  <div 
                    key={application.id} 
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      selectedApplication === application.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedApplication(application.id === selectedApplication ? null : application.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {application.candidateName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-slate-800">{application.candidateName}</h3>
                          <p className="text-sm text-slate-600">{application.position} • {application.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(application.priority)}`}>
                          {application.priority}
                        </span>
                        <div className="flex items-center mt-1">
                          <span className="text-amber-500 mr-1">★</span>
                          <span className="text-sm">{application.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <h4 className="text-xs font-medium text-slate-700">Skills:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {application.skills.slice(0, 3).map((skill: string, idx: number) => (
                          <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {selectedApplication === application.id && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition duration-300 text-sm"
                            onClick={() => markScreened(application.id, application.recruiterId)}
                            disabled={isProcessing}
                          >
                            Mark Screened
                          </button>
                          <button
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 text-sm"
                            onClick={() => moveStage(application.id, 'REVIEWED')}
                            disabled={isProcessing}
                          >
                            Move to Review
                          </button>
                          <button
                            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 text-sm col-span-2"
                            onClick={() => {
                              setSchedulerData({
                                ...schedulerData,
                                applicationId: application.id
                              });
                              setShowScheduler(true);
                            }}
                            disabled={isProcessing}
                          >
                            Schedule Interview
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Interview Scheduler & Calendar */}
          <div>
            {/* Scheduled Interviews */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Scheduled Interviews</h2>
                <div className="flex space-x-2">
                  <button 
                    className={`text-xs px-2 py-1 rounded ${timeRange === 'day' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'}`}
                    onClick={() => setTimeRange('day')}
                  >
                    Day
                  </button>
                  <button 
                    className={`text-xs px-2 py-1 rounded ${timeRange === 'week' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'}`}
                    onClick={() => setTimeRange('week')}
                  >
                    Week
                  </button>
                  <button 
                    className={`text-xs px-2 py-1 rounded ${timeRange === 'month' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'}`}
                    onClick={() => setTimeRange('month')}
                  >
                    Month
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {interviews.map(interview => (
                  <div 
                    key={interview.id} 
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      selectedInterview === interview.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedInterview(interview.id === selectedInterview ? null : interview.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-slate-800">{interview.candidateName}</h3>
                        <p className="text-sm text-slate-600">{interview.position}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-slate-800">{interview.date}</div>
                        <div className="text-sm text-slate-600">{interview.time}</div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-sm text-slate-600">With {interview.recruiter}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        interview.status === 'Scheduled' ? 'bg-cyan-100 text-cyan-800' : 
                        interview.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {interview.status}
                      </span>
                    </div>
                    
                    {selectedInterview === interview.id && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <div className="flex justify-between">
                          <button
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                            onClick={() => {
                              // Confirm interview
                              setInterviews(prev => 
                                prev.map(i => 
                                  i.id === interview.id 
                                    ? { ...i, status: 'Confirmed' } 
                                    : i
                                )
                              );
                              toast.info(`Interview confirmed for ${interview.candidateName}`);
                            }}
                            disabled={isProcessing}
                          >
                            Confirm
                          </button>
                          <button
                            className="text-sm text-rose-600 hover:text-rose-800"
                            onClick={() => {
                              // Cancel interview
                              setInterviews(prev => prev.filter(i => i.id !== interview.id));
                              toast.info(`Interview canceled for ${interview.candidateName}`);
                            }}
                            disabled={isProcessing}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md disabled:opacity-50"
                  onClick={() => {
                    // Process all screening candidates
                    applications
                      .filter(app => app.status === 'SCREENING')
                      .forEach(app => markScreened(app.id, app.recruiterId));
                    toast.success('All screening candidates processed');
                  }}
                  disabled={isProcessing}
                >
                  Process All
                </button>
                <button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md disabled:opacity-50"
                  onClick={() => setShowScheduler(true)}
                  disabled={isProcessing}
                >
                  Schedule New
                </button>
                <button
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-md disabled:opacity-50"
                  onClick={() => handleAction('REFRESH_STATS', {})}
                  disabled={isProcessing}
                >
                  Refresh
                </button>
                <button
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md disabled:opacity-50"
                  onClick={() => {
                    // Update dashboard metrics
                    toast.info('Dashboard metrics updated');
                  }}
                  disabled={isProcessing}
                >
                  Update Metrics
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduler Modal */}
        {showScheduler && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Schedule Interview</h3>
                  <button 
                    onClick={() => setShowScheduler(false)}
                    className="text-slate-400 hover:text-slate-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Candidate</label>
                    <select
                      value={schedulerData.applicationId}
                      onChange={(e) => setSchedulerData({...schedulerData, applicationId: parseInt(e.target.value)})}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="0">Select a candidate...</option>
                      {applications
                        .filter(app => app.status === 'SCREENING')
                        .map(app => (
                          <option key={app.id} value={app.id}>
                            {app.candidateName} - {app.position}
                          </option>
                        ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={schedulerData.date}
                        onChange={(e) => setSchedulerData({...schedulerData, date: e.target.value})}
                        className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                      <input
                        type="time"
                        value={schedulerData.time}
                        onChange={(e) => setSchedulerData({...schedulerData, time: e.target.value})}
                        className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assign Recruiter</label>
                    <select
                      value={schedulerData.recruiterId}
                      onChange={(e) => setSchedulerData({...schedulerData, recruiterId: parseInt(e.target.value)})}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="0">Select a recruiter...</option>
                      {recruiters.map(recruiter => (
                        <option key={recruiter.id} value={recruiter.id}>
                          {recruiter.name} - {recruiter.availability}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</label>
                    <select
                      value={schedulerData.duration}
                      onChange={(e) => setSchedulerData({...schedulerData, duration: parseInt(e.target.value)})}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>60 minutes</option>
                      <option value={90}>90 minutes</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowScheduler(false)}
                    className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={scheduleInterview}
                    className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Scheduling...' : 'Schedule Interview'}
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