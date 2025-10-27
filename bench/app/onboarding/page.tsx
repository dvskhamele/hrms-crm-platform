'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    experience: '',
    interests: [] as string[],
    availability: '',
    supportNeeds: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'interests' | 'supportNeeds') => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value] 
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send the data to your backend
      console.log('Onboarding data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCompleted(true);
      
      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-1"></div>
          
          <div className="p-8 sm:p-12 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg className="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="mt-6 text-3xl font-bold text-slate-800">Welcome to Gem!</h1>
            <p className="mt-2 text-xl text-slate-600">
              Your onboarding is complete. Let's get started!
            </p>
            
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">What's Next?</h2>
              <ul className="space-y-4 text-left">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700">Explore your personalized dashboard</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700">Connect with our talent bench</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700">Post jobs to multiple platforms</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700">Track applications and interviews</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <p className="text-slate-600">
                Redirecting to your dashboard in a few seconds...
              </p>
              <div className="mt-4 w-24 h-1 bg-slate-200 rounded-full mx-auto">
                <div className="h-1 bg-indigo-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Welcome to Gem!</h1>
          <p className="mt-2 text-slate-600">Let's get you set up for success</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Step {currentStep} of 5</span>
            <span className="text-sm text-slate-500">{Math.round((currentStep / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          
          <div className="p-6 sm:p-8">
            <form onSubmit={currentStep === 5 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              {/* Step 1: Welcome */}
              {currentStep === 1 && (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100">
                    <svg className="h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-slate-800">Welcome to Gem!</h2>
                  <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    We're excited to have you join our community. This quick onboarding will help us understand your goals and customize your experience.
                  </p>
                  <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 max-w-2xl mx-auto">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">What You'll Get</h3>
                    <ul className="space-y-3 text-left">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">Personalized dashboard with relevant insights</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">Access to our talent bench for hiring</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">Job posting to multiple platforms</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">Application tracking and interview scheduling</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 2: Goals */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">What are your primary goals?</h2>
                  <p className="text-slate-600 mb-8">Select all that apply</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'hiring', label: 'Hiring talent', icon: '👥' },
                      { id: 'job-search', label: 'Finding a job', icon: '💼' },
                      { id: 'training', label: 'Upskilling', icon: '🎓' },
                      { id: 'networking', label: 'Building connections', icon: '🤝' },
                      { id: 'career-advice', label: 'Career guidance', icon: '🧭' },
                      { id: 'other', label: 'Something else', icon: '❓' }
                    ].map((goal) => (
                      <div 
                        key={goal.id}
                        className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                          formData.goal === goal.id 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, goal: goal.id }))}
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{goal.icon}</span>
                          <span className="font-medium text-slate-800">{goal.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Experience */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">What's your experience level?</h2>
                  <p className="text-slate-600 mb-8">This helps us tailor the right resources for you</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'beginner', label: 'Beginner', description: 'Just starting out', icon: '🌱' },
                      { id: 'intermediate', label: 'Intermediate', description: 'Some experience', icon: '📈' },
                      { id: 'expert', label: 'Expert', description: 'Extensive experience', icon: '🏆' }
                    ].map((level) => (
                      <div 
                        key={level.id}
                        className={`border rounded-xl p-6 cursor-pointer transition-all duration-300 text-center ${
                          formData.experience === level.id 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, experience: level.id }))}
                      >
                        <div className="text-3xl mb-3">{level.icon}</div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{level.label}</h3>
                        <p className="text-sm text-slate-600">{level.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Interests */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">What are your interests?</h2>
                  <p className="text-slate-600 mb-8">Select all that apply</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Technology', 'Marketing', 'Sales', 'Design', 'HR', 'Finance',
                      'Operations', 'Data Science', 'AI/ML', 'Product Management',
                      'Business Development', 'Customer Success', 'Engineering',
                      'Content Writing', 'Social Media', 'Public Relations'
                    ].map((interest) => (
                      <div 
                        key={interest}
                        className={`border rounded-lg p-3 cursor-pointer transition-all duration-300 text-center ${
                          formData.interests.includes(interest) 
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            interests: prev.interests.includes(interest)
                              ? prev.interests.filter(i => i !== interest)
                              : [...prev.interests, interest]
                          }));
                        }}
                      >
                        <span className="text-sm font-medium">{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Availability & Support */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">How can we support you?</h2>
                  <p className="text-slate-600 mb-8">Let us know what you need to get started</p>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      What's your availability for onboarding calls?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { id: 'morning', label: 'Morning (9AM-12PM)', time: '9AM-12PM' },
                        { id: 'afternoon', label: 'Afternoon (12PM-5PM)', time: '12PM-5PM' },
                        { id: 'evening', label: 'Evening (5PM-8PM)', time: '5PM-8PM' }
                      ].map((slot) => (
                        <div 
                          key={slot.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 text-center ${
                            formData.availability === slot.id 
                              ? 'border-indigo-500 bg-indigo-50' 
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, availability: slot.id }))}
                        >
                          <h3 className="font-medium text-slate-800">{slot.label}</h3>
                          <p className="text-sm text-slate-600 mt-1">{slot.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      What kind of support do you need? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Job search assistance',
                        'Resume/CV review',
                        'Interview preparation',
                        'Career guidance',
                        'Skill development',
                        'Networking opportunities',
                        'Industry insights',
                        'Mentorship'
                      ].map((support) => (
                        <div key={support} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={`support-${support}`}
                              name="supportNeeds"
                              type="checkbox"
                              value={support}
                              checked={formData.supportNeeds.includes(support)}
                              onChange={(e) => handleCheckboxChange(e, 'supportNeeds')}
                              className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={`support-${support}`} className="font-medium text-slate-700">
                              {support}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-10 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    currentStep === 1
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  ← Back
                </button>
                
                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition duration-300"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-teal-700 transition duration-300 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Completing Onboarding...
                      </span>
                    ) : (
                      'Complete Onboarding'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Need help? <Link href="/support" className="text-indigo-600 hover:text-indigo-800">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
}