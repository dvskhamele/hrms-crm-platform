'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function EnhancedApplications() {
  const [applications, setApplications] = useState<any[]>([])
  const [filteredApplications, setFilteredApplications] = useState<any[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [recruiters, setRecruiters] = useState<any[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [selectedRecruiter, setSelectedRecruiter] = useState('')
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewApplicationModal, setShowNewApplicationModal] = useState(false)
  const [showApplicationDetailModal, setShowApplicationDetailModal] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [newApplication, setNewApplication] = useState({
    candidateName: '',
    positionTitle: '',
    title: '',
    department: '',
    priority: 'MEDIUM',
    description: ''
  })
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN', id: 1 } as any)
    }

    fetchApplications()
    fetchRecruiters()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      // In a real implementation, this would call our new API
      // For prototype, we'll use mock data
      const mockApplications = [
        { 
          id: 1, 
          candidateName: 'John Doe', 
          positionTitle: 'Software Engineer', 
          title: 'Application Review', 
          department: 'Technology', 
          priority: 'MEDIUM', 
          status: 'REVIEWED',
          assignedTo: null,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          description: 'Candidate submitted resume and cover letter for Software Engineer position',
          comments: [
            {
              id: 1,
              comment: 'Noted, will review shortly',
              recruiterId: 2,
              recruiterName: 'Alice Johnson',
              timestamp: new Date(Date.now() - 1800000).toISOString()
            }
          ]
        },
        { 
          id: 2, 
          candidateName: 'Jane Smith', 
          positionTitle: 'Marketing Manager', 
          title: 'Interview Scheduling', 
          department: 'Marketing', 
          priority: 'HIGH', 
          status: 'SCHEDULED',
          assignedTo: 3,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          description: 'Candidate scheduled for first round interview',
          comments: []
        },
        { 
          id: 3, 
          candidateName: 'Robert Johnson', 
          positionTitle: 'Sales Associate', 
          title: 'Background Check', 
          department: 'Sales', 
          priority: 'URGENT', 
          status: 'PENDING',
          assignedTo: null,
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          description: 'Background check required for candidate',
          comments: []
        },
        { 
          id: 4, 
          candidateName: 'Emily Wilson', 
          positionTitle: 'Product Designer', 
          title: 'Technical Assessment', 
          department: 'Technology', 
          priority: 'LOW', 
          status: 'COMPLETED',
          assignedTo: 4,
          createdAt: new Date(Date.now() - 14400000).toISOString(),
          description: 'Technical assessment completed successfully',
          comments: [
            {
              id: 1,
              comment: 'Assessment submitted',
              recruiterId: 4,
              recruiterName: 'Mike Thompson',
              timestamp: new Date(Date.now() - 12600000).toISOString()
            },
            {
              id: 2,
              comment: 'Passed with high scores',
              recruiterId: 4,
              recruiterName: 'Mike Thompson',
              timestamp: new Date(Date.now() - 12000000).toISOString()
            }
          ]
        },
        { 
          id: 5, 
          candidateName: 'Michael Brown', 
          positionTitle: 'HR Director', 
          title: 'Reference Check', 
          department: 'Human Resources', 
          priority: 'URGENT', 
          status: 'IN_PROGRESS',
          assignedTo: 5,
          createdAt: new Date(Date.now() - 18000000).toISOString(),
          description: 'Contacting references for candidate',
          comments: [
            {
              id: 1,
              comment: 'Reference contacted',
              recruiterId: 5,
              recruiterName: 'David Wilson',
              timestamp: new Date(Date.now() - 16200000).toISOString()
            }
          ]
        }
      ]
      
      setApplications(mockApplications)
      setFilteredApplications(mockApplications)
      
      // Get unique departments
      const uniqueDepartments = Array.from(new Set(mockApplications.map((a: any) => a.department)))
      setDepartments(uniqueDepartments)
      
      setError('')
    } catch (err) {
      console.error('Error fetching applications:', err)
      setError('Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  const fetchRecruiters = async () => {
    // Mock recruiters data
    const mockRecruiters = [
      { id: 1, name: 'Admin User', department: 'Management' },
      { id: 2, name: 'Alice Johnson', department: 'Technology' },
      { id: 3, name: 'Bob Smith', department: 'Marketing' },
      { id: 4, name: 'Mike Thompson', department: 'Technology' },
      { id: 5, name: 'David Wilson', department: 'Human Resources' }
    ]
    
    setRecruiters(mockRecruiters)
  }

  useEffect(() => {
    // Filter applications based on selected filters and search term
    let result = applications
    
    if (selectedDepartment) {
      result = result.filter(application => application.department === selectedDepartment)
    }
    
    if (selectedStatus) {
      result = result.filter(application => application.status === selectedStatus)
    }
    
    if (selectedPriority) {
      result = result.filter(application => application.priority === selectedPriority)
    }
    
    if (selectedRecruiter) {
      result = result.filter(application => 
        application.assignedTo === parseInt(selectedRecruiter) || 
        application.comments?.some((c: any) => c.recruiterId === parseInt(selectedRecruiter))
      )
    }
    
    if (searchTerm) {
      result = result.filter(application => 
        application.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        application.positionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredApplications(result)
  }, [applications, selectedDepartment, selectedStatus, selectedPriority, selectedRecruiter, searchTerm])

  const updateApplicationStatus = async (applicationId: number, newStatus: string) => {
    try {
      // In a real implementation, this would call our new API
      // For prototype, we'll update local state
      setApplications(applications.map(application => 
        application.id === applicationId ? { ...application, status: newStatus, updatedAt: new Date().toISOString() } : application
      ))
      
      // If we're viewing the application details, update that too
      if (selectedApplication && selectedApplication.id === applicationId) {
        setSelectedApplication({ ...selectedApplication, status: newStatus, updatedAt: new Date().toISOString() })
      }
      
      // Show success message
      setError('Application status updated successfully')
      setTimeout(() => setError(''), 3000)
    } catch (error) {
      console.error('Error updating application status:', error)
      setError('Failed to update application status')
    }
  }

  const assignApplicationToRecruiter = async (applicationId: number, recruiterId: number) => {
    try {
      // In a real implementation, this would call our new API
      // For prototype, we'll update local state
      setApplications(applications.map(application => 
        application.id === applicationId ? { ...application, assignedTo: recruiterId } : application
      ))
      
      // If we're viewing the application details, update that too
      if (selectedApplication && selectedApplication.id === applicationId) {
        const assignedRecruiter = recruiters.find(r => r.id === recruiterId)
        setSelectedApplication({ 
          ...selectedApplication, 
          assignedTo: recruiterId,
          assignedToName: assignedRecruiter ? assignedRecruiter.name : 'Unknown Recruiter'
        })
      }
      
      // Show success message
      setError('Application assigned successfully')
      setTimeout(() => setError(''), 3000)
    } catch (error) {
      console.error('Error assigning application:', error)
      setError('Failed to assign application')
    }
  }

  const addCommentToApplication = async (applicationId: number) => {
    try {
      if (!newComment.trim()) return
      
      // In a real implementation, this would call our new API
      // For prototype, we'll update local state
      const comment = {
        id: Date.now(), // Simple ID for prototype
        comment: newComment,
        recruiterId: user.id,
        recruiterName: user.name,
        timestamp: new Date().toISOString()
      }
      
      setApplications(applications.map(application => {
        if (application.id === applicationId) {
          const updatedComments = application.comments ? [...application.comments, comment] : [comment]
          return { ...application, comments: updatedComments }
        }
        return application
      }))
      
      // If we're viewing the application details, update that too
      if (selectedApplication && selectedApplication.id === applicationId) {
        const updatedComments = selectedApplication.comments ? [...selectedApplication.comments, comment] : [comment]
        setSelectedApplication({ ...selectedApplication, comments: updatedComments })
      }
      
      // Clear comment input
      setNewComment('')
      
      // Show success message
      setError('Comment added successfully')
      setTimeout(() => setError(''), 3000)
    } catch (error) {
      console.error('Error adding comment:', error)
      setError('Failed to add comment')
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'REVIEWED':
        return 'bg-indigo-100 text-indigo-800'
      case 'SCHEDULED':
        return 'bg-purple-100 text-purple-800'
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800'
      case 'HIRED':
        return 'bg-teal-100 text-teal-800'
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-gray-100 text-gray-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      case 'URGENT':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddApplication = () => {
    const newId = applications.length > 0 ? Math.max(...applications.map(a => a.id)) + 1 : 1
    const applicationToAdd = {
      ...newApplication,
      id: newId,
      status: 'PENDING',
      assignedTo: null,
      createdAt: new Date().toISOString(),
      comments: []
    }
    
    setApplications([...applications, applicationToAdd])
    setFilteredApplications([...filteredApplications, applicationToAdd])
    
    // Reset form and close modal
    setNewApplication({
      candidateName: '',
      positionTitle: '',
      title: '',
      department: '',
      priority: 'MEDIUM',
      description: ''
    })
    setShowNewApplicationModal(false)
    
    // Show success message
    setError('Application created successfully')
    setTimeout(() => setError(''), 3000)
  }

  const openApplicationDetail = (application: any) => {
    setSelectedApplication(application)
    setShowApplicationDetailModal(true)
  }

  const closeApplicationDetail = () => {
    setShowApplicationDetailModal(false)
    setSelectedApplication(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Enhanced Applications Management</h2>
            <p className="text-slate-600">Manage job applications with advanced features</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowNewApplicationModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Application
          </button>
        </div>

        {error && (
          <div className={`p-4 rounded-lg mb-6 ${error.includes('Failed') ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {error}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-600">{applications.filter(r => r.status === 'PENDING').length}</p>
            <p className="text-sm text-slate-600">Pending</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">{applications.filter(r => r.status === 'IN_PROGRESS').length}</p>
            <p className="text-sm text-slate-600">In Progress</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-600">{applications.filter(r => r.status === 'COMPLETED').length}</p>
            <p className="text-sm text-slate-600">Completed</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{applications.filter(r => r.priority === 'URGENT').length}</p>
            <p className="text-sm text-rose-600">Urgent</p>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                placeholder="Candidate, position, or application"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="departmentFilter" className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <select
                id="departmentFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((dept: string) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                id="statusFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="HIRED">Hired</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <div>
              <label htmlFor="priorityFilter" className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <select
                id="priorityFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="">All Priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
            <div>
              <label htmlFor="recruiterFilter" className="block text-sm font-medium text-slate-700 mb-1">Recruiter</label>
              <select
                id="recruiterFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedRecruiter}
                onChange={(e) => setSelectedRecruiter(e.target.value)}
              >
                <option value="">All Recruiters</option>
                {recruiters.map((r: any) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              className="bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
              onClick={() => {
                setSelectedDepartment('')
                setSelectedStatus('')
                setSelectedPriority('')
                setSelectedRecruiter('')
                setSearchTerm('')
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate & Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Application</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredApplications.map((application: any) => (
                  <tr key={application.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-medium">{application.candidateName.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{application.candidateName}</div>
                          <div className="text-sm text-slate-500">{application.positionTitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">{application.title}</div>
                      <div className="text-sm text-slate-500">{application.description}</div>
                      {application.comments && application.comments.length > 0 && (
                        <div className="mt-1 text-xs text-slate-400">
                          {application.comments.length} comment{application.comments.length !== 1 ? 's' : ''}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {application.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(application.priority)}`}>
                        {application.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {application.assignedTo ? 
                        (recruiters.find(r => r.id === application.assignedTo)?.name || 'Unknown Recruiter') : 
                        'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openApplicationDetail(application)}
                          className="text-teal-600 hover:text-teal-900"
                        >
                          View
                        </button>
                        <select
                          className="px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
                          value={application.status}
                          onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="REVIEWED">Reviewed</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="SCHEDULED">Scheduled</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="HIRED">Hired</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* New Application Modal */}
      {showNewApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Create New Application</h3>
              <button 
                onClick={() => setShowNewApplicationModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Candidate Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Candidate name"
                      value={newApplication.candidateName}
                      onChange={(e) => setNewApplication({...newApplication, candidateName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Position title"
                      value={newApplication.positionTitle}
                      onChange={(e) => setNewApplication({...newApplication, positionTitle: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Application Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="What is this application for?"
                    value={newApplication.title}
                    onChange={(e) => setNewApplication({...newApplication, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newApplication.department}
                    onChange={(e) => setNewApplication({...newApplication, department: e.target.value})}
                  >
                    <option value="">Select department</option>
                    {departments.map((dept: string) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newApplication.priority}
                    onChange={(e) => setNewApplication({...newApplication, priority: e.target.value})}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Detailed description of the application"
                    rows={3}
                    value={newApplication.description}
                    onChange={(e) => setNewApplication({...newApplication, description: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowNewApplicationModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddApplication}
              >
                Create Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {showApplicationDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Application Details</h3>
              <button 
                onClick={closeApplicationDetail}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-semibold text-slate-800 mb-2">Application Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Candidate:</span>
                      <span className="text-sm font-medium">{selectedApplication.candidateName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Position:</span>
                      <span className="text-sm font-medium">{selectedApplication.positionTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Department:</span>
                      <span className="text-sm font-medium">{selectedApplication.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Priority:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(selectedApplication.priority)}`}>
                        {selectedApplication.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(selectedApplication.status)}`}>
                        {selectedApplication.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Assigned To:</span>
                      <span className="text-sm font-medium">
                        {selectedApplication.assignedTo ? 
                          (recruiters.find(r => r.id === selectedApplication.assignedTo)?.name || 'Unknown Recruiter') : 
                          'Unassigned'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Created:</span>
                      <span className="text-sm font-medium">
                        {new Date(selectedApplication.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-slate-800 mb-2">Actions</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Update Status</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                        value={selectedApplication.status}
                        onChange={(e) => updateApplicationStatus(selectedApplication.id, e.target.value)}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="REVIEWED">Reviewed</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="HIRED">Hired</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Assign To Recruiter</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                        value={selectedApplication.assignedTo || ''}
                        onChange={(e) => assignApplicationToRecruiter(selectedApplication.id, parseInt(e.target.value))}
                      >
                        <option value="">Unassigned</option>
                        {recruiters
                          .filter(r => r.department === selectedApplication.department)
                          .map((r: any) => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-semibold text-slate-800 mb-2">Description</h4>
                <p className="text-sm text-slate-600">{selectedApplication.description}</p>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-semibold text-slate-800 mb-2">Comments</h4>
                <div className="space-y-4">
                  {selectedApplication.comments && selectedApplication.comments.length > 0 ? (
                    selectedApplication.comments.map((comment: any) => (
                      <div key={comment.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div className="font-medium text-slate-800">{comment.recruiterName}</div>
                          <div className="text-xs text-slate-500">
                            {new Date(comment.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{comment.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No comments yet</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Add Comment</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                      onClick={() => addCommentToApplication(selectedApplication.id)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}