'use client';

import React, { useState, useEffect } from 'react';

export default function WorkshopDashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegistrations, setSelectedRegistrations] = useState<string[]>([]);
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [messageTemplate, setMessageTemplate] = useState('reminder');

  // Load registrations from localStorage on component mount
  useEffect(() => {
    const loadRegistrations = () => {
      // In a real app, this would come from an API
      // For demo purposes, we'll use localStorage and some mock data
      const saved = localStorage.getItem('workshopRegistrations');
      if (saved) {
        setRegistrations(JSON.parse(saved));
      } else {
        // Mock data for demo
        const mockData = [
          {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '9876543210',
            track: 'python',
            experience: 'beginner',
            registeredAt: '2025-10-20T10:30:00Z',
            attended: false,
            completed: false
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            phone: '9876543211',
            track: 'java',
            experience: 'intermediate',
            registeredAt: '2025-10-20T11:15:00Z',
            attended: true,
            completed: true
          },
          {
            id: '3',
            name: 'Mike Chen',
            email: 'mike.chen@example.com',
            phone: '9876543212',
            track: 'python',
            experience: 'beginner',
            registeredAt: '2025-10-20T14:20:00Z',
            attended: false,
            completed: false
          },
          {
            id: '4',
            name: 'Priya Patel',
            email: 'priya.p@example.com',
            phone: '9876543213',
            track: 'java',
            experience: 'advanced',
            registeredAt: '2025-10-21T09:45:00Z',
            attended: true,
            completed: false
          }
        ];
        setRegistrations(mockData);
        localStorage.setItem('workshopRegistrations', JSON.stringify(mockData));
      }
    };

    loadRegistrations();
  }, []);

  // Filter registrations based on filter and search term
  const filteredRegistrations = registrations.filter(reg => {
    const matchesFilter = filter === 'all' || 
      (filter === 'attended' && reg.attended) || 
      (filter === 'not-attended' && !reg.attended) ||
      (filter === 'completed' && reg.completed);
    
    const matchesSearch = !searchTerm || 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm);
    
    return matchesFilter && matchesSearch;
  });

  const toggleRegistrationSelection = (id: string) => {
    setSelectedRegistrations(prev => 
      prev.includes(id) 
        ? prev.filter(regId => regId !== id) 
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedRegistrations.length === filteredRegistrations.length) {
      setSelectedRegistrations([]);
    } else {
      setSelectedRegistrations(filteredRegistrations.map(reg => reg.id));
    }
  };

  const sendMessage = () => {
    // In a real app, this would send messages via WhatsApp API or email
    alert(`Message sent to ${selectedRegistrations.length} participants using template: ${messageTemplate}`);
    setShowSendMessage(false);
    setSelectedRegistrations([]);
  };

  const markAsAttended = (id: string) => {
    setRegistrations(prev => 
      prev.map(reg => 
        reg.id === id ? { ...reg, attended: true } : reg
      )
    );
  };

  const markAsCompleted = (id: string) => {
    setRegistrations(prev => 
      prev.map(reg => 
        reg.id === id ? { ...reg, completed: true } : reg
      )
    );
  };

  // Stats for dashboard cards
  const totalRegistrations = registrations.length;
  const attendedCount = registrations.filter(reg => reg.attended).length;
  const completedCount = registrations.filter(reg => reg.completed).length;
  const pythonCount = registrations.filter(reg => reg.track === 'python').length;
  const javaCount = registrations.filter(reg => reg.track === 'java').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Workshop Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage workshop registrations and participants</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-indigo-500">
            <p className="text-2xl font-bold text-indigo-600">{totalRegistrations}</p>
            <p className="text-sm text-slate-600">Total Registrations</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-green-500">
            <p className="text-2xl font-bold text-green-600">{attendedCount}</p>
            <p className="text-sm text-slate-600">Attended</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
            <p className="text-sm text-slate-600">Completed</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-600">{pythonCount}</p>
            <p className="text-sm text-slate-600">Python Track</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-purple-500">
            <p className="text-2xl font-bold text-purple-600">{javaCount}</p>
            <p className="text-sm text-slate-600">Java Track</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search participants..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Participants</option>
                <option value="attended">Attended Only</option>
                <option value="not-attended">Not Attended</option>
                <option value="completed">Completed Workshop</option>
              </select>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {selectedRegistrations.length > 0 && (
                <button
                  onClick={() => setShowSendMessage(true)}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Message ({selectedRegistrations.length})
                </button>
              )}
              
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition duration-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRegistrations.length === filteredRegistrations.length && filteredRegistrations.length > 0}
                      onChange={selectAll}
                      className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Participant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Track</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Registered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRegistrations.includes(registration.id)}
                        onChange={() => toggleRegistrationSelection(registration.id)}
                        className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{registration.name}</div>
                      <div className="text-sm text-slate-500">{registration.email}</div>
                      <div className="text-sm text-slate-500">{registration.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        registration.track === 'python' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {registration.track.charAt(0).toUpperCase() + registration.track.slice(1)} Track
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {registration.experience.charAt(0).toUpperCase() + registration.experience.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(registration.registeredAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        {registration.attended ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Attended
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                            Registered
                          </span>
                        )}
                        {registration.completed && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Completed
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col gap-2">
                        {!registration.attended && (
                          <button
                            onClick={() => markAsAttended(registration.id)}
                            className="text-green-600 hover:text-green-900 text-sm"
                          >
                            Mark Attended
                          </button>
                        )}
                        {registration.attended && !registration.completed && (
                          <button
                            onClick={() => markAsCompleted(registration.id)}
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            Mark Completed
                          </button>
                        )}
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Send Message Modal */}
      {showSendMessage && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-slate-900">Send Message</h3>
                <button 
                  onClick={() => setShowSendMessage(false)}
                  className="text-slate-400 hover:text-slate-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Message Template</label>
                <select
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="reminder">Workshop Reminder</option>
                  <option value="followup">Post-Workshop Follow-up</option>
                  <option value="certificate">Certificate Collection</option>
                  <option value="1on1">1-on-1 Career Session</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Preview</label>
                <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700">
                  {messageTemplate === 'reminder' && (
                    <div>
                      <p>⏰ Reminder: "Build a Live App" Workshop at 2 PM Today</p>
                      <p className="mt-2">Hi,</p>
                      <p className="mt-2">This is a quick reminder that your "Build a Live App" – Python Workshop starts at 2:00 PM today. 🚀</p>
                      <p className="mt-2">Workshop Link will be shared on SCI WhatsApp Community: https://chat.whatsapp.com/Ck8VbaM9bWi9UvNG4iJYbp</p>
                      <p className="mt-2">🎯 Hands-on session – build and deploy a real project for your portfolio.</p>
                      <p className="mt-2">Don't miss it – see you inside! 👨‍💻👩‍💻</p>
                      <p className="mt-2">Team Signimus</p>
                    </div>
                  )}
                  {messageTemplate === 'followup' && (
                    <div>
                      <p>Thank you for participating in our Python hands-on "Build a Live App" Workshop!</p>
                      <p className="mt-2">🎯 Your Complimentary 1-on-1 Career Strategy Session</p>
                      <p className="mt-2">You now qualify for a private 20–30 min Career Strategy Call with our senior advisor.</p>
                      <p className="mt-2">Click here to Book Your 1-on-1 Session Now</p>
                      <p className="mt-2">⚠ Don't miss your 1-on-1 session — it's the most important step to gain maximum value from this workshop!</p>
                    </div>
                  )}
                  {messageTemplate === 'certificate' && (
                    <div>
                      <p>Congratulations on completing the "Build a Live App" Workshop!</p>
                      <p className="mt-2">🏅 Your Exclusive Workshop + Mentoring Certificate is ready for download.</p>
                      <p className="mt-2">Click here to download your certificate and project code.</p>
                    </div>
                  )}
                  {messageTemplate === '1on1' && (
                    <div>
                      <p>⏳ Book Your 1-on-1 Career Strategy Session!</p>
                      <p className="mt-2">Thank you for joining our hands-on "Build a Live App" Workshop! 🎉</p>
                      <p className="mt-2">This is a reminder to schedule your FREE 20–30 min Career Strategy Call with our senior advisor. 🚀</p>
                      <p className="mt-2">👉 Book your slots by calling now before slots close.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSendMessage(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition duration-300"
                >
                  Send to {selectedRegistrations.length} Participant(s)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}