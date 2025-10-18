'use client';

import React, { useState, useEffect } from 'react';

// Mock profile data - in a real application, this would come from an API
const profilesData = [
  { 
    id: 'pranay-singhal', 
    name: 'Pranay Singhal', 
    title: 'Salesforce Developer', 
    experience: '5 years', 
    skills: ['Salesforce Developer'], 
    monthlyRate: 'On Request', 
    resumeLink: 'Profile on Request', 
    marketRate: '80,000',
    status: 'Available',
    rating: 4.7,
    email: 'pranay.singhal@example.com',
    phone: '+91-9876543210',
    location: 'Bangalore, India',
    availability: 'Immediate',
    linkedin: 'linkedin.com/in/pranaysinghal'
  },
  { 
    id: 'bhavesh-mistry', 
    name: 'Bhavesh Mistry', 
    title: 'Full Stack Designer', 
    experience: '4 years', 
    skills: ['Design', 'Bootstrap', 'Tailwind CSS', 'Material UI', 'Responsive Design', 'Animations', 'Figma', 'Photoshop', 'Adobe XD', 'React.js', 'Ruby on Rails', '.NET', 'Angular'], 
    monthlyRate: 'On Request', 
    resumeLink: 'Profile on Request', 
    marketRate: '75,000',
    status: 'Available',
    rating: 4.5,
    email: 'bhavesh.mistry@example.com',
    phone: '+91-9876543211',
    location: 'Mumbai, India',
    availability: 'Immediate',
    linkedin: 'linkedin.com/in/bhaveshmistry'
  },
  { 
    id: 'sagar-shinde', 
    name: 'Sagar Shinde', 
    title: 'Senior Java Developer', 
    experience: '3 years', 
    skills: ['Core Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security'], 
    monthlyRate: 'On Request', 
    resumeLink: 'Profile on Request', 
    marketRate: '70,000',
    status: 'Interview Scheduled',
    rating: 4.2,
    email: 'sagar.shinde@example.com',
    phone: '+91-9876543212',
    location: 'Pune, India',
    availability: '2 weeks',
    linkedin: 'linkedin.com/in/sagarshinde'
  },
  { 
    id: 'abhishek-parihar', 
    name: 'Abhishek Parihar', 
    title: 'Full Stack Java/Python Developer', 
    experience: '6 years', 
    skills: ['Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security', 'Python3', 'Django', 'Rest Framework', 'Git', 'Bit-bucket', 'SQLite', 'Slack', 'JIRA', 'Scrum', 'Kan-ban'], 
    monthlyRate: 'On Request', 
    resumeLink: 'https://docs.google.com/document/d/10Xpu8R1Zy7rfCIKRHIrzpDJKhoOfOTz8n084f5pK5BI/edit', 
    marketRate: '120,000',
    status: 'Available',
    rating: 4.9,
    email: 'abhishek.parihar@example.com',
    phone: '+91-9876543213',
    location: 'Hyderabad, India',
    availability: 'Immediate',
    linkedin: 'linkedin.com/in/abhishekparihar'
  },
  { 
    id: 'shikha-gupta', 
    name: 'Shikha Gupta', 
    title: 'Marketing Specialist', 
    experience: '2 years', 
    skills: ['Marketing'], 
    monthlyRate: 'On Request', 
    resumeLink: 'Profile on Request', 
    marketRate: '50,000',
    status: 'Placed',
    rating: 4.0,
    email: 'shikha.gupta@example.com',
    phone: '+91-9876543214',
    location: 'Delhi, India',
    availability: 'N/A',
    linkedin: 'linkedin.com/in/shikhagupta'
  },
  { 
    id: 'aishwarya-kulkarni', 
    name: 'Aishwarya Kulkarni', 
    title: 'UI/UX Designer', 
    experience: '5 years', 
    skills: ['Product Designer', 'UI/UX', 'Graphics Design', 'Figma', 'XD', 'Davanci Resolve', 'UIZARD', 'Zeplin', 'Photoshop', 'Illustrator', 'Canva'], 
    monthlyRate: 'On Request', 
    resumeLink: 'Profile on Request', 
    marketRate: '90,000',
    status: 'Available',
    rating: 4.8,
    email: 'aishwarya.kulkarni@example.com',
    phone: '+91-9876543215',
    location: 'Chennai, India',
    availability: '1 week',
    linkedin: 'linkedin.com/in/aishwaryakulkarni'
  }
];

