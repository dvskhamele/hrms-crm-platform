'use client'

import React, { useState } from 'react'

const AgenticAI = () => {
  const [activeTab, setActiveTab] = useState('automation')
  const [isRecording, setIsRecording] = useState(false)

  const automationTasks = [
    {
      id: 1,
      name: "Candidate Outreach",
      status: "Active",
      candidates: 42,
      responses: 18,
      icon: "📧",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      name: "Resume Screening",
      status: "Active",
      candidates: 128,
      responses: 0,
      icon: "📋",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 3,
      name: "Interview Scheduling",
      status: "Paused",
      candidates: 5,
      responses: 3,
      icon: "📅",
      color: "bg-amber-100 text-amber-800"
    },
    {
      id: 4,
      name: "Follow-up Sequences",
      status: "Active",
      candidates: 23,
      responses: 7,
      icon: "🔄",
      color: "bg-purple-100 text-purple-800"
    }
  ]

  const aiActions = [
    {
      id: 1,
      action: "Send personalized outreach",
      target: "React Engineers",
      status: "Running",
      completion: 78
    },
    {
      id: 2,
      action: "Screen resumes",
      target: "Senior PMs",
      status: "Pending",
      completion: 0
    },
    {
      id: 3,
      action: "Schedule interviews",
      target: "Product Designers",
      status: "Completed",
      completion: 100
    },
    {
      id: 4,
      action: "Follow up with candidates",
      target: "Rejected applicants",
      status: "Running",
      completion: 45
    }
  ]

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Agentic AI</h2>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'automation' 
                ? 'bg-purple-100 text-purple-700' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab('automation')}
          >
            Automation
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'actions' 
                ? 'bg-purple-100 text-purple-700' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab('actions')}
          >
            Actions
          </button>
        </div>
      </div>

      {activeTab === 'automation' ? (
        <div>
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-2">Active Automations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {automationTasks.map((task) => (
                <div key={task.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-3">
                      {task.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">{task.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${task.color}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>{task.candidates} candidates</span>
                    <span>{task.responses} responses</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <h3 className="font-bold text-slate-800 mb-3">Create New Automation</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Automation Type</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option>Select automation</option>
                  <option>Outreach Campaign</option>
                  <option>Resume Screening</option>
                  <option>Interview Scheduling</option>
                  <option>Follow-up Sequences</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Candidates</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option>Select criteria</option>
                  <option>All Candidates</option>
                  <option>React Engineers</option>
                  <option>Product Managers</option>
                  <option>Designers</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-bold text-slate-800 mb-4">AI Actions</h3>
          <div className="space-y-4">
            {aiActions.map((action) => (
              <div key={action.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-slate-800">{action.action}</h4>
                    <p className="text-sm text-slate-600">Target: {action.target}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    action.status === 'Running' 
                      ? 'bg-blue-100 text-blue-800' 
                      : action.status === 'Pending' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {action.status}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Progress</span>
                    <span>{action.completion}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${action.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <h3 className="font-bold text-slate-800 mb-3">AI Voice Assistant</h3>
            <p className="text-slate-600 mb-4">Record your recruitment instructions and let AI execute them for you</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={toggleRecording}
                className={`flex items-center justify-center w-16 h-16 rounded-full ${
                  isRecording 
                    ? 'bg-red-500 animate-pulse' 
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white transition duration-300`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <div className="flex-1">
                <div className="text-sm text-slate-600">
                  {isRecording 
                    ? "Listening... Speak your recruitment instructions" 
                    : "Click to record your instructions"}
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Try: "Schedule interviews with the top 5 React developers", "Send follow-up emails to candidates who applied last week"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgenticAI