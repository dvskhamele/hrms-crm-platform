// components/BenchListCSVUpload.tsx
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const BenchListCSVUpload: React.FC = () => {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is CSV
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setMessage({ type: 'error', text: 'Please upload a CSV file.' });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');
      
      // Parse CSV (assuming header is: name,skill,experience)
      const headers = lines[0].split(',').map(header => header.trim());
      const requiredHeaders = ['name', 'skill', 'experience'];
      
      if (!requiredHeaders.every(header => headers.includes(header))) {
        setMessage({ type: 'error', text: 'CSV must contain headers: name, skill, experience' });
        setIsUploading(false);
        return;
      }

      const benchResources = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length >= 3) {
          benchResources.push({
            name: values[0].trim(),
            skill: values[1].trim(),
            experience: parseInt(values[2].trim()) || 0
          });
        }
      }

      if (benchResources.length === 0) {
        setMessage({ type: 'error', text: 'No valid bench resources found in CSV.' });
        setIsUploading(false);
        return;
      }

      // In demo mode, just simulate the upload
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // In real implementation, this would call the API
      // const response = await fetch('/api/bench-list/upload', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ benchResources }),
      // });

      // const data = await response.json();

      // if (response.ok) {
        setMessage({ type: 'success', text: `${benchResources.length} bench resources uploaded successfully in demo mode!` });
        // Reset file input
        e.target.value = '';
      // } else {
      //   setMessage({ type: 'error', text: data.error || 'An error occurred. Please try again.' });
      // }
    } catch (error) {
      console.error('Error processing CSV:', error);
      setMessage({ type: 'error', text: 'Demo mode: Error processing CSV file. In a real app, this would connect to an API.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Bench Resources from CSV</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload CSV File
        </label>
        <div className="flex items-center">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 000-6h-.025A5.56 5.56 0 0016 6.5 5.5 5.5 0 005.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 000 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">CSV file (name, skill, experience)</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".csv,text/csv" 
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>
      {message && (
        <div
          className={`mt-4 p-3 rounded-md ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium">CSV Format:</p>
        <p className="font-mono bg-gray-100 p-1 rounded">name,skill,experience</p>
        <p className="font-mono bg-gray-100 p-1 rounded">John Doe,React,5</p>
        <p className="font-mono bg-gray-100 p-1 rounded">Jane Smith,Node.js,3</p>
      </div>
    </div>
  );
};

export default BenchListCSVUpload;