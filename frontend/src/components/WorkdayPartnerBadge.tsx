'use client'

import React from 'react'

const WorkdayPartnerBadge = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-12">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1 mb-6 md:mb-0 md:pr-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Workday Innovation Partner Badge</h3>
          <p className="text-slate-600">Gem joins Workday's Innovation Partner Program</p>
          <p className="text-slate-600 mt-2">
            We're bringing AI agents, CRM, and analytics to Workday Recruiting to help teams hire 5x faster.
          </p>
          <button className="mt-4 text-green-700 font-medium hover:text-green-800 flex items-center">
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="bg-white border-2 border-dashed border-green-300 rounded-xl p-4 text-center">
          <div className="bg-gradient-to-br from-green-100 to-emerald-200 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="font-bold text-green-800">Innovation Partner</p>
          <p className="text-sm text-green-600">Badge</p>
        </div>
      </div>
    </div>
  )
}

export default WorkdayPartnerBadge