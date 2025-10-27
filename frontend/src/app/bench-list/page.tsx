'use client';

import React from 'react';
import BenchList from '../../components/BenchList'; // This will be the component I'll create
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function BenchListPage() {
  const { user } = useAuth();

  // If not authenticated, redirect to login
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Available Bench Resources</h1>
            <p className="mt-2 text-gray-600">Manage and track available resources on the bench</p>
          </div>
          <Link 
            href="/bench-list-upload" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Upload Bench Resources
          </Link>
        </div>
        <BenchList />
      </div>
    </div>
  );
}