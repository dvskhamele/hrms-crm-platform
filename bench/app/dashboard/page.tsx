'use client';

import React, { useState, useEffect } from 'react';

export default function RecruitmentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs and applications
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch jobs
        const jobsResponse = await fetch('/api/job-posting');
        if (!jobsResponse.ok) {
          throw new Error(`Failed to fetch jobs: ${jobsResponse.status}`);
        }
        const jobsData = await jobsResponse.json();
        setJobs(jobsData);
        
        // For now, we'll use mock data for applications
        // In a real implementation, you would fetch from /api/job-application
        const mockApplications = [
          {
            id: '1',
            job_title: 'Senior Software Engineer',
            applicant_name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '+1 (555) 123-4567',
            experience: '5 years',
            status: 'submitted',
            applied_date: '2025-10-20'
          },
          {
            id: '2',
            job_title: 'Marketing Manager',
            applicant_name: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            phone: '+1 (555) 987-6543',
            experience: '3 years',
            status: 'reviewed',
            applied_date: '2025-10-19'
          },
          {
            id: '3',
            job_title: 'UX Designer',
            applicant_name: 'Michael Chen',
            email: 'michael.chen@example.com',
            phone: '+1 (555) 456-7890',
            experience: '4 years',
            status: 'interview_scheduled',
            applied_date: '2025-10-18'
          }
        ];
        setApplications(mockApplications);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get counts for dashboard cards
  const totalJobs = jobs.length;
  const publishedJobs = jobs.filter(job => job.status === 'published').length;
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'submitted').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-slate-900">Unable to load dashboard</h3>
          <p className="mt-2 text-slate-600">{error}</p>
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Recruitment Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage your job postings and applications</p>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white rounded-2xl shadow-md mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'jobs'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Job Postings
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Applications
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Dashboard Overview</h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow p-6 text-center border-l-4 border-teal-500">
                    <p className="text-3xl font-bold text-teal-600">{totalJobs}</p>
                    <p className="text-sm text-slate-600">Total Jobs</p>
                  </div>
                  <div className="bg-white rounded-xl shadow p-6 text-center border-l-4 border-emerald-500">
                    <p className="text-3xl font-bold text-emerald-600">{publishedJobs}</p>
                    <p className="text-sm text-slate-600">Published Jobs</p>
                  </div>
                  <div className="bg-white rounded-xl shadow p-6 text-center border-l-4 border-amber-500">
                    <p className="text-3xl font-bold text-amber-600">{totalApplications}</p>
                    <p className="text-sm text-slate-600">Total Applications</p>
                  </div>
                  <div className="bg-white rounded-xl shadow p-6 text-center border-l-4 border-blue-500">
                    <p className="text-3xl font-bold text-blue-600">{pendingApplications}</p>
                    <p className="text-sm text-slate-600">Pending Applications</p>
                  </div>
                </div>

                {/* Recent Jobs */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-slate-800">Recent Job Postings</h3>
                    <a href="/job-posting" className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                      View All
                    </a>
                  </div>
                  <div className="bg-slate-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Job Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applications</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {jobs.slice(0, 5).map(job => (
                          <tr key={job.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-slate-900">{job.title}</div>
                              <div className="text-sm text-slate-500">{job.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-900">{job.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                              {/* In a real app, you'd fetch application count per job */}
                              0
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                job.status === 'published' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-slate-100 text-slate-800'
                              }`}>
                                {job.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Applications */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-slate-800">Recent Applications</h3>
                    <a href="#" className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                      View All
                    </a>
                  </div>
                  <div className="bg-slate-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applicant</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applied Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {applications.slice(0, 5).map(application => (
                          <tr key={application.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-slate-900">{application.applicant_name}</div>
                              <div className="text-sm text-slate-500">{application.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-900">{application.job_title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                              {new Date(application.applied_date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                application.status === 'submitted' 
                                  ? 'bg-amber-100 text-amber-800'
                                  : application.status === 'reviewed'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {application.status.replace('_', ' ')}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Job Postings</h2>
                  <a 
                    href="/job-posting" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create New Job
                  </a>
                </div>
                
                <div className="bg-slate-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Job Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applications</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {jobs.map(job => (
                        <tr key={job.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">{job.title}</div>
                            <div className="text-sm text-slate-500">{job.employment_type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {job.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {job.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {/* In a real app, you'd fetch application count per job */}
                            0
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              job.status === 'published' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-slate-100 text-slate-800'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a href="#" className="text-teal-600 hover:text-teal-900 mr-3">Edit</a>
                            <a href="#" className="text-amber-600 hover:text-amber-900 mr-3">Preview</a>
                            <a href="#" className="text-blue-600 hover:text-blue-900">Publish</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Job Applications</h2>
                
                <div className="bg-slate-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applicant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applied Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Experience</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {applications.map(application => (
                        <tr key={application.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">{application.applicant_name}</div>
                            <div className="text-sm text-slate-500">{application.email}</div>
                            <div className="text-sm text-slate-500">{application.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">{application.job_title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {new Date(application.applied_date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {application.experience}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              application.status === 'submitted' 
                                ? 'bg-amber-100 text-amber-800'
                                : application.status === 'reviewed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {application.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a href="#" className="text-teal-600 hover:text-teal-900 mr-3">View</a>
                            <a href="#" className="text-amber-600 hover:text-amber-900 mr-3">Review</a>
                            <a href="#" className="text-blue-600 hover:text-blue-900">Schedule</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}