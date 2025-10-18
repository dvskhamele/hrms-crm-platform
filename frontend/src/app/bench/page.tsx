'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { 
  executeAction, 
  getDashboardData,
  ActionType, 
  ActionPayload 
} from '../../utils/actionAutomation';
import { toast } from 'react-toastify';

export default function BenchMatchingSystem() {
  const [user, setUser] = useState<any>(null);
  const [benchCandidates, setBenchCandidates] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [matches, setMatches] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any);
    }

    // Load bench candidates from localStorage if available
    const storedBenchCandidates = localStorage.getItem('benchCandidates');
    if (storedBenchCandidates) {
      try {
        // In a real app, this would load full candidate details
        const candidateIds = JSON.parse(storedBenchCandidates);
        setBenchCandidates(candidateIds.map((id: number) => ({
          id,
          name: `Candidate ${id}`,
          skills: ['JavaScript', 'React', 'Node.js', 'Python'], // Mock skills
          experience: '5 years',
          rating: 4.5
        })));
      } catch (e) {
        console.error('Error parsing bench candidates from localStorage', e);
      }
    }

    // Load mock positions
    setPositions([
      { id: 1, title: 'Senior Software Engineer', department: 'Technology', skills: ['JavaScript', 'React', 'Node.js'], priority: 'HIGH' },
      { id: 2, title: 'Marketing Manager', department: 'Marketing', skills: ['Digital Marketing', 'SEO', 'Analytics'], priority: 'MEDIUM' },
      { id: 3, title: 'Sales Associate', department: 'Sales', skills: ['Sales', 'Communication', 'CRM'], priority: 'HIGH' }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleAction = async (actionType: ActionType, payload: ActionPayload) => {
    setIsProcessing(true);
    try {
      const result = await executeAction(actionType, payload);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Action failed');
      console.error('Action execution error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const autoMatchCandidates = () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    // Simple matching algorithm based on skills
    const matched = benchCandidates.filter(candidate => {
      // Extract relevant skills from job description
      const jobSkills = jobDescription.toLowerCase().split(/[\s,]+/).filter(skill => skill.length > 2);
      const candidateSkills = candidate.skills.map((s: string) => s.toLowerCase());
      
      // Match if at least one skill matches
      return jobSkills.some(skill => 
        candidateSkills.some(candidateSkill => 
          candidateSkill.includes(skill) || skill.includes(candidateSkill)
        )
      );
    });

    setMatches(matched);
    toast.success(`Found ${matched.length} matching candidates for the position`);
  };

  const handleAssignCandidate = (candidateId: number, positionId: number) => {
    if (!selectedCandidate || !selectedPosition) {
      toast.error('Please select both a candidate and a position');
      return;
    }

    handleAction('ASSIGN_RECRUITER', {
      applicationId: candidateId,
      recruiterId: positionId
    });

    // Update local state
    setBenchCandidates(prev => prev.filter(c => c.id !== candidateId));
    
    // Remove candidate from localStorage bench
    const storedBench = localStorage.getItem('benchCandidates');
    if (storedBench) {
      const benchArray = JSON.parse(storedBench);
      const updatedBench = benchArray.filter((id: number) => id !== candidateId);
      localStorage.setItem('benchCandidates', JSON.stringify(updatedBench));
    }

    toast.success('Candidate assigned to position successfully');
    setSelectedCandidate(null);
    setSelectedPosition(null);
  };

  const handleDragStart = (e: React.DragEvent, candidateId: number) => {
    e.dataTransfer.setData('candidateId', candidateId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, positionId: number) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('candidateId');
    if (candidateId) {
      handleAssignCandidate(parseInt(candidateId), positionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Bench Matching System</h1>
          <p className="text-slate-600">Auto-match candidates to open positions with one-tap assignments</p>
        </div>

        {/* Job Description Input */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Auto-Match Candidates</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-slate-700 mb-1">Paste Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here to auto-match candidates..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 bg-white h-32"
              />
            </div>
            <div className="flex items-end">
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md disabled:opacity-50"
                onClick={autoMatchCandidates}
                disabled={isProcessing}
              >
                {isProcessing ? 'Matching...' : 'Auto-Match'}
              </button>
            </div>
          </div>
        </div>

        {/* Matching Results */}
        {matches.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Matching Candidates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matches.map(candidate => (
                <div 
                  key={candidate.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    selectedCandidate === candidate.id ? 'border-purple-500 bg-purple-50' : 'border-slate-200'
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, candidate.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-slate-800">{candidate.name}</h3>
                      <p className="text-sm text-slate-600">{candidate.experience} experience</p>
                      <div className="flex items-center mt-1">
                        <span className="text-amber-500 mr-1">★</span>
                        <span className="text-sm">{candidate.rating}</span>
                      </div>
                    </div>
                    <span 
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedCandidate === candidate.id ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                      }`}
                      onClick={() => setSelectedCandidate(selectedCandidate === candidate.id ? null : candidate.id)}
                    >
                      {selectedCandidate === candidate.id ? 'Selected' : 'Select'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-xs font-medium text-slate-700">Skills:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {candidate.skills.slice(0, 3).map((skill: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bench Candidates */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Bench Candidates</h2>
              <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
                {benchCandidates.length} available
              </span>
            </div>
            <div className="space-y-4">
              {benchCandidates.map(candidate => (
                <div 
                  key={candidate.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    selectedCandidate === candidate.id ? 'border-purple-500 bg-purple-50' : 'border-slate-200'
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, candidate.id)}
                  onClick={() => setSelectedCandidate(selectedCandidate === candidate.id ? null : candidate.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-slate-800">{candidate.name}</h3>
                      <p className="text-sm text-slate-600">{candidate.experience} experience</p>
                    </div>
                    <span 
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedCandidate === candidate.id ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {selectedCandidate === candidate.id ? 'Selected' : 'Select'}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="text-amber-500 mr-1">★</span>
                    <span className="text-sm mr-3">{candidate.rating}</span>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {benchCandidates.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  No candidates on the bench. Add candidates to the bench from the candidate profiles page.
                </div>
              )}
            </div>
          </div>

          {/* Open Positions */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Open Positions</h2>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {positions.length} positions
              </span>
            </div>
            <div className="space-y-4">
              {positions.map(position => (
                <div 
                  key={position.id} 
                  className={`border rounded-lg p-4 transition-all duration-300 ${
                    selectedPosition === position.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, position.id)}
                  onClick={() => setSelectedPosition(selectedPosition === position.id ? null : position.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-slate-800">{position.title}</h3>
                      <p className="text-sm text-slate-600">{position.department}</p>
                    </div>
                    <span 
                      className={`px-2 py-1 text-xs rounded-full ${
                        position.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 
                        position.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {position.priority}
                    </span>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-medium text-slate-700">Required Skills:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {position.skills.map((skill: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Assign Button */}
            {selectedCandidate && selectedPosition && (
              <div className="mt-6">
                <button
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md disabled:opacity-50"
                  onClick={() => handleAssignCandidate(selectedCandidate, selectedPosition)}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Assign Candidate to Position'}
                </button>
                <p className="text-xs text-slate-500 mt-2">
                  This action will update candidate status, position application count, notify manager and candidate
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}