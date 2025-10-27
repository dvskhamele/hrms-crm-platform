'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PublicJobApplication({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null,
    jobId: params.id
  });

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/job-posting`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        
        const jobs = await response.json();
        const foundJob = jobs.find((j: any) => j.id === params.id);
        
        if (!foundJob) {
          setError('Job not found');
          return;
        }
        
        setJob(foundJob);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err instanceof Error ? err.message : 'Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return false;
    }
    
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    
    // Basic phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Create FormData object for file upload
      const formDataObj = new FormData();
      formDataObj.append('fullName', formData.fullName);
      formDataObj.append('email', formData.email);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('coverLetter', formData.coverLetter);
      formDataObj.append('jobId', formData.jobId);
      
      if (formData.resume) {
        formDataObj.append('resume', formData.resume);
      }
      
      // In a real implementation, this would send to your backend
      // For now, we'll simulate the submission
      console.log('Application submitted:', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        jobId: formData.jobId,
        coverLetter: formData.coverLetter
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-1"></div>
          
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <svg className="h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 className="mt-4 text-lg font-medium text-slate-800">Unable to load job</h3>
            <p className="mt-2 text-slate-600">{error}</p>
            
            <div className="mt-6">
              <button
                onClick={() => router.push('/public/jobs')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-1"></div>
          
          <div className="p-8 sm:p-12 text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
              <svg className="h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="mt-6 text-3xl font-bold text-slate-800">Application Submitted!</h1>
            <p className="mt-4 text-xl text-slate-600">
              Thank you for your interest in the {job?.title} position at {job?.companyName || 'our company'}.
            </p>
            
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">What happens next?</h2>
              <ul className="space-y-4 text-left">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700">Our team will review your application within 24-48 hours</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700">Qualified candidates will be contacted for a preliminary interview</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700">You'll receive an update via email within 7 business days</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => router.push('/public/jobs')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-indigo-700 transition duration-300"
              >
                Browse More Jobs
              </button>
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
          <h1 className="text-3xl font-bold text-slate-800">Apply for {job?.title}</h1>
          <p className="mt-2 text-slate-600">
            {job?.department} • {job?.location} • {job?.employmentType}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
          
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Job Details Preview */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Job Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-slate-500 mb-1">Department</div>
                    <div className="font-medium text-slate-800">{job?.department}</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-slate-500 mb-1">Location</div>
                    <div className="font-medium text-slate-800">{job?.location}</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-slate-500 mb-1">Experience</div>
                    <div className="font-medium text-slate-800">{job?.experience}</div>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Job Description</h3>
                  <p className="text-slate-700">{job?.description}</p>
                  
                  <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Requirements</h3>
                  <p className="text-slate-700">{job?.requirements}</p>
                  
                  <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Responsibilities</h3>
                  <p className="text-slate-700">{job?.responsibilities}</p>
                  
                  {job?.benefits && (
                    <>
                      <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Benefits</h3>
                      <p className="text-slate-700">{job.benefits}</p>
                    </>
                  )}
                </div>
              </div>
              
              {/* Application Form */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Application</h2>
                
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
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
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4v-1.586l5.293-5.293a1 1 0 011.414 0L16 14.414V16zm-2-6a1 1 0 11-2 0 1 1 0 012 0z" />
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
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 01-8-1.43V8a2 2 0 012-2h2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-slate-700 mb-2">
                      Resume/CV *
                    </label>
                    <div className="relative">
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-slate-300 rounded-lg">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-slate-600">
                            <label htmlFor="resume" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                              <span>Upload a file</span>
                              <input 
                                id="resume" 
                                name="resume" 
                                type="file" 
                                className="sr-only" 
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-slate-500">PDF, DOC, DOCX up to 10MB</p>
                        </div>
                      </div>
                      {formData.resume && (
                        <p className="mt-2 text-sm text-slate-600">
                          Selected file: {formData.resume.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-slate-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  ></textarea>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-slate-800 mb-2">Your Privacy Matters</h3>
                  <p className="text-sm text-slate-600">
                    Your information will be securely stored and used solely for the purpose of your application. 
                    We do not share your data with third parties without your consent.
                  </p>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-slate-700">
                    I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">terms and conditions</a> and acknowledge that my data will be processed in accordance with the <a href="#" className="text-indigo-600 hover:text-indigo-500">privacy policy</a>.
                  </label>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => router.push('/public/jobs')}
                    className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition duration-300 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-indigo-700 transition duration-300 flex items-center justify-center ${
                      submitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}