'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PublicJobListings() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock job data for demonstration
  const mockJobs = [
    {
      id: 'job-1',
      title: 'Senior Software Engineer',
      department: 'Technology',
      location: 'San Francisco, CA',
      employmentType: 'Full-time',
      experience: '5+ years',
      salaryMin: 120000,
      salaryMax: 160000,
      description: 'We are looking for a Senior Software Engineer to join our team. You will be responsible for developing high-quality software solutions.',
      requirements: 'JavaScript, React, Node.js, AWS, Docker, Kubernetes',
      responsibilities: 'Design and implement scalable software solutions, Collaborate with cross-functional teams, Write clean, maintainable code, Participate in code reviews',
      benefits: 'Health insurance, 401(k) matching, Unlimited PTO, Remote work options',
      postedDate: '2025-10-20',
      deadline: '2025-11-20'
    },
    {
      id: 'job-2',
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY',
      employmentType: 'Full-time',
      experience: '3-5 years',
      salaryMin: 85000,
      salaryMax: 110000,
      description: 'We are looking for a Marketing Manager to lead our marketing efforts and drive growth through innovative campaigns.',
      requirements: 'Digital marketing, SEO, PPC, Content strategy, Analytics',
      responsibilities: 'Develop and execute marketing strategies, Manage marketing campaigns, Analyze marketing data and performance, Collaborate with sales team',
      benefits: 'Health insurance, Performance bonuses, Flexible schedule',
      postedDate: '2025-10-18',
      deadline: '2025-11-18'
    },
    {
      id: 'job-3',
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      employmentType: 'Full-time',
      experience: '2-4 years',
      salaryMin: 75000,
      salaryMax: 95000,
      description: 'We are looking for a UX/UI Designer to create user-centered designs that enhance user experience and engagement.',
      requirements: 'Figma, Sketch, Adobe XD, User research, Prototyping',
      responsibilities: 'Design user interfaces and experiences, Create wireframes and prototypes, Conduct user research and testing, Collaborate with developers and product managers',
      benefits: 'Health insurance, Flexible work hours, Professional development allowance',
      postedDate: '2025-10-15',
      deadline: '2025-11-15'
    },
    {
      id: 'job-4',
      title: 'Sales Associate',
      department: 'Sales',
      location: 'Chicago, IL',
      employmentType: 'Part-time',
      experience: '0-2 years',
      salaryMin: 15,
      salaryMax: 20,
      description: 'We are looking for motivated Sales Associates to engage with customers and drive sales in our retail locations.',
      requirements: 'Customer service, Communication skills, POS systems',
      responsibilities: 'Assist customers with product selection, Process sales transactions, Maintain store appearance, Meet sales targets',
      benefits: 'Commission opportunities, Employee discounts, Flexible scheduling',
      postedDate: '2025-10-10',
      deadline: '2025-11-10'
    }
  ];

  // Fetch jobs from API or use mock data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would fetch from an API
        // For now, we'll use mock data
        setTimeout(() => {
          setJobs(mockJobs);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
        // Fallback to mock data
        setJobs(mockJobs);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term and filters
  useEffect(() => {
    let result = jobs;

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requirements.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filter
    if (selectedDepartment !== 'all') {
      result = result.filter(job => job.department.toLowerCase() === selectedDepartment.toLowerCase());
    }

    // Apply location filter
    if (selectedLocation !== 'all') {
      result = result.filter(job => job.location.toLowerCase() === selectedLocation.toLowerCase());
    }

    setFilteredJobs(result);
  }, [searchTerm, selectedDepartment, selectedLocation, jobs]);

  // Get unique departments and locations for filters
  const departments = ['all', ...new Set(jobs.map(job => job.department))];
  const locations = ['all', ...new Set(jobs.map(job => job.location))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading job opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-slate-800">Unable to load jobs</h3>
          <p className="mt-2 text-slate-600">{error}</p>
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800">Find Your Next Opportunity</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            Browse through our open positions and apply directly without creating an account
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search Jobs</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Job title, skills, or keywords"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc === 'all' ? 'All Locations' : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-indigo-500">
            <p className="text-2xl font-bold text-indigo-600">{jobs.length}</p>
            <p className="text-sm text-slate-600">Active Positions</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-600">{jobs.filter(j => j.employmentType === 'Full-time').length}</p>
            <p className="text-sm text-slate-600">Full-time Jobs</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-600">{jobs.filter(j => j.location.toLowerCase() === 'remote').length}</p>
            <p className="text-sm text-slate-600">Remote Opportunities</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-purple-500">
            <p className="text-2xl font-bold text-purple-600">{departments.filter(d => d !== 'all').length}</p>
            <p className="text-sm text-slate-600">Departments</p>
          </div>
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h2 className="text-xl font-bold text-slate-800">{job.title}</h2>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full whitespace-nowrap">
                        {job.employmentType}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3v-4m0 0v-4m0 4h16m0 0v-4m0 4V9m0 0h2M7 7V3m0 0h10v4M5 21v-4m0 0v-4m0 4h14m0 0v-4m0 4H5" />
                        </svg>
                        <span>{job.department}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{job.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{job.experience} experience</span>
                      </div>
                      
                      {job.salaryMin && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>
                            {typeof job.salaryMin === 'number' 
                              ? `$${job.salaryMin.toLocaleString()} - $${job.salaryMax ? job.salaryMax.toLocaleString() : 'N/A'}` 
                              : `${job.salaryMin} - ${job.salaryMax}/hour`}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-slate-700 mb-4 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.split(',').slice(0, 5).map((req: string, index: number) => (
                        <span 
                          key={index} 
                          className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded whitespace-nowrap"
                        >
                          {req.trim()}
                        </span>
                      ))}
                      {job.requirements.split(',').length > 5 && (
                        <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded whitespace-nowrap">
                          +{job.requirements.split(',').length - 5} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3 min-w-[150px]">
                    <Link
                      href={`/apply/${job.id}`}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition duration-300 text-sm font-medium text-center"
                    >
                      Apply Now
                    </Link>
                    <button
                      onClick={() => {
                        // In a real implementation, this would show job details
                        alert(`Job details for ${job.title} would be shown here`);
                      }}
                      className="px-4 py-2 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-300 text-sm font-medium text-center"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-slate-800 mt-4">No jobs found</h3>
            <p className="text-slate-600 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}