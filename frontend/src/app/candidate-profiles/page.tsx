'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { 
  executeAction, 
  getDashboardData,
  ActionType, 
  ActionPayload 
} from '../../utils/actionAutomation';
import { toast } from 'react-toastify';

export default function CandidateProfiles() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [benchCandidates, setBenchCandidates] = useState<number[]>([])
  const [notification, setNotification] = useState<{message: string, type: string} | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }
    
    // Load bench candidates from localStorage if available
    const storedBenchCandidates = localStorage.getItem('benchCandidates')
    if (storedBenchCandidates) {
      try {
        setBenchCandidates(JSON.parse(storedBenchCandidates))
      } catch (e) {
        console.error('Error parsing bench candidates from localStorage', e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  
  const handleAction = async (actionType: ActionType, payload: ActionPayload) => {
    setIsProcessing(true);
    try {
      const result = await executeAction(actionType, payload);
      
      if (result.success) {
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
  }

  const handleAddToBench = (candidateId: number, candidateName: string) => {
    // Check if candidate is already in bench
    if (benchCandidates.includes(candidateId)) {
      setNotification({message: `${candidateName} is already in the bench`, type: 'info'})
      return
    }
    
    // Add candidate to bench
    const updatedBench = [...benchCandidates, candidateId]
    setBenchCandidates(updatedBench)
    localStorage.setItem('benchCandidates', JSON.stringify(updatedBench))
    setNotification({message: `${candidateName} added to bench successfully!`, type: 'success'})
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleRemoveFromBench = (candidateId: number, candidateName: string) => {
    // Remove candidate from bench
    const updatedBench = benchCandidates.filter(id => id !== candidateId)
    setBenchCandidates(updatedBench)
    localStorage.setItem('benchCandidates', JSON.stringify(updatedBench))
    setNotification({message: `${candidateName} removed from bench`, type: 'success'})
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const isInBench = (candidateId: number) => {
    return benchCandidates.includes(candidateId)
  }

  // Mock candidate data
  const candidates = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+1 (555) 123-4567',
      position: 'Software Engineer',
      department: 'Technology',
      status: 'In Review',
      appliedDate: '2023-09-15',
      lastInteraction: '2023-09-18',
      source: 'LinkedIn',
      rating: 4.5,
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: '5 years',
      education: 'BS Computer Science',
      location: 'San Francisco, CA',
      salaryExpectation: '$120,000 - $140,000',
      availability: 'Immediate',
      notes: 'Strong technical background with excellent problem-solving skills.'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '+1 (555) 987-6543',
      position: 'Marketing Manager',
      department: 'Marketing',
      status: 'Interview Scheduled',
      appliedDate: '2023-09-12',
      lastInteraction: '2023-09-17',
      source: 'Indeed',
      rating: 4.2,
      skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
      experience: '7 years',
      education: 'MBA Marketing',
      location: 'New York, NY',
      salaryExpectation: '$100,000 - $120,000',
      availability: '2 weeks notice',
      notes: 'Creative marketer with proven ROI improvement.'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robertj@example.com',
      phone: '+1 (555) 456-7890',
      position: 'Sales Associate',
      department: 'Sales',
      status: 'Offer Extended',
      appliedDate: '2023-09-10',
      lastInteraction: '2023-09-16',
      source: 'Company Website',
      rating: 4.8,
      skills: ['Relationship Building', 'Negotiation', 'CRM'],
      experience: '4 years',
      education: 'BA Business',
      location: 'Chicago, IL',
      salaryExpectation: '$80,000 - $100,000',
      availability: 'Immediate',
      notes: 'Top sales performer with extensive client portfolio.'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Review':
        return 'bg-amber-100 text-amber-800'
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'Offer Extended':
        return 'bg-emerald-100 text-emerald-800'
      case 'Hired':
        return 'bg-teal-100 text-teal-800'
      case 'Rejected':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    
    return <div className="flex">{stars}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Candidate Profiles</h2>
            <p className="text-slate-600">Manage and review candidate applications</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
              <option>All Positions</option>
              <option>Software Engineer</option>
              <option>Marketing Manager</option>
              <option>Sales Associate</option>
            </select>
            <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white">
              <option>All Statuses</option>
              <option>In Review</option>
              <option>Interview Scheduled</option>
              <option>Offer Extended</option>
              <option>Hired</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-600">24</p>
            <p className="text-sm text-slate-600">In Review</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">18</p>
            <p className="text-sm text-slate-600">Interviews</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-600">12</p>
            <p className="text-sm text-slate-600">Offers</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-teal-500">
            <p className="text-2xl font-bold text-teal-600">8</p>
            <p className="text-sm text-slate-600">Hired</p>
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {candidates.map(candidate => (
            <div key={candidate.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                    {candidate.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-800">{candidate.name}</h3>
                    <p className="text-sm text-slate-600">{candidate.position}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                  {candidate.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Applied</p>
                  <p className="text-sm font-medium text-slate-800">{new Date(candidate.appliedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Department</p>
                  <p className="text-sm font-medium text-slate-800">{candidate.department}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Experience</p>
                  <p className="text-sm font-medium text-slate-800">{candidate.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Rating</p>
                  <div className="flex items-center">
                    {getRatingStars(candidate.rating)}
                    <span className="ml-1 text-xs text-slate-600">{candidate.rating}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-sm font-medium text-slate-800 mb-2">Skills</h5>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      +{candidate.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-4">
                <h5 className="text-sm font-medium text-slate-800 mb-2">Details</h5>
                <p className="text-sm text-slate-600">{candidate.notes}</p>
              </div>

              <div className="mt-6 flex justify-between">
                <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                  View Profile
                </button>
                <div className="flex space-x-2">
                  {isInBench(candidate.id) ? (
                    <button 
                      onClick={() => handleRemoveFromBench(candidate.id, candidate.name)}
                      className="text-sm bg-rose-500 text-white px-3 py-1 rounded-lg hover:bg-rose-600 transition duration-300 disabled:opacity-50"
                      disabled={isProcessing}
                    >
                      Remove from Bench
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        handleAddToBench(candidate.id, candidate.name);
                        // Update bench count in stats
                        toast.info(`${candidate.name} added to bench`);
                      }}
                      className="text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 disabled:opacity-50"
                      disabled={isProcessing}
                    >
                      Add to Bench
                    </button>
                  )}
                  <div className="relative group">
                    <button className="text-sm bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 disabled:opacity-50"
                      disabled={isProcessing}>
                      Actions
                    </button>
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-10 border border-slate-200">
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                        onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                          candidateId: candidate.id, 
                          applicationId: candidate.id, 
                          recruiterId: 1 // Placeholder for actual recruiter
                        })}
                        disabled={isProcessing}
                      >
                        Mark Screened
                      </button>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                        onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                          candidateId: candidate.id, 
                          applicationId: candidate.id, 
                          stage: 'REVIEWED' 
                        })}
                        disabled={isProcessing}
                      >
                        Move to Review
                      </button>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                        onClick={() => handleAction('SCHEDULE_INTERVIEW', { 
                          applicationId: candidate.id,
                          interviewDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
                        })}
                        disabled={isProcessing}
                      >
                        Schedule Interview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Candidate Table */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6 card">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">All Candidates</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applied Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {candidates.map(candidate => (
                  <tr key={candidate.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">
                          {candidate.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{candidate.name}</div>
                          <div className="text-sm text-slate-500">{candidate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{candidate.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                        {candidate.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {new Date(candidate.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRatingStars(candidate.rating)}
                        <span className="ml-1 text-sm text-slate-600">{candidate.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-teal-600 hover:text-teal-900 mr-3">
                        View
                      </button>
                      {isInBench(candidate.id) ? (
                        <button 
                          onClick={() => handleRemoveFromBench(candidate.id, candidate.name)}
                          className="text-rose-600 hover:text-rose-900 mr-3 disabled:opacity-50"
                          disabled={isProcessing}
                        >
                          Remove
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            handleAddToBench(candidate.id, candidate.name);
                            toast.info(`${candidate.name} added to bench`);
                          }}
                          className="text-purple-600 hover:text-purple-900 mr-3 disabled:opacity-50"
                          disabled={isProcessing}
                        >
                          Add
                        </button>
                      )}
                      <div className="relative group inline-block">
                        <button className="text-amber-600 hover:text-amber-900 disabled:opacity-50"
                          disabled={isProcessing}>
                          Actions
                        </button>
                        <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-10 border border-slate-200">
                          <button 
                            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                            onClick={() => handleAction('MARK_CANDIDATE_SCREENED', { 
                              candidateId: candidate.id, 
                              applicationId: candidate.id, 
                              recruiterId: 1 
                            })}
                            disabled={isProcessing}
                          >
                            Mark Screened
                          </button>
                          <button 
                            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                            onClick={() => handleAction('MOVE_CANDIDATE_STAGE', { 
                              candidateId: candidate.id, 
                              applicationId: candidate.id, 
                              stage: 'REVIEWED' 
                            })}
                            disabled={isProcessing}
                          >
                            Move to Review
                          </button>
                          <button 
                            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                            onClick={() => handleAction('SCHEDULE_INTERVIEW', { 
                              applicationId: candidate.id,
                              interviewDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
                            })}
                            disabled={isProcessing}
                          >
                            Schedule
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn ${
            notification.type === 'success' ? 'bg-teal-500 text-white' : 
            notification.type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
          }`}>
            {notification.message}
          </div>
        )}
      </main>
    </div>
  )
}