// Popular skills for filtering
const popularSkills = ['React.js', 'Python', 'Java', 'AI/ML Engineer', '.NET', 'JavaScript', 'Node.js', 'AWS', 'Docker', 'Kubernetes'];

export default function PublicBenchPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState(profilesData);
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is on mobile device
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Filter profiles based on active filters and job description
  useEffect(() => {
    const filtered = profilesData.filter(profile => {
      // Only show profiles with "Available" status on the public page
      if (profile.status !== 'Available') {
        return false;
      }

      // If no filters, show all profiles
      if (activeFilters.length === 0 && !jobDescription) {
        return true;
      }

      // Check if profile matches active filters
      const matchesFilters = activeFilters.every(filter => 
        profile.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase())) ||
        profile.title.toLowerCase().includes(filter.toLowerCase())
      );

      // Check if profile matches job description
      const matchesJD = jobDescription 
        ? profile.skills.some(skill => jobDescription.toLowerCase().includes(skill.toLowerCase())) ||
          jobDescription.toLowerCase().includes(profile.title.toLowerCase())
        : true;

      return matchesFilters && matchesJD;
    });

    setFilteredProfiles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters, jobDescription]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setJobDescription('');
  };

  // Pagination
  const totalPages = Math.ceil(filteredProfiles.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Simple public header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-slate-800 hidden sm:block">Gem</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-slate-600 hover:text-purple-600 font-medium">Home</a>
              <a href="/public/bench" className="text-purple-600 font-medium">Candidate Bench</a>
              <a href="/login" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">Get Started</a>
            </nav>
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-slate-600 hover:text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 mt-2">
              <nav className="flex flex-col space-y-3">
                <a href="/" className="text-slate-600 hover:text-purple-600 font-medium py-2">Home</a>
                <a href="/public/bench" className="text-purple-600 font-medium py-2">Candidate Bench</a>
                <a href="/login" className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition duration-300 text-center">Get Started</a>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 pt-20"> {/* Added padding-top to account for fixed header */}
        <div className="mb-6 text-center sm:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Available Candidates</h1>
              <p className="text-slate-600 mt-1">Browse our pool of qualified professionals</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
          <div className="mb-4">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste a job description here to match candidates..."
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={isMobile ? 2 : 3}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4 max-h-32 overflow-y-auto">
            {activeFilters.map(filter => (
              <span 
                key={filter} 
                className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm flex items-center"
              >
                {filter}
                <button 
                  onClick={() => toggleFilter(filter)}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  &times;
                </button>
              </span>
            ))}
            
            {activeFilters.length > 0 && (
              <button 
                onClick={clearAllFilters}
                className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 self-center"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Popular Skills */}
          <div className="flex flex-wrap gap-2">
            {popularSkills.filter(skill => !activeFilters.includes(skill)).map(skill => (
              <button
                key={skill}
                onClick={() => toggleFilter(skill)}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-gray-200 whitespace-nowrap"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards - Now responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Available Candidates', value: profilesData.filter(p => p.status === 'Available').length, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'emerald' },
            { title: 'Avg. Experience', value: '4.2 yrs', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'blue' },
            { title: 'Avg. Rating', value: (profilesData.reduce((sum, p) => sum + p.rating, 0) / profilesData.length).toFixed(1), icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: 'amber' },
            { title: 'Top Skills', value: '25+', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z', color: 'rose' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm p-4 border-l-2 border-indigo-500"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 truncate">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                </div>
                <div className={`bg-${stat.color}-100 p-2 rounded-full`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-${stat.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Profiles Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {paginatedProfiles.map(profile => (
            <div 
              key={profile.id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base sm:text-lg font-semibold truncate max-w-[70%]">{profile.name}</h3>
              </div>
              
              <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                <p className="text-sm sm:text-base text-gray-600 truncate max-w-[70%]">{profile.title}</p>
                <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${
                  profile.status === 'Available' ? 'bg-emerald-100 text-emerald-800' :
                  profile.status === 'Interview Scheduled' ? 'bg-amber-100 text-amber-800' :
                  profile.status === 'Placed' ? 'bg-rose-100 text-rose-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {profile.status}
                </span>
              </div>
              
              <div className="flex items-center mb-2">
                <div className="flex text-amber-400 mr-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(profile.rating) ? 'text-amber-400' : 'text-gray-300'}`}
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81l-2.8-2.034z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-500 ml-1">{profile.rating}</span>
              </div>
              
              <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mb-3 gap-1 sm:gap-3">
                <span className="truncate">{profile.experience} Experience</span>
                <span className="truncate">₹{profile.monthlyRate !== 'On Request' ? profile.monthlyRate : 'On Request'}/month</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4 max-h-20 overflow-y-auto">
                {profile.skills.slice(0, 5).map(skill => (
                  <span 
                    key={skill} 
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills.length > 5 && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded whitespace-nowrap">
                    +{profile.skills.length - 5} more
                  </span>
                )}
              </div>
              
              {showContactDetails && (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span>Email:</span>
                      <span className="truncate ml-0 sm:ml-2">{profile.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span>Phone:</span>
                      <span className="truncate ml-0 sm:ml-2">{profile.phone}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span>Location:</span>
                      <span className="truncate ml-0 sm:ml-2">{profile.location}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span>Availability:</span>
                      <span className="truncate ml-0 sm:ml-2">{profile.availability}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2">
                <div className="w-full sm:w-auto">
                  {profile.resumeLink && profile.resumeLink !== 'Profile on Request' ? (
                    <a 
                      href={profile.resumeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium w-full text-center block sm:inline-block"
                    >
                      View Resume
                    </a>
                  ) : (
                    <button 
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium w-full text-center block sm:inline-block"
                    >
                      Profile on Request
                    </button>
                  )}
                </div>
                
                <span className="text-xs sm:text-sm text-gray-500 text-center sm:text-right w-full sm:w-auto">
                  Market: ₹{profile.marketRate}/month
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - Mobile responsive */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center mt-8 space-y-4 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded border disabled:opacity-50 w-full sm:w-auto"
            >
              Previous
            </button>
            
            <div className="flex space-x-2 overflow-x-auto max-w-full">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded whitespace-nowrap ${currentPage === page ? 'bg-indigo-600 text-white' : 'border hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded border disabled:opacity-50 w-full sm:w-auto"
            >
              Next
            </button>
          </div>
        )}

        {/* Controls - Mobile optimized */}
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4 gap-3 sm:gap-0">
          <button 
            onClick={() => setShowContactDetails(!showContactDetails)}
            className="text-sm text-teal-600 hover:text-teal-800 font-medium text-center sm:text-left"
          >
            {showContactDetails ? 'Hide' : 'Show'} Contact Details
          </button>
          
          <div className="flex items-center space-x-2 justify-center sm:justify-end">
            <span className="text-sm text-gray-600 text-nowrap">Results per page:</span>
            <select 
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>

        {/* Call to Action - Full width on mobile */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 sm:p-8 text-white text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Find the perfect candidate for your team?</h3>
          <p className="text-purple-100 text-sm sm:text-base mb-4 max-w-3xl mx-auto">
            Connect with our talent acquisition specialists to learn more about our bench and how we can help fill your positions quickly.
          </p>
          <a 
            href="/signup" 
            className="bg-white text-purple-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium text-base sm:text-lg hover:bg-slate-100 transition duration-300 shadow-lg block sm:inline-block w-full sm:w-auto"
          >
            Get Started
          </a>
        </div>
      </main>
    </div>
  );
}