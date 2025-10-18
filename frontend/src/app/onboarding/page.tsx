'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'
import '../../styles/onboarding-enhanced.css'

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    industry: '',
    teamSize: '',
    goals: [] as string[],
    features: [] as string[],
    timeToEvaluate: '',
    budget: ''
  })

  const handleNext = () => {
    console.log('handleNext called, currentStep:', currentStep)
    try {
      if (currentStep < 4) {
        console.log('Moving to next step')
        setCurrentStep(currentStep + 1)
      } else {
        // Complete onboarding
        console.log('Completing onboarding')
        localStorage.setItem('onboardingComplete', 'true')
        console.log('onboardingComplete set to:', localStorage.getItem('onboardingComplete'))
        console.log('Navigating to /dashboard')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error in handleNext:', error)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value, checked } = e.target
    const currentValues = formData[field as keyof typeof formData] as string[] || []
    let newValues: string[]
    
    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter(item => item !== value)
    }
    
    setFormData({
      ...formData,
      [field]: newValues
    })
  }

  // Wrapper functions for specific fields
  const handleGoalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckboxChange(e, 'goals')
  }

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckboxChange(e, 'features')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-x-hidden overflow-y-auto">
      <Header user={null} onLogout={() => {}} />
      
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 mb-6 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Welcome to RecruitPro</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">Let's set up your account in just a few quick steps. This will help us customize your experience to your specific needs.</p>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg font-semibold text-slate-800">
              Step {currentStep} of 4
            </div>
            <div className="text-lg font-medium text-slate-600">
              {currentStep === 1 && 'Company Info'}
              {currentStep === 2 && 'Hiring Goals'}
              {currentStep === 3 && 'Features'}
              {currentStep === 4 && 'Review'}
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-700 ease-in-out shadow-md" 
                  style={{ width: `${(currentStep - 1) * 33.33}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between relative z-10 mt-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-white shadow-xl' 
                      : 'bg-white text-slate-400 border-slate-300'
                  }`}>
                    {currentStep > step ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  <span className={`mt-3 text-base font-medium ${
                    currentStep >= step ? 'text-slate-800' : 'text-slate-500'
                  }`}>
                    {step === 1 && 'Company'}
                    {step === 2 && 'Goals'}
                    {step === 3 && 'Features'}
                    {step === 4 && 'Review'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 onboarding-container enhanced-card">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="p-6 sm:p-10 overflow-y-auto onboarding-scrollbar">
            {currentStep === 1 && (
              <div className="space-y-8 animate-fadeIn step-enter">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-800 mb-3">Tell us about your company</h2>
                  <p className="text-lg text-slate-600">This helps us customize your experience</p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-lg font-medium text-slate-800 mb-4">Industry</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { value: 'tech', label: 'Technology' },
                        { value: 'healthcare', label: 'Healthcare' },
                        { value: 'finance', label: 'Finance' },
                        { value: 'education', label: 'Education' },
                        { value: 'retail', label: 'Retail' },
                        { value: 'manufacturing', label: 'Manufacturing' }
                      ].map((industry) => (
                        <button
                          key={industry.value}
                          type="button"
                          onClick={() => setFormData({...formData, industry: industry.value})}
                          className={`px-5 py-4 rounded-xl border-2 text-base font-medium transition-all duration-300 transform hover:scale-[1.02] enhanced-btn ${
                            formData.industry === industry.value
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-lg'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-blue-300'
                          }`}
                        >
                          {industry.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-slate-800 mb-4">Team Size</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { value: '1-10', label: '1-10 employees' },
                        { value: '11-50', label: '11-50 employees' },
                        { value: '51-200', label: '51-200 employees' },
                        { value: '201-500', label: '201-500 employees' },
                        { value: '500+', label: '500+ employees' }
                      ].map((size) => (
                        <button
                          key={size.value}
                          type="button"
                          onClick={() => setFormData({...formData, teamSize: size.value})}
                          className={`px-5 py-4 rounded-xl border-2 text-base font-medium transition-all duration-300 transform hover:scale-[1.02] enhanced-btn ${
                            formData.teamSize === size.value
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-lg'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-blue-300'
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-8 animate-fadeIn step-enter">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-800 mb-3">What are your hiring goals?</h2>
                  <p className="text-lg text-slate-600">Select all that apply</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { id: 'speed', label: 'Hire faster', desc: 'Reduce time-to-hire for key positions', icon: '⏱️' },
                    { id: 'quality', label: 'Improve quality', desc: 'Find better-matched candidates', icon: '🎯' },
                    { id: 'diversity', label: 'Increase diversity', desc: 'Build a more diverse team', icon: '👥' },
                    { id: 'efficiency', label: 'Streamline process', desc: 'Reduce manual tasks', icon: '⚡' },
                    { id: 'compliance', label: 'Ensure compliance', desc: 'Meet hiring regulations', icon: '✅' },
                    { id: 'cost', label: 'Reduce costs', desc: 'Lower cost per hire', icon: '💰' }
                  ].map((goal) => (
                    <div 
                      key={goal.id}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] enhanced-card ${
                        formData.goals.includes(goal.id)
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                      onClick={() => handleGoalsChange({ target: { value: goal.id, checked: !formData.goals.includes(goal.id) } } as unknown as React.ChangeEvent<HTMLInputElement>)}
                    >
                      <div className="flex items-start">
                        <div className="text-2xl mr-4 mt-1">{goal.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={goal.id}
                              value={goal.id}
                              checked={formData.goals.includes(goal.id)}
                              onChange={handleGoalsChange}
                              className="sr-only"
                            />
                            <h3 className="text-lg font-semibold text-slate-800">{goal.label}</h3>
                          </div>
                          <p className="text-base text-slate-600 mt-2">{goal.desc}</p>
                        </div>
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                          formData.goals.includes(goal.id)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-slate-300'
                        }`}>
                          {formData.goals.includes(goal.id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-8 animate-fadeIn step-enter">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-800 mb-3">Which features are important to you?</h2>
                  <p className="text-lg text-slate-600">Select all that apply</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { id: 'ats', label: 'Applicant Tracking', desc: 'Manage applications and candidates', icon: '📋' },
                    { id: 'ai_matching', label: 'AI Matching', desc: 'Automated candidate matching', icon: '🤖' },
                    { id: 'video_interviews', label: 'Video Interviews', desc: 'Conduct remote interviews', icon: '🎥' },
                    { id: 'background_checks', label: 'Background Checks', desc: 'Integrate with screening services', icon: '🔍' },
                    { id: 'offer_management', label: 'Offer Management', desc: 'Create and manage job offers', icon: '💼' },
                    { id: 'analytics', label: 'Analytics', desc: 'Track hiring metrics and ROI', icon: '📊' }
                  ].map((feature) => (
                    <div 
                      key={feature.id}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] enhanced-card ${
                        formData.features.includes(feature.id)
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                      onClick={() => handleFeaturesChange({ target: { value: feature.id, checked: !formData.features.includes(feature.id) } } as unknown as React.ChangeEvent<HTMLInputElement>)}
                    >
                      <div className="flex items-start">
                        <div className="text-2xl mr-4 mt-1">{feature.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={feature.id}
                              value={feature.id}
                              checked={formData.features.includes(feature.id)}
                              onChange={handleFeaturesChange}
                              className="sr-only"
                            />
                            <h3 className="text-lg font-semibold text-slate-800">{feature.label}</h3>
                          </div>
                          <p className="text-base text-slate-600 mt-2">{feature.desc}</p>
                        </div>
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                          formData.features.includes(feature.id)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-slate-300'
                        }`}>
                          {formData.features.includes(feature.id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="space-y-8 animate-fadeIn step-enter">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-800 mb-3">Review your information</h2>
                  <p className="text-lg text-slate-600">Confirm your details before completing setup</p>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-7 space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg uppercase tracking-wide mb-4">Company Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-500 mb-1">Industry</p>
                        <p className="font-semibold text-lg text-slate-800">{formData.industry ? formData.industry.charAt(0).toUpperCase() + formData.industry.slice(1) : 'Not specified'}</p>
                      </div>
                      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-500 mb-1">Team Size</p>
                        <p className="font-semibold text-lg text-slate-800">{formData.teamSize || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg uppercase tracking-wide mb-4">Hiring Goals</h3>
                    <div className="flex flex-wrap gap-3">
                      {formData.goals.length > 0 ? (
                        formData.goals.map((goal, index) => (
                          <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 text-base rounded-full font-medium shadow-sm">
                            {goal.replace(/_/g, ' ')}
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-500 text-base">None selected</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg uppercase tracking-wide mb-4">Important Features</h3>
                    <div className="flex flex-wrap gap-3">
                      {formData.features.length > 0 ? (
                        formData.features.map((feature, index) => (
                          <span key={index} className="px-4 py-2 bg-indigo-100 text-indigo-800 text-base rounded-full font-medium shadow-sm">
                            {feature.replace(/_/g, ' ')}
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-500 text-base">None selected</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-10 flex flex-col sm:flex-row justify-between gap-5">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`px-7 py-3.5 rounded-xl font-semibold flex items-center justify-center text-lg transition-all duration-300 enhanced-btn ${
                  currentStep === 1 
                    ? 'text-slate-400 cursor-not-allowed bg-slate-100' 
                    : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
              </button>
              
              <button
                onClick={(e) => {
                  console.log('Button clicked!')
                  try {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Calling handleNext...')
                    handleNext()
                  } catch (error) {
                    console.error('Error in button click handler:', error)
                  }
                }}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 enhanced-btn"
              >
                {currentStep === 4 ? 'Complete Setup' : 'Continue'}
                {currentStep !== 4 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/dashboard" className="text-lg text-slate-600 hover:text-blue-600 font-semibold inline-flex items-center transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  )
}