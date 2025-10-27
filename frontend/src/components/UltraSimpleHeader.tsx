'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

interface NavItem {
  name: string;
  href: string;
  icon: string;
  roles?: string[];
}

const UltraSimpleHeader = () => {
  const { user } = useAuth();

  // Define all navigation items with role restrictions
  const allNavItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', roles: ['ADMIN', 'HR_MANAGER', 'RECRUITER', 'CANDIDATE'] },
    { name: 'Candidates', href: '/candidate-profiles', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', roles: ['ADMIN', 'HR_MANAGER', 'RECRUITER'] },
    { name: 'Bench', href: '/bench', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', roles: ['ADMIN', 'HR_MANAGER'] },
    { name: 'Positions', href: '/positions', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', roles: ['ADMIN', 'HR_MANAGER', 'RECRUITER'] },
    { name: 'Applications', href: '/applications', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', roles: ['ADMIN', 'HR_MANAGER', 'RECRUITER'] },
    { name: 'Recruiters', href: '/recruiters', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', roles: ['ADMIN', 'HR_MANAGER'] },
    { name: 'Recruiter Tracking', href: '/recruiter-tracking', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zm-9.193-3.515a4 4 0 105.656 0M9 10h.01M15 10h.01', roles: ['ADMIN', 'HR_MANAGER'] },
    { name: 'AI Sourcing', href: '/ai-sourcing', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', roles: ['ADMIN', 'HR_MANAGER', 'RECRUITER'] },
    { name: 'Voice Commands', href: '/voice-commands', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v14a3 3 0 01-3 3z', roles: ['ADMIN', 'HR_MANAGER', 'RECRUITER'] },
    { name: 'Screening', href: '/screening', icon: 'M20 7l-8-4-8 4m16 0l-8 4m16-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', roles: ['ADMIN', 'HR_MANAGER', 'RECRUITER'] },
    { name: 'Analytics', href: '/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', roles: ['ADMIN', 'HR_MANAGER'] },
    { name: 'Tools', href: '/tools', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', roles: ['ADMIN', 'HR_MANAGER', 'RECRUITER'] },
    { name: 'Departments', href: '/departments', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4', roles: ['ADMIN', 'HR_MANAGER'] }
  ];

  // Filter navigation items based on user role
  const navItems = allNavItems.filter(item => {
    // If no user or no roles specified, show the item
    if (!user || !item.roles) return true;
    
    // Show item if user's role is in the allowed roles list
    return item.roles.includes(user.role);
  });

  return (
    <header style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      padding: '0 1rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/dashboard" style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.75rem', width: '1.75rem', color: '#0d9488', marginRight: '0.375rem' }} viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Gem</span>
          </Link>
        </div>
        
        <nav style={{
          display: 'flex',
          gap: '0.5rem', /* Reduced gap for more items */
          flexGrow: 1,
          justifyContent: 'center',
          margin: '0 1rem',
          flexWrap: 'wrap' /* Allow wrapping on smaller screens */
        }}>
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              style={{
                color: '#475569',
                textDecoration: 'none',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="truncate max-w-[100px]">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <button style={{
              position: 'relative',
              padding: '0.5rem',
              color: '#475569',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.5rem', width: '1.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </button>
          </div>
          
          <div style={{ position: 'relative' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#334155',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}>
              <span style={{ marginRight: '0.25rem' }}>{user?.name || 'User'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default UltraSimpleHeader