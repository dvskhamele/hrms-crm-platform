'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WorkshopLanding() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to registration page
    router.push('/workshop/registration');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <p className="text-slate-600">Redirecting to workshop registration...</p>
      </div>
    </div>
  );
}