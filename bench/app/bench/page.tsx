'use client';

import React, { useState, useEffect } from 'react';

// Popular skills for filtering
const popularSkills = ['React.js', 'Python', 'Java', 'AI/ML Engineer', '.NET'];

export default function BenchPage() {
  const [profilesData, setProfilesData] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profiles from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bench-list');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProfilesData(data);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profiles');
        // Fallback to mock data
        setProfilesData([
          { 
            id: 'pranay-singhal', 
            name: 'Pranay Singhal', 
            title: 'Salesforce Developer', 
            experience: '5 years', 
            skills: ['Salesforce Developer'], 
            monthly_rate: 'On Request', 
            resume_link: 'Profile on Request', 
            market_rate: '80,000' 
          },
          { 
            id: 'bhavesh-mistry', 
            name: 'Bhavesh Mistry', 
            title: 'Full Stack Designer', 
            experience: '4 years', 
            skills: ['Design', 'Bootstrap', 'Tailwind CSS', 'Material UI', 'Responsive Design', 'Animations', 'Figma', 'Photoshop', 'Adobe XD', 'React.js', 'Ruby on Rails', '.NET', 'Angular'], 
            monthly_rate: 'On Request', 
            resume_link: 'Profile on Request', 
            market_rate: '75,000' 
          },
          { 
            id: 'sagar-shinde', 
            name: 'Sagar Shinde', 
            title: 'Senior Java Developer', 
            experience: '3 years', 
            skills: ['Core Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security'], 
            monthly_rate: 'On Request', 
            resume_link: 'Profile on Request', 
            market_rate: '70,000' 
          },
          { 
            id: 'abhishek-parihar', 
            name: 'Abhishek Parihar', 
            title: 'Full Stack Java/Python Developer', 
            experience: '6 years', 
            skills: ['Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security', 'Python3', 'Django', 'Rest Framework', 'Git', 'Bit-bucket', 'SQLite', 'Slack', 'JIRA', 'Scrum', 'Kan-ban'], 
            monthly_rate: 'On Request', 
            resume_link: 'https://docs.google.com/document/d/10Xpu8R1Zy7rfCIKRHIrzpDJKhoOfOTz8n084f5pK5BI/edit', 
            market_rate: '120,000' 
          },
          { 
            id: 'shikha-gupta', 
            name: 'Shikha Gupta', 
            title: 'Marketing Specialist', 
            experience: '2 years', 
            skills: ['Marketing'], 
            monthly_rate: 'On Request', 
            resume_link: 'Profile on Request', 
            market_rate: '50,000' 
          },
          { 
            id: 'aishwarya-kulkarni', 
            name: 'Aishwarya Kulkarni', 
            title: 'UI/UX Designer', 
            experience: '5 years', 
            skills: ['Product Designer', 'UI/UX', 'Graphics Design', 'Figma', 'XD', 'Davanci Resolve', 'UIZARD', 'Zeplin', 'Photoshop', 'Illustrator', 'Canva'], 
            monthly_rate: 'On Request', 
            resume_link: 'Profile on Request', 
            market_rate: '90,000' 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Filter profiles based on active filters and job description
  useEffect(() => {
    const filtered = profilesData.filter(profile => {
      // If no filters, show all profiles
      if (activeFilters.length === 0 && !jobDescription) {
        return true;
      }

      // Check if profile matches active filters
      const matchesFilters = activeFilters.every(filter => 
        profile.skills?.some((skill: string) => skill.toLowerCase().includes(filter.toLowerCase())) ||
        profile.title?.toLowerCase().includes(filter.toLowerCase())
      );

      // Check if profile matches job description
      const matchesJD = jobDescription 
        ? profile.skills?.some((skill: string) => jobDescription.toLowerCase().includes(skill.toLowerCase())) ||
          jobDescription.toLowerCase().includes(profile.title?.toLowerCase())
        : true;

      return matchesFilters && matchesJD;
    });

    setFilteredProfiles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters, jobDescription, profilesData]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const toggleProfileSelection = (profileId: string) => {
    setSelectedProfiles(prev => 
      prev.includes(profileId) 
        ? prev.filter(id => id !== profileId) 
        : [...prev, profileId]
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

  if (loading) {
    return (
      <div className="container mx-auto p-4 bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading talent bench...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 bg-white">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 mt-2">Unable to load data</h3>
          <p className="text-red-700 mt-1">{error}</p>
          <p className="text-red-600 mt-2 text-sm">Displaying sample data for demonstration purposes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Signimus Talent Bench</h1>
        
        {/* Job Description Input */}
        <div className="mb-4">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description here..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map(filter => (
            <span 
              key={filter} 
              className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
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
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Popular Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {popularSkills.filter(skill => !activeFilters.includes(skill)).map(skill => (
            <button
              key={skill}
              onClick={() => toggleFilter(skill)}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProfiles.map(profile => {
          const isSelected = selectedProfiles.includes(profile.id);
          
          return (
            <div 
              key={profile.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleProfileSelection(profile.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                {isSelected && (
                  <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    Selected
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-2">{profile.title}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="mr-3">{profile.experience} Experience</span>
                <span>₹{profile.monthly_rate !== 'On Request' ? profile.monthly_rate : 'On Request'}/month</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {profile.skills?.slice(0, 5).map((skill: string) => (
                  <span 
                    key={skill} 
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills?.length > 5 && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    +{profile.skills.length - 5} more
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                {profile.resume_link && profile.resume_link !== 'Profile on Request' ? (
                  <a 
                    href={profile.resume_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Resume
                  </a>
                ) : (
                  <button 
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle profile request
                    }}
                  >
                    Profile on Request
                  </button>
                )}
                <span className="text-xs text-gray-500">
                  Market: ₹{profile.market_rate}/month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'border hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Selected Profiles Actions */}
      {selectedProfiles.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <p>{selectedProfiles.length} profile(s) selected</p>
            <div className="space-x-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Copy Selected Profiles
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Arrange Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BenchPage() {
  const [profilesData, setProfilesData] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profiles from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bench-list');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProfilesData(data);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profiles');
        // Fallback to mock data
        setProfilesData([
          { 
            id: 'pranay-singhal', 
            name: 'Pranay Singhal', 
            title: 'Salesforce Developer', 
            experience: '5 years', 
            skills: ['Salesforce Developer'], 
            monthly_rate: 'On Request', 
            resume_link: 'Profile on Request', 
            market_rate: '80,000' 
          },
          { 
            id: 'bhavesh-mistry', 
            name: 'Bhavesh Mistry', 
            title: 'Full Stack Designer', 
            experience: '4 years', 
            skills: ['Design', 'Bootstrap', 'Tailwind CSS', 'Material UI', 'Responsive Design', 'Animations', 'Figma', 'Photoshop', 'Adobe XD', 'React.js', 'Ruby on Rails', '.NET', 'Angular'], 
            monthly_rate: 'On Request', 
            resume_link: 'Profile on Request', 
            market_rate: '75,000' 
          },
          { 
            id: 'sagar-shinde', 
            name: 'Sagar Shinde', 
            title: 'Senior Java Developer', 
            experience: '3 years', 
            skills: ['Core Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security'], 
            monthly_rate: 'On Request', 
            resume_link: 'Profile on Request', 
            market_rate: '70,000' 
          },
          { 
            id: 'abhishek-parihar', 
            name: 'Abhishek Parihar', 
            title: 'Full Stack Java/Python Developer', 
            experience: '6 years', 
            skills: ['Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security', 'Python3', 'Django', 'Rest Framework', 'Git', 'Bit-bucket', 'SQLite', 'Slack', 'JIRA', 'Scrum', 'Kan-ban'], 
            monthly_rate: 'On Request', 
            resume_link: 'https://docs.google.com/document/d/10Xpu8R1Zy7rfCIKRHIrzpDJKhoOfOTz8n084f5pK5BI/edit', 
            market_rate: '120,000' 
          },
          { 
            id: 'shikha-gupta', 
            name: 'Shikha Gupta', 
            title: 'Marketing Specialist', 
            experience: '2 years', 
            skills: ['Marketing'], 
            monthly_rate: 'On Request', 
            resume_link: 'Profile on Request', 
            market_rate: '50,000' 
          },
          { 
            id: 'aishwarya-kulkarni', 
            name: 'Aishwarya Kulkarni', 
            title: 'UI/UX Designer', 
            experience: '5 years', 
            skills: ['Product Designer', 'UI/UX', 'Graphics Design', 'Figma', 'XD', 'Davanci Resolve', 'UIZARD', 'Zeplin', 'Photoshop', 'Illustrator', 'Canva'], 
            monthly_rate: 'On Request', 
            resume_link: 'Profile on Request', 
            market_rate: '90,000' 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Filter profiles based on active filters and job description
  useEffect(() => {
    const filtered = profilesData.filter(profile => {
      // If no filters, show all profiles
      if (activeFilters.length === 0 && !jobDescription) {
        return true;
      }

      // Check if profile matches active filters
      const matchesFilters = activeFilters.every(filter => 
        profile.skills?.some((skill: string) => skill.toLowerCase().includes(filter.toLowerCase())) ||
        profile.title?.toLowerCase().includes(filter.toLowerCase())
      );

      // Check if profile matches job description
      const matchesJD = jobDescription 
        ? profile.skills?.some((skill: string) => jobDescription.toLowerCase().includes(skill.toLowerCase())) ||
          jobDescription.toLowerCase().includes(profile.title?.toLowerCase())
        : true;

      return matchesFilters && matchesJD;
    });

    setFilteredProfiles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters, jobDescription, profilesData]);

export default function BenchPage() {
  const [profilesData, setProfilesData] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profiles from Supabase
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('bench_list')
          .select('*');

        if (error) {
          console.error('Error fetching profiles:', error);
          setError('Failed to load profiles');
          // Fallback to mock data
          setProfilesData([
            { 
              id: 'pranay-singhal', 
              name: 'Pranay Singhal', 
              title: 'Salesforce Developer', 
              experience: '5 years', 
              skills: ['Salesforce Developer'], 
              monthlyRate: 'On Request', 
              resumeLink: 'Profile on Request', 
              marketRate: '80,000' 
            },
            { 
              id: 'bhavesh-mistry', 
              name: 'Bhavesh Mistry', 
              title: 'Full Stack Designer', 
              experience: '4 years', 
              skills: ['Design', 'Bootstrap', 'Tailwind CSS', 'Material UI', 'Responsive Design', 'Animations', 'Figma', 'Photoshop', 'Adobe XD', 'React.js', 'Ruby on Rails', '.NET', 'Angular'], 
              monthlyRate: 'On Request', 
              resumeLink: 'Profile on Request', 
              marketRate: '75,000' 
            },
            { 
              id: 'sagar-shinde', 
              name: 'Sagar Shinde', 
              title: 'Senior Java Developer', 
              experience: '3 years', 
              skills: ['Core Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security'], 
              monthlyRate: 'On Request', 
              resumeLink: 'Profile on Request', 
              marketRate: '70,000' 
            },
            { 
              id: 'abhishek-parihar', 
              name: 'Abhishek Parihar', 
              title: 'Full Stack Java/Python Developer', 
              experience: '6 years', 
              skills: ['Java', 'Spring', 'Spring Boot', 'REST API', 'Spring Data JPA', 'Hibernate', 'JPA', 'MySQL', 'Kafka', 'Redis', 'AWS', 'Spring Security', 'Python3', 'Django', 'Rest Framework', 'Git', 'Bit-bucket', 'SQLite', 'Slack', 'JIRA', 'Scrum', 'Kan-ban'], 
              monthlyRate: 'On Request', 
              resumeLink: 'https://docs.google.com/document/d/10Xpu8R1Zy7rfCIKRHIrzpDJKhoOfOTz8n084f5pK5BI/edit', 
              marketRate: '120,000' 
            },
            { 
              id: 'shikha-gupta', 
              name: 'Shikha Gupta', 
              title: 'Marketing Specialist', 
              experience: '2 years', 
              skills: ['Marketing'], 
              monthlyRate: 'On Request', 
              resumeLink: 'Profile on Request', 
              marketRate: '50,000' 
            },
            { 
              id: 'aishwarya-kulkarni', 
              name: 'Aishwarya Kulkarni', 
              title: 'UI/UX Designer', 
              experience: '5 years', 
              skills: ['Product Designer', 'UI/UX', 'Graphics Design', 'Figma', 'XD', 'Davanci Resolve', 'UIZARD', 'Zeplin', 'Photoshop', 'Illustrator', 'Canva'], 
              monthlyRate: 'On Request', 
              resumeLink: 'Profile on Request', 
              marketRate: '90,000' 
            }
          ]);
        } else {
          setProfilesData(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Failed to load profiles');
        // Fallback to mock data
        setProfilesData([
          { 
            id: 'pranay-singhal', 
            name: 'Pranay Singhal', 
            title: 'Salesforce Developer', 
            experience: '5 years', 
            skills: ['Salesforce Developer'], 
            monthlyRate: 'On Request', 
            resumeLink: 'Profile on Request', 
            marketRate: '80,000' 
          },
          { 
            id: 'bhavesh-mistry', 
            name: 'Bhavesh Mistry', 
            title: 'Full Stack Designer', 
            experience: '4 years', 
            skills: ['Design', 'Bootstrap', 'Tailwind CSS', 'Material UI', 'Responsive Design', 'Animations', 'Figma', 'Photoshop', 'Adobe XD', 'React.js', 'Ruby on Rails', '.NET', 'Angular'], 
            monthlyRate: 'On Request', 
            resumeLink: 'Profile on Request', 
            marketRate: '75,000' 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Filter profiles based on active filters and job description
  useEffect(() => {
    const filtered = profilesData.filter(profile => {
      // If no filters, show all profiles
      if (activeFilters.length === 0 && !jobDescription) {
        return true;
      }

      // Check if profile matches active filters
      const matchesFilters = activeFilters.every(filter => 
        profile.skills?.some((skill: string) => skill.toLowerCase().includes(filter.toLowerCase())) ||
        profile.title?.toLowerCase().includes(filter.toLowerCase())
      );

      // Check if profile matches job description
      const matchesJD = jobDescription 
        ? profile.skills?.some((skill: string) => jobDescription.toLowerCase().includes(skill.toLowerCase())) ||
          jobDescription.toLowerCase().includes(profile.title?.toLowerCase())
        : true;

      return matchesFilters && matchesJD;
    });

    setFilteredProfiles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters, jobDescription, profilesData]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const toggleProfileSelection = (profileId: string) => {
    setSelectedProfiles(prev => 
      prev.includes(profileId) 
        ? prev.filter(id => id !== profileId) 
        : [...prev, profileId]
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

  if (loading) {
    return (
      <div className="container mx-auto p-4 bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading talent bench...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 bg-white">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 mt-2">Unable to load data</h3>
          <p className="text-red-700 mt-1">{error}</p>
          <p className="text-red-600 mt-2 text-sm">Displaying sample data for demonstration purposes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Signimus Talent Bench</h1>
        
        {/* Job Description Input */}
        <div className="mb-4">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description here..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map(filter => (
            <span 
              key={filter} 
              className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
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
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Popular Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {popularSkills.filter(skill => !activeFilters.includes(skill)).map(skill => (
            <button
              key={skill}
              onClick={() => toggleFilter(skill)}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProfiles.map(profile => {
          const isSelected = selectedProfiles.includes(profile.id);
          
          return (
            <div 
              key={profile.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleProfileSelection(profile.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                {isSelected && (
                  <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    Selected
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-2">{profile.title}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="mr-3">{profile.experience} Experience</span>
                <span>₹{profile.monthlyRate !== 'On Request' ? profile.monthlyRate : 'On Request'}/month</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {profile.skills?.slice(0, 5).map((skill: string) => (
                  <span 
                    key={skill} 
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills?.length > 5 && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    +{profile.skills.length - 5} more
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                {profile.resumeLink && profile.resumeLink !== 'Profile on Request' ? (
                  <a 
                    href={profile.resumeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Resume
                  </a>
                ) : (
                  <button 
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle profile request
                    }}
                  >
                    Profile on Request
                  </button>
                )}
                <span className="text-xs text-gray-500">
                  Market: ₹{profile.marketRate}/month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'border hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Selected Profiles Actions */}
      {selectedProfiles.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <p>{selectedProfiles.length} profile(s) selected</p>
            <div className="space-x-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Copy Selected Profiles
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Arrange Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}