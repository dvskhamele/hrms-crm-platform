// components/BenchList.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

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

const BenchList: React.FC = () => {
  const [benchResources, setBenchResources] = useState<BenchResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchBenchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In demo/prototype mode, return mock data
      // In real implementation, this would call the API
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="ml-3 text-gray-700">Loading bench resources...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Demo Mode! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Available Bench Resources</h2>
        <button 
          onClick={handleRefresh}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Refresh
        </button>
      </div>
      {benchResources.length === 0 ? (
        <p className="text-gray-600">No bench resources found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skill
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience (Years)
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
                <tr key={resource.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {resource.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {resource.skill}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {resource.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
  );
};

export default BenchList;