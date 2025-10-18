'use client'

import React, { useState } from 'react'

interface Recruiter {
  id: number
  name: string
  department: string
  performance: number
  applicationsProcessed: number
  avgResponseTime: number
  badges: string[]
}

const RecruiterLeaderboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  
  // Mock data for recruiter performance
  const recruiterData: Recruiter[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      department: 'Technology',
      performance: 96,
      applicationsProcessed: 42,
      avgResponseTime: 18,
      badges: ['Top Performer', 'Hiring Hero']
    },
    {
      id: 2,
      name: 'Bob Smith',
      department: 'Marketing',
      performance: 92,
      applicationsProcessed: 38,
      avgResponseTime: 25,
      badges: ['Efficiency Expert']
    },
    {
      id: 3,
      name: 'Carol Davis',
      department: 'Technology',
      performance: 94,
      applicationsProcessed: 45,
      avgResponseTime: 15,
      badges: ['Quick Hire', 'Talent Scout']
    },
    {
      id: 4,
      name: 'David Wilson',
      department: 'Sales',
      performance: 89,
      applicationsProcessed: 35,
      avgResponseTime: 22,
      badges: ['Candidate Favorite']
    },
    {
      id: 5,
      name: 'Eva Brown',
      department: 'Human Resources',
      performance: 91,
      applicationsProcessed: 32,
      avgResponseTime: 28,
      badges: ['Perfect Matches']
    }
  ]

  // Filter recruiters by department
  const filteredRecruiters = selectedDepartment === 'all' 
    ? recruiterData 
    : recruiterData.filter(recruiter => recruiter.department === selectedDepartment)

  // Sort recruiters by performance
  const sortedRecruiters = [...filteredRecruiters].sort((a, b) => b.performance - a.performance)

  // Get unique departments
  const departments = Array.from(new Set(recruiterData.map(recruiter => recruiter.department)))

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Recruiter Performance Leaderboard</h2>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <select
            className="text-sm px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
            <button 
              className={`text-xs px-2 py-1 rounded ${timeRange === 'day' ? 'bg-white text-teal-600 shadow' : 'text-slate-600'}`}
              onClick={() => setTimeRange('day')}
            >
              Day
            </button>
            <button 
              className={`text-xs px-2 py-1 rounded ${timeRange === 'week' ? 'bg-white text-teal-600 shadow' : 'text-slate-600'}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`text-xs px-2 py-1 rounded ${timeRange === 'month' ? 'bg-white text-teal-600 shadow' : 'text-slate-600'}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Recruiter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Processed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg. Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Badges</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedRecruiters.map((recruiter, index) => (
              <tr key={recruiter.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {index === 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    <span className="text-sm font-medium text-slate-900">#{index + 1}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{recruiter.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{recruiter.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                    {recruiter.department}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-slate-900">{recruiter.performance}%</div>
                    <div className="ml-2 w-24 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full" 
                        style={{ width: `${recruiter.performance}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {recruiter.applicationsProcessed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-slate-900">{recruiter.avgResponseTime} min</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {recruiter.badges.map((badge, badgeIndex) => (
                      <span 
                        key={badgeIndex} 
                        className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Achievement Badges Legend */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-800 mb-2">Achievement Badges</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Top Performer - 95%+ performance score</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Hiring Hero - Successfully placed 10+ candidates</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Efficiency Expert - Processed 20+ applications in under 20 min</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Quick Hire - 5+ hires completed in under 3 days</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Talent Scout - Identified 5+ high-potential candidates</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Candidate Favorite - 10+ positive candidate feedbacks</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Perfect Matches - 80%+ candidate-job match rate</span>
        </div>
      </div>
    </div>
  )
}

export default RecruiterLeaderboard