'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'

export default function AlertsAndPending() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "New Application Received",
      description: "John Smith applied for Software Engineer position",
      type: "application",
      priority: "high",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false
    },
    {
      id: 2,
      title: "Interview Scheduled",
      description: "Interview scheduled with Jane Doe for Marketing Manager",
      type: "interview",
      priority: "medium",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: false
    },
    {
      id: 3,
      title: "Offer Accepted",
      description: "Robert Johnson accepted the offer for Sales Associate",
      type: "offer",
      priority: "low",
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      read: true
    },
    {
      id: 4,
      title: "Position Filled",
      description: "Software Engineer position has been filled",
      type: "position",
      priority: "medium",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true
    },
    {
      id: 5,
      title: "New Job Posting",
      description: "New position posted: UX Designer",
      type: "job",
      priority: "high",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      read: false
    }
  ])
  
  const [pendingTasks, setPendingTasks] = useState([
    {
      id: 1,
      title: "Review Applications",
      description: "3 new applications for Software Engineer position",
      type: "application",
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      assignedTo: "You"
    },
    {
      id: 2,
      title: "Schedule Interviews",
      description: "Interviews to schedule for Marketing Manager",
      type: "interview",
      dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      assignedTo: "You"
    },
    {
      id: 3,
      title: "Prepare Offer Letter",
      description: "Create offer for Robert Johnson",
      type: "offer",
      dueDate: new Date(Date.now() + 432000000).toISOString().split('T')[0],
      assignedTo: "HR Team"
    }
  ])
  
  const [activeTab, setActiveTab] = useState<'alerts' | 'pending'>('alerts')
  const unreadCount = alerts.filter(alert => !alert.read).length

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ))
  }

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={null} onLogout={() => {}} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Alerts & Pending Tasks</h1>
          <p className="text-slate-600 mt-2">Stay updated with important notifications and tasks</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-slate-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('alerts')}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === 'alerts'
                    ? 'text-teal-600 border-b-2 border-teal-500'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Alerts {unreadCount > 0 && (
                  <span className="ml-2 bg-rose-100 text-rose-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'text-teal-600 border-b-2 border-teal-500'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Pending Tasks
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'alerts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Notifications</h2>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                
                {alerts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 mb-2">No notifications</h3>
                    <p className="text-slate-600">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div 
                        key={alert.id} 
                        className={`p-4 rounded-lg border-l-4 ${
                          alert.priority === 'high' 
                            ? 'border-rose-500 bg-rose-50' 
                            : alert.priority === 'medium' 
                              ? 'border-amber-500 bg-amber-50' 
                              : 'border-teal-500 bg-teal-50'
                        } ${!alert.read ? 'ring-1 ring-slate-200' : ''}`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className={`font-medium ${
                                alert.read ? 'text-slate-700' : 'text-slate-900'
                              }`}>
                                {alert.title}
                              </h3>
                              {!alert.read && (
                                <span className="ml-2 w-2 h-2 bg-rose-500 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-slate-600 mt-1">{alert.description}</p>
                            <div className="flex items-center mt-2 text-sm text-slate-500">
                              <span>{new Date(alert.timestamp).toLocaleString()}</span>
                              <span className="mx-2">•</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                alert.type === 'application' ? 'bg-purple-100 text-purple-800' :
                                alert.type === 'interview' ? 'bg-blue-100 text-blue-800' :
                                alert.type === 'offer' ? 'bg-green-100 text-green-800' :
                                alert.type === 'position' ? 'bg-amber-100 text-amber-800' :
                                'bg-slate-100 text-slate-800'
                              }`}>
                                {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => markAsRead(alert.id)}
                            className={`text-sm ${
                              alert.read ? 'text-slate-400' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {alert.read ? 'Read' : 'Mark as read'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'pending' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Pending Tasks</h2>
                  <span className="bg-slate-100 text-slate-800 text-sm font-medium px-3 py-1 rounded-full">
                    {pendingTasks.length} tasks
                  </span>
                </div>
                
                {pendingTasks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 mb-2">No pending tasks</h3>
                    <p className="text-slate-600">You have completed all your tasks!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingTasks.map((task) => (
                      <div key={task.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium text-slate-800">{task.title}</h3>
                              {new Date(task.dueDate) < new Date() && (
                                <span className="ml-2 px-2 py-0.5 bg-rose-100 text-rose-800 text-xs font-medium rounded-full">
                                  Overdue
                                </span>
                              )}
                            </div>
                            <p className="text-slate-600 mt-1">{task.description}</p>
                            <div className="flex items-center mt-2 text-sm text-slate-500">
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                              <span className="mx-2">•</span>
                              <span>Assigned to: {task.assignedTo}</span>
                            </div>
                          </div>
                          <Link 
                            href="/tasks"
                            className="px-3 py-1.5 text-sm bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-teal-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">12</p>
                <p className="text-slate-600">Active Positions</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">42</p>
                <p className="text-slate-600">New Applications</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">8</p>
                <p className="text-slate-600">Scheduled Interviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}