'use client'

import React from 'react'

const PlatformFeatures = () => {
  const features = [
    {
      title: "AI Overview",
      description: "Get intelligent insights into your recruiting efforts with predictive analytics and automated recommendations.",
      icon: "🧠",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Agentic AI",
      description: "Autonomous agents that handle candidate outreach, screening, and follow-up without manual intervention.",
      icon: "🤖",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "ATS",
      description: "Seamlessly connect with your existing ATS to streamline workflows and avoid duplicate data entry.",
      icon: "📋",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "CRM",
      description: "Centralized candidate relationship management with rich profiles and engagement history.",
      icon: "👥",
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Sourcing",
      description: "Automated candidate sourcing with access to 650M+ profiles and intelligent matching algorithms.",
      icon: "🔍",
      color: "bg-rose-100 text-rose-600"
    },
    {
      title: "Analytics",
      description: "Advanced reporting and analytics to optimize your recruiting process and measure ROI.",
      icon: "📊",
      color: "bg-indigo-100 text-indigo-600"
    }
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Platform</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-6 text-center bg-slate-50 rounded-xl hover:bg-slate-100 transition cursor-pointer border border-slate-200">
              <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlatformFeatures