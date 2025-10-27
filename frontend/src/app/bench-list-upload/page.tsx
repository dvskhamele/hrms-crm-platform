// app/bench-list-upload/page.tsx
'use client';

import React from 'react';
import BenchList from '../../components/BenchList';
import BenchListUploadForm from '../../components/BenchListUploadForm';
import BenchListCSVUpload from '../../components/BenchListCSVUpload';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const BenchListUploadPage: React.FC = () => {
  const { user } = useAuth();

  // If not authenticated, redirect to login
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold">Bench Resources Management</h1>
          <p className="text-lg mt-2">Upload and view bench resources</p>
        </header>

        <div className="mb-12">
          <BenchListUploadForm />
        </div>

        <div className="mb-12">
          <BenchListCSVUpload />
        </div>

        <div className="mt-12">
          <BenchList />
        </div>
      </div>
    </div>
  );
};

export default BenchListUploadPage;