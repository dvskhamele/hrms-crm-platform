'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PurchaseRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the purchase page after a short delay
    const timer = setTimeout(() => {
      window.location.href = 'https://readylaunch.signimus.com';
    }, 2000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  const handleRedirectNow = () => {
    window.location.href = 'https://readylaunch.signimus.com';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-1"></div>
        
        <div className="p-8 sm:p-12 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <h1 className="mt-6 text-3xl font-bold text-slate-800">Redirecting to Purchase Portal</h1>
          <p className="mt-2 text-slate-600">
            You'll be redirected to our secure purchase platform shortly.
          </p>
          
          <div className="mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Redirecting in 2 seconds...</p>
          </div>
          
          <div className="mt-8">
            <button
              onClick={handleRedirectNow}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg shadow-md hover:from-amber-600 hover:to-amber-700 transition duration-300"
            >
              Go to Purchase Portal Now
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Having trouble? <a href="mailto:support@signimus.com" className="text-amber-600 hover:text-amber-500">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}