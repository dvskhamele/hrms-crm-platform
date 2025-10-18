'use client'

import React from 'react'

const TalentMarketing = () => {
  const features = [
    {
      id: 1,
      title: "Landing Pages",
      description: "Create custom career pages that showcase your company culture",
      icon: "📄"
    },
    {
      id: 2,
      title: "Career Sites",
      description: "Build beautiful, mobile-optimized career websites",
      icon: "🌐"
    },
    {
      id: 3,
      title: "Event Management",
      description: "Coordinate and promote recruiting events and job fairs",
      icon: "📅"
    },
    {
      id: 4,
      title: "Talent Communities",
      description: "Nurture relationships with potential candidates",
      icon: "👥"
    },
    {
      id: 5,
      title: "Email Campaigns",
      description: "Automated nurture sequences for passive candidates",
      icon: "📧"
    },
    {
      id: 6,
      title: "Branded Outreach",
      description: "Maintain consistent brand identity across all touchpoints",
      icon: "🎨"
    }
  ]

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Talent Marketing & Events</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Build your employer brand and attract top talent with powerful marketing tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Build your talent community</h3>
              <p className="text-slate-600 mb-4">
                Foster relationships with potential candidates through nurture campaigns, talent communities, 
                and targeted outreach. Keep passive talent warm and engaged with personalized content.
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md">
                Start Building Your Community
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 w-full max-w-sm">
                <div className="text-center">
                  <div className="text-5xl font-bold text-purple-700 mb-2">2.3x</div>
                  <div className="text-lg text-purple-600">Higher Conversion Rate</div>
                  <div className="text-sm text-slate-600 mt-2">With talent marketing campaigns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TalentMarketing