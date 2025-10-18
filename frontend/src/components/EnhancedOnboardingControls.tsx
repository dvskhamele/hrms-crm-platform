'use client'

import React, { useState } from 'react'

export default function EnhancedOnboardingControls() {
  const [onboardingSteps, setOnboardingSteps] = useState([
    { id: 1, name: 'Welcome Call', status: 'completed', description: 'Initial welcome call with new hire' },
    { id: 2, name: 'Document Setup', status: 'completed', description: 'Setup of required documents and forms' },
    { id: 3, name: 'Access Credentials', status: 'in-progress', description: 'Create login credentials and access' },
    { id: 4, name: 'Equipment Provision', status: 'pending', description: 'Provide necessary equipment' },
    { id: 5, name: 'Team Introduction', status: 'pending', description: 'Introduction to team members' }
  ])

  const [newStep, setNewStep] = useState({
    name: '',
    description: ''
  })

  const toggleStepStatus = (id: number) => {
    setOnboardingSteps(onboardingSteps.map(step => {
      if (step.id === id) {
        let newStatus = 'completed';
        if (step.status === 'completed') newStatus = 'pending';
        else if (step.status === 'pending') newStatus = 'in-progress';
        else if (step.status === 'in-progress') newStatus = 'completed';
        return { ...step, status: newStatus }
      }
      return step;
    }))
  }

  const addNewStep = () => {
    if (newStep.name.trim() && newStep.description.trim()) {
      const newId = Math.max(...onboardingSteps.map(s => s.id), 0) + 1;
      setOnboardingSteps([
        ...onboardingSteps,
        {
          id: newId,
          name: newStep.name,
          status: 'pending',
          description: newStep.description
        }
      ])
      setNewStep({ name: '', description: '' })
    }
  }

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'in-progress': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'pending': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  }

  const statusCounts = {
    completed: onboardingSteps.filter(s => s.status === 'completed').length,
    'in-progress': onboardingSteps.filter(s => s.status === 'in-progress').length,
    pending: onboardingSteps.filter(s => s.status === 'pending').length
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="border border-slate-200 rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium text-slate-800">Onboarding Steps</h4>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-600">{statusCounts.completed}</div>
                <div className="text-xs text-slate-600">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-600">{statusCounts['in-progress']}</div>
                <div className="text-xs text-slate-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-600">{statusCounts.pending}</div>
                <div className="text-xs text-slate-600">Pending</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {onboardingSteps.map((step) => (
              <div 
                key={step.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition cursor-pointer"
                onClick={() => toggleStepStatus(step.id)}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${step.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : step.status === 'in-progress' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
                    {step.status === 'completed' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : step.status === 'in-progress' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{step.name}</p>
                    <p className="text-xs text-slate-600">{step.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStepStatusColor(step.status)}`}>
                  {step.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-xl p-5">
          <h4 className="text-md font-medium text-slate-800 mb-3">Add New Onboarding Step</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Step Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                placeholder="Enter step name"
                value={newStep.name}
                onChange={(e) => setNewStep({...newStep, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                placeholder="Enter description"
                value={newStep.description}
                onChange={(e) => setNewStep({...newStep, description: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-4">
            <button 
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
              onClick={addNewStep}
            >
              Add Step
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <div className="border border-slate-200 rounded-xl p-5 mb-6">
          <h4 className="text-md font-medium text-slate-800 mb-3">Onboarding Templates</h4>
          <div className="space-y-3">
            <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
              <p className="text-sm font-medium text-slate-800">Standard Onboarding</p>
              <p className="text-xs text-slate-600 mt-1">7-step process for all new hires</p>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
              <p className="text-sm font-medium text-slate-800">Executive Onboarding</p>
              <p className="text-xs text-slate-600 mt-1">Extended process for leadership roles</p>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
              <p className="text-sm font-medium text-slate-800">Remote Onboarding</p>
              <p className="text-xs text-slate-600 mt-1">Steps for remote employees</p>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
              <p className="text-sm font-medium text-slate-800">Intern Onboarding</p>
              <p className="text-xs text-slate-600 mt-1">Process for temporary positions</p>
            </div>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-xl p-5">
          <h4 className="text-md font-medium text-slate-800 mb-3">Integration Status</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-800">HR System</p>
                <p className="text-xs text-slate-600">Connected</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-800">IT Provisioning</p>
                <p className="text-xs text-slate-600">Connected</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-800">Benefits Portal</p>
                <p className="text-xs text-slate-600">Partially Connected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}