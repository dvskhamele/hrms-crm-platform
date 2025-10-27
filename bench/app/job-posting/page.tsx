'use client';

import React, { useState } from 'react';

export default function JobPostingPage() {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    department: '',
    description: '',
    requirements: '',
    experience: '',
    location: '',
    employmentType: '',
    salaryMin: '',
    salaryMax: '',
    benefits: '',
    startDate: '',
    applicationDeadline: '',
    responsibilities: ''
  });

  const [postingPlatforms, setPostingPlatforms] = useState({
    linkedin: false,
    indeed: false,
    unstop: false,
    prosple: false,
    whatsapp: false
  });

  const [isPosting, setIsPosting] = useState(false);
  const [postedSuccessfully, setPostedSuccessfully] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlatformToggle = (platform: string) => {
    setPostingPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPosting(true);
    setError(null);
    
    try {
      // In a real implementation, this would call your backend API
      // to post the job to selected platforms
      console.log('Job Details:', jobDetails);
      console.log('Selected Platforms:', postingPlatforms);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPostedSuccessfully(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setPostedSuccessfully(false);
        setJobDetails({
          title: '',
          department: '',
          description: '',
          requirements: '',
          experience: '',
          location: '',
          employmentType: '',
          salaryMin: '',
          salaryMax: '',
          benefits: '',
          startDate: '',
          applicationDeadline: '',
          responsibilities: ''
        });
        setPostingPlatforms({
          linkedin: false,
          indeed: false,
          unstop: false,
          prosple: false,
          whatsapp: false
        });
      }, 3000);
    } catch (err) {
      setError('Failed to post job. Please try again.');
      console.error('Error posting job:', err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Post a New Job</h1>
          <p className="text-slate-600 mt-2">Reach top talent across multiple platforms</p>
        </div>

        {postedSuccessfully ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-green-800 mt-4">Job Posted Successfully!</h2>
            <p className="text-green-700 mt-2">Your job has been posted to the selected platforms.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-teal-500 to-cyan-600"></div>
            
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <span className="text-teal-700 font-bold">1</span>
                    </div>
                    Job Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Job Title *</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="title"
                          value={jobDetails.title}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="e.g. Software Engineer"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Department *</label>
                      <div className="relative">
                        <select
                          name="department"
                          value={jobDetails.department}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white"
                        >
                          <option value="">Select department</option>
                          <option value="technology">Technology</option>
                          <option value="marketing">Marketing</option>
                          <option value="sales">Sales</option>
                          <option value="human-resources">Human Resources</option>
                          <option value="finance">Finance</option>
                          <option value="operations">Operations</option>
                          <option value="customer-support">Customer Support</option>
                        </select>
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Job Description *</label>
                    <textarea
                      name="description"
                      value={jobDetails.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Describe the role, responsibilities, and what makes it great to work here..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <span className="text-teal-700 font-bold">2</span>
                    </div>
                    Requirements & Responsibilities
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Key Requirements *</label>
                      <textarea
                        name="requirements"
                        value={jobDetails.requirements}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="List the key requirements for this position..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Key Responsibilities *</label>
                      <textarea
                        name="responsibilities"
                        value={jobDetails.responsibilities}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="List the main responsibilities of this role..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <span className="text-teal-700 font-bold">3</span>
                    </div>
                    Job Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Experience Required *</label>
                      <select
                        name="experience"
                        value={jobDetails.experience}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select experience level</option>
                        <option value="entry">Entry Level (0-2 years)</option>
                        <option value="mid">Mid Level (2-5 years)</option>
                        <option value="senior">Senior Level (5+ years)</option>
                        <option value="executive">Executive Level (10+ years)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Employment Type *</label>
                      <select
                        name="employmentType"
                        value={jobDetails.employmentType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select employment type</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="temporary">Temporary</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Location *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="location"
                        value={jobDetails.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g. New York, NY or Remote"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <span className="text-teal-700 font-bold">4</span>
                    </div>
                    Compensation & Benefits
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Salary ($)</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="salaryMin"
                          value={jobDetails.salaryMin}
                          onChange={handleChange}
                          className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="e.g. 70000"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.521 1.315c.539.616 1.395.945 2.349.945.955 0 1.81-.33 2.35-.945a1 1 0 00-1.522-1.315c-.162.187-.451.377-.842.504v-1.941a4.535 4.535 0 011.676-.662C13.398 9.767 14 8.992 14 8c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 5.092V5z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Maximum Salary ($)</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="salaryMax"
                          value={jobDetails.salaryMax}
                          onChange={handleChange}
                          className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="e.g. 90000"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.521 1.315c.539.616 1.395.945 2.349.945.955 0 1.81-.33 2.35-.945a1 1 0 00-1.522-1.315c-.162.187-.451.377-.842.504v-1.941a4.535 4.535 0 011.676-.662C13.398 9.767 14 8.992 14 8c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 5.092V5z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Benefits</label>
                    <textarea
                      name="benefits"
                      value={jobDetails.benefits}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="List the benefits you offer..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <span className="text-teal-700 font-bold">5</span>
                    </div>
                    Timeline
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="startDate"
                          value={jobDetails.startDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Application Deadline</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="applicationDeadline"
                          value={jobDetails.applicationDeadline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <span className="text-teal-700 font-bold">6</span>
                    </div>
                    Post to Platforms
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(postingPlatforms).map(([platform, isChecked]) => (
                      <div key={platform} className="flex items-center">
                        <input
                          type="checkbox"
                          id={platform}
                          checked={isChecked}
                          onChange={() => handlePlatformToggle(platform)}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                        />
                        <label htmlFor={platform} className="ml-2 block text-sm text-slate-700 capitalize">
                          {platform}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-sm text-slate-600">
                    <p>Select the platforms where you want to post this job. The job will be posted to all selected platforms with a single click.</p>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isPosting}
                    className={`px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition duration-300 flex items-center justify-center ${
                      isPosting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isPosting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Posting Job...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Post Job to Selected Platforms
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}