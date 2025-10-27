import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

// Define the type for a bench resource
interface BenchResource {
  name: string;
  skill: string;
  experience: number;
}

const BenchUploadPage: React.FC = () => {
  const { user } = useAuth();
  const [benchResources, setBenchResources] = useState<BenchResource[]>([
    { name: '', skill: '', experience: 0 }
  ]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to upload bench resources</p>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (index: number, field: keyof BenchResource, value: string) => {
    const updatedResources = [...benchResources];
    if (field === 'experience') {
      updatedResources[index][field] = parseInt(value) || 0;
    } else {
      updatedResources[index][field] = value;
    }
    setBenchResources(updatedResources);
  };

  const handleAddResource = () => {
    setBenchResources([...benchResources, { name: '', skill: '', experience: 0 }]);
  };

  const handleRemoveResource = (index: number) => {
    if (benchResources.length > 1) {
      const updatedResources = [...benchResources];
      updatedResources.splice(index, 1);
      setBenchResources(updatedResources);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setMessage(null);

    // Filter out empty rows
    const validResources = benchResources.filter(
      resource => resource.name.trim() !== '' && resource.skill.trim() !== ''
    );

    if (validResources.length === 0) {
      setMessage({ type: 'error', text: 'Please add at least one valid bench resource.' });
      setIsUploading(false);
      return;
    }

    try {
      // In demo mode, we'll just simulate the upload process
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // In the real app, this would call the backend API
      // const response = await fetch('/api/bench-list/upload', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ benchResources: validResources }),
      // });
      // 
      // const data = await response.json();
      // 
      // if (response.ok) {
      //   setMessage({ type: 'success', text: data.message || 'Bench resources uploaded successfully!' });
      //   // Reset form
      //   setBenchResources([{ name: '', skill: '', experience: 0 }]);
      // } else {
      //   setMessage({ type: 'error', text: data.error || 'An error occurred. Please try again.' });
      // }

      // For demo mode, just show success message
      setMessage({ type: 'success', text: `${validResources.length} bench resources processed in demo mode!` });
      // Reset form
      setBenchResources([{ name: '', skill: '', experience: 0 }]);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ type: 'error', text: 'Demo mode: Network error simulation. In a real app, this would connect to an API.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upload Bench Resources</h1>
            <p className="mt-2 text-gray-600">Add new resources to the bench</p>
          </div>
          <Link 
            href="/bench" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Back to Bench
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Manual Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {benchResources.map((resource, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-b border-gray-200 pb-4">
                  <div className="md:col-span-4">
                    <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id={`name-${index}`}
                      value={resource.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Resource name"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <label htmlFor={`skill-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Skill *
                    </label>
                    <input
                      type="text"
                      id={`skill-${index}`}
                      value={resource.skill}
                      onChange={(e) => handleInputChange(index, 'skill', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Skill"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor={`experience-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      id={`experience-${index}`}
                      value={resource.experience}
                      onChange={(e) => handleInputChange(index, 'experience', e.target.value)}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-1">
                    {benchResources.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveResource(index)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleAddResource}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Add Resource
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`px-4 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isUploading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  }`}
                >
                  {isUploading ? 'Processing...' : 'Upload Bench Resources'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">CSV Upload</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Upload a CSV file</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload bench resources in CSV format with columns: name, skill, experience
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    // In a real app, this would trigger a file upload dialog
                    alert('CSV upload would be implemented in the full application. This is a demo feature.');
                  }}
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Upload CSV
                </button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">CSV Format:</p>
              <p className="font-mono bg-gray-100 p-2 rounded">name,skill,experience</p>
              <p className="font-mono bg-gray-100 p-2 rounded">John Doe,React,5</p>
              <p className="font-mono bg-gray-100 p-2 rounded">Jane Smith,Node.js,3</p>
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`mt-6 p-4 rounded-md ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">Demo Mode Active</h3>
              <div className="mt-2 text-sm">
                <p>This interface works in demo mode without a backend. When connected to a real backend, data would be persisted to a database.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchUploadPage;