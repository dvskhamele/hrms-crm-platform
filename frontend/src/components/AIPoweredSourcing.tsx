'use client'

import React, { useState } from 'react'

const AIPoweredSourcing = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [experience, setExperience] = useState('all')
  const [skills, setSkills] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const searchResults = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      skills: ["React", "TypeScript", "Node.js"],
      experience: "7 years",
      connection: "2nd degree",
      profileMatch: 94,
      responseRate: "92%",
      gemScore: 96,
      contacted: false
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      skills: ["React", "Next.js", "GraphQL"],
      experience: "5 years",
      connection: "3rd degree",
      profileMatch: 89,
      responseRate: "85%",
      gemScore: 91,
      contacted: true
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      title: "Full Stack Engineer",
      company: "InnovateCo",
      location: "Austin, TX",
      skills: ["React", "Python", "AWS"],
      experience: "6 years",
      connection: "Out of network",
      profileMatch: 92,
      responseRate: "88%",
      gemScore: 93,
      contacted: false
    },
    {
      id: 4,
      name: "David Kim",
      title: "Senior React Developer",
      company: "Digital Solutions",
      location: "Remote",
      skills: ["React", "TypeScript", "Redux"],
      experience: "8 years",
      connection: "1st degree",
      profileMatch: 96,
      responseRate: "95%",
      gemScore: 98,
      contacted: false
    }
  ]

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search
    setTimeout(() => {
      setIsSearching(false)
    }, 1500)
  }

  const handleContact = (id: number) => {
    // In a real app, this would contact the candidate via the API
    console.log(`Contacting candidate with ID: ${id}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">AI-Powered Sourcing</h2>
        <div className="flex items-center space-x-2">
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            650M+ profiles
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-slate-800 mb-3">Search Criteria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role / Skills</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. React, Python, Product Manager"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State or Remote"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All levels</option>
              <option value="entry">Entry level</option>
              <option value="mid">Mid level</option>
              <option value="senior">Senior level</option>
              <option value="executive">Executive</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className={`w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md ${
                isSearching ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSearching ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : 'Search Candidates'}
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">Search Results</h3>
          <div className="text-sm text-slate-600">Showing {searchResults.length} candidates</div>
        </div>

        <div className="space-y-4">
          {searchResults.map((candidate) => (
            <div key={candidate.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{candidate.name}</h4>
                      <p className="text-slate-600">{candidate.title} at {candidate.company}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {candidate.skills.map((skill, index) => (
                          <span key={index} className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:ml-4 mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-slate-500">Location</div>
                    <div className="text-sm font-medium text-slate-800">{candidate.location}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Experience</div>
                    <div className="text-sm font-medium text-slate-800">{candidate.experience}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Connection</div>
                    <div className="text-sm font-medium text-slate-800">{candidate.connection}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Profile Match</div>
                    <div className="text-sm font-medium text-slate-800">{candidate.profileMatch}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Response Rate</div>
                    <div className="text-sm font-medium text-slate-800">{candidate.responseRate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Gem Score</div>
                    <div className="text-sm font-bold text-purple-600">{candidate.gemScore}</div>
                  </div>
                </div>

                <div className="md:ml-4 mt-4 md:mt-0 flex flex-col items-end justify-between">
                  <button
                    onClick={() => handleContact(candidate.id)}
                    disabled={candidate.contacted}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      candidate.contacted
                        ? 'bg-green-100 text-green-800 cursor-default'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    {candidate.contacted ? 'Contacted' : 'Contact'}
                  </button>
                  <div className="mt-2 text-xs text-slate-500">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      AI Matched
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="bg-slate-100 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-200 transition duration-300">
          Load More Candidates
        </button>
      </div>
    </div>
  )
}

export default AIPoweredSourcing