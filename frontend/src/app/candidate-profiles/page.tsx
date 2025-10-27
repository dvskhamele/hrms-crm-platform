// /Users/test/startups/hrmscrm/frontend/src/app/candidate-profiles/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '@/utils/apiService';

const CandidateProfilesPage = () => {
  // Define the candidate type
  type Candidate = {
    id: number;
    name: string;
    email: string;
    phone: string;
    positionApplied: string;
    status: string;
    appliedDate: string;
    experience: string;
    skills: string[];
    resumeUrl: string;
    profileMatch: number;
  };

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  // apiService is already a singleton instance from the import

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      // Using mock data as backend is not deployed
      const mockCandidates = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '+1 (555) 123-4567',
          positionApplied: 'Senior Software Engineer',
          status: 'Interview Scheduled',
          appliedDate: '2023-06-15',
          experience: '5 years',
          skills: ['JavaScript', 'React', 'Node.js'],
          resumeUrl: '#',
          profileMatch: 95
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          phone: '+1 (555) 987-6543',
          positionApplied: 'Product Manager',
          status: 'Technical Interview',
          appliedDate: '2023-06-18',
          experience: '7 years',
          skills: ['Product Strategy', 'Agile', 'Analytics'],
          resumeUrl: '#',
          profileMatch: 88
        },
        {
          id: 3,
          name: 'Michael Chen',
          email: 'michael.c@example.com',
          phone: '+1 (555) 456-7890',
          positionApplied: 'UX Designer',
          status: 'Offer Extended',
          appliedDate: '2023-06-20',
          experience: '4 years',
          skills: ['Figma', 'User Research', 'Prototyping'],
          resumeUrl: '#',
          profileMatch: 92
        },
        {
          id: 4,
          name: 'Emily Rodriguez',
          email: 'emily.r@example.com',
          phone: '+1 (555) 234-5678',
          positionApplied: 'Data Scientist',
          status: 'In Review',
          appliedDate: '2023-06-22',
          experience: '6 years',
          skills: ['Python', 'Machine Learning', 'SQL'],
          resumeUrl: '#',
          profileMatch: 85
        }
      ];
      
      setCandidates(mockCandidates);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setLoading(false);
    }
  };

  const filteredCandidates = candidates.filter((candidate: Candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.positionApplied.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Candidate Profiles</h1>
          <p className="mt-2 text-gray-600">Manage and review all candidate applications</p>
        </div>

        <div className="bg-white shadow rounded-lg">
          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search candidates by name, email, or position..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Statuses</option>
                  <option>Applied</option>
                  <option>In Review</option>
                  <option>Interview Scheduled</option>
                  <option>Technical Interview</option>
                  <option>Offer Extended</option>
                  <option>Hired</option>
                </select>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200">
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Match</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-teal-800 font-medium">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-500">{candidate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{candidate.positionApplied}</div>
                      <div className="text-sm text-gray-500">{candidate.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        candidate.status === 'Hired' ? 'bg-green-100 text-green-800' :
                        candidate.status === 'Offer Extended' ? 'bg-blue-100 text-blue-800' :
                        candidate.status === 'Interview Scheduled' || candidate.status === 'Technical Interview' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(candidate.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate.experience}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-teal-600 h-2 rounded-full" 
                            style={{ width: `${candidate.profileMatch}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{candidate.profileMatch}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Contact</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCandidates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No candidates found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilesPage;