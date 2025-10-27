'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WorkshopRegistration() {
  const router = useRouter();
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    track: 'python',
    experience: 'beginner'
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user is already registered
  useEffect(() => {
    const savedRegistration = localStorage.getItem('workshopRegistration');
    if (savedRegistration) {
      const parsedRegistration = JSON.parse(savedRegistration);
      setRegistrationData(parsedRegistration);
      setIsRegistered(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Validate phone (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      setIsLoading(false);
      return;
    }

    // Save to localStorage
    localStorage.setItem('workshopRegistration', JSON.stringify(formData));
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsRegistered(true);
      
      // Redirect to onboarding after successful registration
      setTimeout(() => {
        router.push('/onboarding');
      }, 2000);
    }, 1000);
  };

  const handleJoinCommunity = () => {
    // In a real app, this would redirect to WhatsApp
    window.open('https://chat.whatsapp.com/Ck8VbaM9bWi9UvNG4iJYbp', '_blank');
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-green-400 to-teal-500"></div>
          
          <div className="p-8 sm:p-12">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <svg className="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h1 className="mt-4 text-3xl font-bold text-slate-800">You're In! Spot Confirmed</h1>
              <p className="mt-2 text-lg text-slate-600">
                Great news — your spot is confirmed for our Free 120-min Live "Build a Live App" Workshop! 🎉
              </p>
              
              <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 text-left">
                <h2 className="text-xl font-bold text-slate-800 mb-4">📅 Workshop Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="ml-3 text-slate-700">
                      <span className="font-medium">Title:</span> Build a Live App – Free Hands-On Workshop
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="ml-3 text-slate-700">
                      <span className="font-medium">Date:</span> This Wednesday
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="ml-3 text-slate-700">
                      <span className="font-medium">Time:</span> 
                      {registrationData.track === 'java' ? ' 11:00 AM (Java Corporate Track)' : ' 2:00 PM (Python Track)'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Confirm Your Seat Here</h3>
                <p className="text-slate-700 mb-4">
                  Join the SCI WhatsApp Community to receive the workshop link & updates:
                </p>
                <button
                  onClick={handleJoinCommunity}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 transition duration-300 flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Join SCI WhatsApp Community
                </button>
              </div>
              
              <div className="mt-8 text-left">
                <h3 className="text-lg font-bold text-slate-800 mb-4">⚡ Why Attend?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Build a real, deployable app in just 2 hours</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Add the project to your portfolio/GitHub</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Get practical coding experience guided by experts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Qualify for a 1-on-1 Career Strategy Call for a personalised job roadmap</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <p className="text-slate-700">
                  🏅 Everyone who completes the full session plus their 1-on-1 mentoring will also receive an Exclusive Workshop + Mentoring Certificate. And yes — the project code will also be shared with you.
                </p>
              </div>
              
              <div className="mt-8">
                <p className="text-slate-600">
                  The Google Meet link will be shared in the WhatsApp Community a day before the workshop + reminder on the workshop day.
                </p>
                <p className="mt-4 text-lg font-medium text-slate-800">
                  We're excited to build with you — see you on Wednesday
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-slate-600">
                  Best regards,<br/>
                  <span className="font-medium">Team Signimus</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Register for Free Workshop
            </h1>
            <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
              Build a Real Project + Learn the #1 Skill Recruiters Want
            </p>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={registrationData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute left-3 top-3.5 text-slate-400">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={registrationData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                  <div className="absolute left-3 top-3.5 text-slate-400">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={registrationData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="10-digit mobile number"
                  />
                  <div className="absolute left-3 top-3.5 text-slate-400">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="track" className="block text-sm font-medium text-slate-700 mb-2">
                  Choose Track *
                </label>
                <div className="relative">
                  <select
                    id="track"
                    name="track"
                    value={registrationData.track}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                  >
                    <option value="python">Python Track (2:00 PM)</option>
                    <option value="java">Java Track (11:00 AM)</option>
                  </select>
                  <div className="absolute left-3 top-3.5 text-slate-400">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h10.674M12 12h8M12 7h.01M4.938 12.079a2 2 0 102.533 2.844 2 2 0 00-2.533-2.844zm0 5.121a2 2 0 102.533 2.844 2 2 0 00-2.533-2.844z" />
                    </svg>
                  </div>
                  <div className="absolute right-3 top-3.5 text-slate-400 pointer-events-none">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-slate-700 mb-2">
                Experience Level
              </label>
              <div className="relative">
                <select
                  id="experience"
                  name="experience"
                  value={registrationData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                >
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3+ years)</option>
                </select>
                <div className="absolute left-3 top-3.5 text-slate-400">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="absolute right-3 top-3.5 text-slate-400 pointer-events-none">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-3">
                🎯 What's Next After the Workshop?
              </h3>
              <p className="text-slate-700 mb-4">
                For attendees who perform well during the session and are serious about taking the next step, you will be invited to a 1-on-1 Career Strategy Call with our senior advisors to build a personalized job-readiness plan.
              </p>
              <p className="text-slate-700">
                We look forward to building with you this Wednesday!
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 flex items-center justify-center ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Confirm Your Spot
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">🎓 Workshop Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">120 min</div>
                <div className="text-sm text-slate-600">Hands-on Session</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">Real Project</div>
                <div className="text-sm text-slate-600">Portfolio Builder</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">Certificate</div>
                <div className="text-sm text-slate-600">Upon Completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}