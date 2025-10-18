'use client'

import React, { useState } from 'react'

const AIOverview = () => {
  const [activeTab, setActiveTab] = useState('insights')

  const aiInsights = [
    {
      title: "Top Performing Roles",
      value: "Software Engineer",
      change: "+15% from last month",
      icon: "👨‍💻"
    },
    {
      title: "Best Sourcing Channels",
      value: "LinkedIn",
      change: "42% conversion rate",
      icon: "🔗"
    },
    {
      title: "Hiring Predictions",
      value: "24 roles",
      change: "in next 30 days",
      icon: "🔮"
    },
    {
      title: "Time-to-Hire",
      value: "21 days",
      change: "↓ 7 days from avg",
      icon: "⏱️"
    }
  ]

  const aiRecommendations = [
    {
      title: "Optimize Job Descriptions",
      description: "Add 3 specific skills to increase applications by 25%",
      priority: "high",
      impact: "High"
    },
    {
      title: "Adjust Interview Process",
      description: "Reduce from 4 to 3 rounds for mid-level positions",
      priority: "medium",
      impact: "Medium"
    },
    {
      title: "Reallocate Budget",
      description: "Shift 20% from job boards to employee referrals",
      priority: "medium",
      impact: "Medium"
    },
    {
      title: "Update Sourcing Strategy",
      description: "Target 50 new profiles in Design field",
      priority: "low",
      impact: "High"
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">AI Overview</h2>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'insights' 
                ? 'bg-purple-100 text-purple-700' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'recommendations' 
                ? 'bg-purple-100 text-purple-700' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations
          </button>
        </div>
      </div>

      {activeTab === 'insights' ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {aiInsights.map((insight, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{insight.icon}</span>
                  <h3 className="font-medium text-slate-700">{insight.title}</h3>
                </div>
                <div className="text-2xl font-bold text-slate-800">{insight.value}</div>
                <div className="text-sm text-slate-600">{insight.change}</div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="font-bold text-lg mb-2">AI Hiring Prediction</h3>
            <p className="mb-4">Based on your current pipeline and hiring velocity, we predict you'll fill 87% of your open roles this quarter.</p>
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p>Focus on sourcing for Sales and Engineering roles to meet your hiring goals.</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-bold text-slate-800 mb-4">AI-Powered Recommendations</h3>
          <div className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <h4 className="font-medium text-slate-800">{rec.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    rec.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : rec.priority === 'medium' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mt-1">{rec.description}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Impact: {rec.impact}</span>
                  <button className="ml-auto text-sm text-purple-600 hover:text-purple-800 font-medium">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AIOverview