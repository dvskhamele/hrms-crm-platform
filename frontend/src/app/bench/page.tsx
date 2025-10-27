'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import apiService from '@/utils/apiService';
import Link from 'next/link';

// Define the type for a bench resource
interface BenchResource {
  id: string;
  name: string;
  skill: string;
  experience: number; // Assuming experience is in years
  status?: string;
  department?: string;
  lastUpdated?: string;
}

const BenchPage: React.FC = () => {
  const { user } = useAuth();
  const [benchResources, setBenchResources] = useState<BenchResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBenchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For this page, we'll create mock data since the API service doesn't have bench-specific methods
      // In real implementation, you would call the appropriate API endpoint
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      
      const mockBenchData: BenchResource[] = [
        { id: '1', name: 'John Smith', skill: 'React, Node.js', experience: 5, status: 'Available', department: 'Technology', lastUpdated: '2025-10-26' },
        { id: '2', name: 'Jane Doe', skill: 'Python, Django', experience: 4, status: 'Available', department: 'Technology', lastUpdated: '2025-10-25' },
        { id: '3', name: 'Robert Johnson', skill: 'Java, Spring', experience: 7, status: 'In Training', department: 'Technology', lastUpdated: '2025-10-24' },
        { id: '4', name: 'Emily Davis', skill: 'React Native', experience: 3, status: 'Available', department: 'Mobile', lastUpdated: '2025-10-23' },
        { id: '5', name: 'Michael Wilson', skill: 'DevOps, AWS', experience: 6, status: 'On Project', department: 'Technology', lastUpdated: '2025-10-22' },
      ];
      
      setBenchResources(mockBenchData);
    } catch (err) {
      console.error('Error fetching bench resources:', err);
      setError('Failed to load bench resources. Running in demo mode with mock data.');
      
      // Still show mock data even if there was an error
      const mockBenchData: BenchResource[] = [
        { id: '1', name: 'John Smith', skill: 'React, Node.js', experience: 5, status: 'Available', department: 'Technology', lastUpdated: '2025-10-26' },
        { id: '2', name: 'Jane Doe', skill: 'Python, Django', experience: 4, status: 'Available', department: 'Technology', lastUpdated: '2025-10-25' },
      ];
      
      setBenchResources(mockBenchData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBenchResources();
  }, []);

  const handleRefresh = () => {
    fetchBenchResources();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to view bench resources</p>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="mt-4 text-gray-700">Loading bench resources...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bench Resources</h1>
            <p className="mt-2 text-gray-600">Manage available resources on the bench</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Refresh
            </button>
            <Link 
              href="/bench/upload" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Upload Resources
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
            <strong className="font-bold">Demo Mode! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {benchResources.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No bench resources found</h3>
              <p className="text-gray-500">Get started by uploading some bench resources.</p>
              <div className="mt-6">
                <Link 
                  href="/bench/upload" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Upload Resources
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {benchResources.map((resource) => (
                    <tr key={resource.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{resource.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{resource.skill}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{resource.experience} years</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${resource.status === 'Available' ? 'bg-green-100 text-green-800' : 
                            resource.status === 'In Training' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}
                        >
                          {resource.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resource.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resource.lastUpdated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Bench Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Resources</span>
                <span className="font-medium">{benchResources.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-green-600">
                  {benchResources.filter(r => r.status === 'Available').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">In Training</span>
                <span className="font-medium text-yellow-600">
                  {benchResources.filter(r => r.status === 'In Training').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Skills</h3>
            <ul className="space-y-2">
              {['React', 'Node.js', 'Python', 'Java', 'AWS'].map((skill, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{skill}</span>
                  <span className="font-medium">{Math.floor(Math.random() * 5) + 1}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Link 
                href="/bench/upload" 
                className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
              >
                Upload New Resources
              </Link>
              <Link 
                href="/bench/export" 
                className="block px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-center"
              >
                Export Data
              </Link>
              <button 
                onClick={handleRefresh}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchPage;