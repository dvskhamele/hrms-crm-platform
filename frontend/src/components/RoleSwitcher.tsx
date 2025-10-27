'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RoleSwitcher() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span>HRMS/CRM Platform - Role Selection Enabled</span>
        <Link 
          href="/role-select" 
          className="bg-white text-purple-600 px-3 py-1 rounded-md font-medium hover:bg-slate-100 transition"
        >
          Change Role
        </Link>
      </div>
    </div>
  );
}