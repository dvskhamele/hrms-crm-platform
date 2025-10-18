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

export default function AnalyticsDashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>({});
  const [applications, setApplications] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any);
    }

    loadData();
  }, [timeRange]);

  const loadData = () => {
    // Load mock data
    const data = getDashboardData();
    setStats(data.stats);
    setApplications(data.applications);
    setCandidates(data.candidates);
    setRecruiters(data.recruiters);
    
    // Generate mock chart data based on time range
    generateChartData();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleAction = async (actionType: ActionType, payload: ActionPayload) => {
    setIsProcessing(true);
    try {
      const result = await executeAction(actionType, payload);
      
      if (result.success) {
        loadData(); // Refresh all data after action
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
  };

  const generateChartData = () => {
    // Generate mock chart data based on time range
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Generate mock data points
      const applicationsProcessed = Math.floor(Math.random() * 20) + 5;
      const interviewsScheduled = Math.floor(Math.random() * 10) + 2;
      const candidatesScreened = Math.floor(Math.random() * 15) + 3;
      const hiringRate = Math.min(100, Math.floor(Math.random() * 30) + 50);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        applications: applicationsProcessed,
        interviews: interviewsScheduled,
        screened: candidatesScreened,
        hiringRate: hiringRate
      });
    }
    
    setChartData(data);
  };

  // Calculate metrics
  const applicationsByStatus = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const candidatesByStage = candidates.reduce((acc, candidate) => {
    acc[candidate.stage] = (acc[candidate.stage] || 0) + 1;
    return acc;
  }, {});

  const topRecruiters = [...recruiters]
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 5);

  // Get recruiter name by ID
  const getRecruiterName = (recruiterId: number) => {
    const recruiter = recruiters.find(r => r.id === recruiterId);
    return recruiter ? recruiter.name : 'Unassigned';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Analytics Dashboard</h1>
              <p className="text-slate-600">Performance metrics and insights</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md disabled:opacity-50"
                onClick={() => handleAction('REFRESH_STATS', {})}
                disabled={isProcessing}
              >
                {isProcessing ? 'Refreshing...' : 'Refresh All Data'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-purple-500">
            <p className="text-2xl font-bold text-purple-600">{applications.length}</p>
            <p className="text-sm text-slate-600">Total Applications</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">{candidates.length}</p>
            <p className="text-sm text-slate-600">Active Candidates</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-600">{recruiters.length}</p>
            <p className="text-sm text-slate-600">Active Recruiters</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-600">{stats.hiringRate || 0}%</p>
            <p className="text-sm text-slate-600">Hiring Rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Applications Trend Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Application Trends</h2>
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
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '90d' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('90d')}
                >
                  90D
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end space-x-2 mt-8">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div className="text-xs text-slate-500 mb-1 group-hover:text-purple-600 transition-colors">
                    {data.applications}
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-purple-400 to-purple-600 rounded-t transition-all duration-300 group-hover:from-purple-500 group-hover:to-purple-700"
                    style={{ height: `${(data.applications / 25) * 200}px` }}
                  ></div>
                  <div className="text-xs text-slate-600 mt-1 group-hover:text-slate-800 transition-colors">
                    {data.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Stage Distribution */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Candidate Stage Distribution</h2>
            <div className="h-64">
              <div className="space-y-4">
                {Object.entries(candidatesByStage).map(([stage, count]) => (
                  <div key={stage} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 capitalize">{stage}</span>
                      <span className="font-medium">{count as number}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${(count as number / candidates.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Application Status Distribution */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Application Status Distribution</h2>
            <div className="h-64">
              <div className="space-y-4">
                {Object.entries(applicationsByStatus).map(([status, count]) => (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 capitalize">{status}</span>
                      <span className="font-medium">{count as number}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${(count as number / applications.length) * 100}%`,
                          backgroundColor: status === 'SCREENING' ? '#f59e0b' : 
                                         status === 'REVIEWED' ? '#3b82f6' : 
                                         status === 'SCHEDULED' ? '#06b6d4' : 
                                         status === 'SHORTLISTED' ? '#10b981' : 
                                         status === 'COMPLETED' ? '#8b5cf6' : '#ef4444'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Recruiters */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Top Recruiters</h2>
            <div className="space-y-4">
              {topRecruiters.map((recruiter, index) => {
                const assignedApps = applications.filter(app => app.recruiterId === recruiter.id);
                const completedApps = assignedApps.filter(app => app.status === 'COMPLETED').length;
                
                return (
                  <div key={recruiter.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {recruiter.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-slate-800">{recruiter.name}</div>
                        <div className="text-xs text-slate-500">{completedApps}/{assignedApps.length} completed</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">{recruiter.performance}%</span>
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${recruiter.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Conversion Trends */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Conversion Trends</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800">Applied to Screening</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {applications.length > 0 ? Math.round((candidates.filter(c => c.stage === 'SCREENING').length / applications.length) * 100) : 0}%
              </p>
              <p className="text-sm text-blue-700">Screening Rate</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-medium text-amber-800">Screening to Review</h3>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                {candidates.filter(c => c.stage === 'SCREENING').length > 0 
                  ? Math.round((candidates.filter(c => c.stage === 'REVIEWED').length / candidates.filter(c => c.stage === 'SCREENING').length) * 100) 
                  : 0}%
              </p>
              <p className="text-sm text-amber-700">Review Rate</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="font-medium text-emerald-800">Reviewed to Shortlisted</h3>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {candidates.filter(c => c.stage === 'REVIEWED').length > 0 
                  ? Math.round((candidates.filter(c => c.stage === 'SHORTLISTED').length / candidates.filter(c => c.stage === 'REVIEWED').length) * 100) 
                  : 0}%
              </p>
              <p className="text-sm text-emerald-700">Shortlist Rate</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-800">Shortlisted to Hired</h3>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {candidates.filter(c => c.stage === 'SHORTLISTED').length > 0 
                  ? Math.round((candidates.filter(c => c.stage === 'COMPLETED').length / candidates.filter(c => c.stage === 'SHORTLISTED').length) * 100) 
                  : 0}%
              </p>
              <p className="text-sm text-purple-700">Hire Rate</p>
            </div>
          </div>
        </div>

        {/* Quick Refresh Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Analytics Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md disabled:opacity-50"
              onClick={() => handleAction('REFRESH_STATS', {})}
              disabled={isProcessing}
            >
              Refresh All Stats
            </button>
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md disabled:opacity-50"
              onClick={() => handleAction('PROCESS_DAILY_APPLICATIONS', {})}
              disabled={isProcessing}
            >
              Process Daily Data
            </button>
            <button
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-md disabled:opacity-50"
              onClick={() => {
                // Update hiring rate based on completed applications
                const completedApps = applications.filter(app => app.status === 'COMPLETED');
                const newHiringRate = Math.min(100, Math.floor((completedApps.length / applications.length) * 100));
                setStats(prevStats => ({ ...prevStats, hiringRate: newHiringRate }));
                toast.info(`Hiring rate updated to ${newHiringRate}%`);
              }}
              disabled={isProcessing}
            >
              Update Hiring Rate
            </button>
            <button
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md disabled:opacity-50"
              onClick={() => {
                // Generate new chart data
                generateChartData();
                toast.info('Chart data regenerated');
              }}
              disabled={isProcessing}
            >
              Regenerate Charts
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}