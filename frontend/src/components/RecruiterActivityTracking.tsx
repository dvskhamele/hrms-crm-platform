'use client'

import React, { useState, useEffect } from 'react'

interface Recruiter {
  id: number
  name: string
  department: string
  position: string
  status: string // Active, Break, Offline
  location: {
    office: string
    area: string
    lastUpdate: string
  }
  performance: number
  currentTask?: string
  taskProgress?: number
}

const RecruiterActivityTracking: React.FC = () => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      department: 'Technology',
      position: 'Senior Recruiter',
      status: 'Active',
      location: {
        office: 'Main Office',
        area: 'South Wing',
        lastUpdate: new Date(Date.now() - 60000).toISOString() // 1 minute ago
      },
      performance: 96,
      currentTask: 'Interviewing candidate for Software Engineer',
      taskProgress: 75
    },
    {
      id: 2,
      name: 'Bob Smith',
      department: 'Marketing',
      position: 'Recruiter',
      status: 'Active',
      location: {
        office: 'Main Office',
        area: 'North Wing',
        lastUpdate: new Date(Date.now() - 120000).toISOString() // 2 minutes ago
      },
      performance: 89,
      currentTask: 'Reviewing applications for Marketing Manager',
      taskProgress: 40
    },
    {
      id: 3,
      name: 'Carol Davis',
      department: 'Sales',
      position: 'Recruiter',
      status: 'Break',
      location: {
        office: 'Main Office',
        area: 'Break Room',
        lastUpdate: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
      },
      performance: 94
    },
    {
      id: 4,
      name: 'David Wilson',
      department: 'Human Resources',
      position: 'Talent Acquisition Manager',
      status: 'Active',
      location: {
        office: 'Main Office',
        area: 'Conference Room A',
        lastUpdate: new Date(Date.now() - 180000).toISOString() // 3 minutes ago
      },
      performance: 91,
      currentTask: 'Onboarding new hire',
      taskProgress: 60
    },
    {
      id: 5,
      name: 'Eva Brown',
      department: 'Technology',
      position: 'Recruiter',
      status: 'Active',
      location: {
        office: 'Main Office',
        area: 'East Wing',
        lastUpdate: new Date(Date.now() - 90000).toISOString() // 1.5 minutes ago
      },
      performance: 87,
      currentTask: 'Scheduling interviews',
      taskProgress: 100
    },
    {
      id: 6,
      name: 'Frank Miller',
      department: 'Executive',
      position: 'Director',
      status: 'Active',
      location: {
        office: 'Main Office',
        area: 'Executive Floor',
        lastUpdate: new Date(Date.now() - 240000).toISOString() // 4 minutes ago
      },
      performance: 95
    },
    {
      id: 7,
      name: 'Grace Lee',
      department: 'Human Resources',
      position: 'HR Coordinator',
      status: 'Offline',
      location: {
        office: 'Main Office',
        area: 'Desk',
        lastUpdate: new Date(Date.now() - 600000).toISOString() // 10 minutes ago
      },
      performance: 88
    }
  ])
  
  const [selectedOffice, setSelectedOffice] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Get unique offices and departments
  const offices = Array.from(new Set(recruiters.map(recruiter => recruiter.location.office)))
  const departments = Array.from(new Set(recruiters.map(recruiter => recruiter.department)))

  // Filter recruiters based on selected office, department, and search term
  const filteredRecruiters = recruiters.filter(recruiter => {
    const officeMatch = selectedOffice === 'all' || recruiter.location.office === selectedOffice
    const departmentMatch = selectedDepartment === 'all' || recruiter.department === selectedDepartment
    const searchMatch = recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        recruiter.location.area.toLowerCase().includes(searchTerm.toLowerCase())
    return officeMatch && departmentMatch && searchMatch
  })

  // Group recruiters by office for visualization
  const recruitersByOffice: Record<string, Recruiter[]> = {}
  filteredRecruiters.forEach(recruiter => {
    if (!recruitersByOffice[recruiter.location.office]) {
      recruitersByOffice[recruiter.location.office] = []
    }
    recruitersByOffice[recruiter.location.office].push(recruiter)
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'Break':
        return 'bg-amber-100 text-amber-800'
      case 'Offline':
        return 'bg-slate-100 text-slate-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Technology':
        return 'bg-blue-100 text-blue-800'
      case 'Marketing':
        return 'bg-purple-100 text-purple-800'
      case 'Sales':
        return 'bg-amber-100 text-amber-800'
      case 'Human Resources':
        return 'bg-teal-100 text-teal-800'
      case 'Executive':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  // Simulate location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRecruiters(prevRecruiters => 
        prevRecruiters.map(recruiter => {
          // Randomly update some recruiter locations for demo purposes
          if (Math.random() > 0.7) {
            const offices = ['Main Office', 'Remote', 'Hybrid']
            const areas = ['South Wing', 'North Wing', 'Conference Room A', 'Conference Room B', 'Break Room', 'Desk', 'Executive Floor']
            return {
              ...recruiter,
              location: {
                ...recruiter.location,
                office: offices[Math.floor(Math.random() * offices.length)],
                area: areas[Math.floor(Math.random() * areas.length)],
                lastUpdate: new Date().toISOString()
              }
            }
          }
          return recruiter
        })
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Recruiter Activity Tracking</h2>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <div className="relative">
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
              placeholder="Search recruiters or areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
          >
            <option value="all">All Offices</option>
            {offices.map(office => (
              <option key={office} value={office}>{office}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Office Visualization */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Office Layout</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(recruitersByOffice).map(([office, officeRecruiters]) => (
            <div key={office} className="border border-slate-200 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-slate-800">{office}</h4>
                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-800 rounded-full">
                  {officeRecruiters.length} recruiters
                </span>
              </div>
              <div className="space-y-3">
                {officeRecruiters.map(recruiter => (
                  <div key={recruiter.id} className="flex items-center p-2 bg-slate-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white font-medium">
                        {recruiter.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-baseline">
                        <p className="text-sm font-medium text-slate-900 truncate">{recruiter.name}</p>
                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(recruiter.status)}`}>
                          {recruiter.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{recruiter.location.area}</p>
                      {recruiter.currentTask && (
                        <div className="mt-1">
                          <p className="text-xs text-slate-700 truncate">{recruiter.currentTask}</p>
                          {recruiter.taskProgress !== undefined && (
                            <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                              <div 
                                className="bg-teal-500 h-1 rounded-full" 
                                style={{ width: `${recruiter.taskProgress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recruiter List */}
      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Recruiter Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Recruiter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Current Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredRecruiters.map(recruiter => (
                <tr key={recruiter.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">
                        {recruiter.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{recruiter.name}</div>
                        <div className="text-sm text-slate-500">{recruiter.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getDepartmentColor(recruiter.department)}`}>
                      {recruiter.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{recruiter.location.office}</div>
                    <div className="text-sm text-slate-500">{recruiter.location.area}</div>
                    <div className="text-xs text-slate-400">
                      Updated: {new Date(recruiter.location.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(recruiter.status)}`}>
                      {recruiter.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {recruiter.currentTask ? (
                      <div>
                        <div className="text-sm text-slate-900">{recruiter.currentTask}</div>
                        {recruiter.taskProgress !== undefined && (
                          <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-teal-500 h-1.5 rounded-full" 
                              style={{ width: `${recruiter.taskProgress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500">No current task</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-slate-900">{recruiter.performance}%</div>
                      <div className="ml-2 w-16 bg-slate-200 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-teal-500 to-teal-600 h-1.5 rounded-full" 
                          style={{ width: `${recruiter.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* System Status */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-800 mb-2">Tracking System Status</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
            Active: {recruiters.filter(r => r.status === 'Active').length} recruiters
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
            On Break: {recruiters.filter(r => r.status === 'Break').length} recruiters
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800">
            Offline: {recruiters.filter(r => r.status === 'Offline').length} recruiters
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            Last Update: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default RecruiterActivityTracking