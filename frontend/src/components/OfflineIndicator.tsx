'use client'

import React from 'react'
import useOnlineStatus from '../hooks/useOnlineStatus'

const OfflineIndicator: React.FC = () => {
  const { isOnline } = useOnlineStatus()

  if (isOnline) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-amber-500 text-white text-center py-2 px-4 text-sm font-medium">
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          You are currently offline. Some features may be unavailable.
        </div>
      </div>
    </div>
  )
}

export default OfflineIndicator