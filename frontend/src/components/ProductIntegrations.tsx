'use client'

import React from 'react'

const ProductIntegrations = () => {
  const integrations = [
    {
      id: 1,
      name: "Workday",
      category: "ATS",
      logo: "W",
      description: "Seamless integration with Workday for streamlined recruiting"
    },
    {
      id: 2,
      name: "Greenhouse",
      category: "ATS",
      logo: "G",
      description: "Sync candidates and positions seamlessly"
    },
    {
      id: 3,
      name: "Lever",
      category: "ATS",
      logo: "L",
      description: "Complete candidate lifecycle management"
    },
    {
      id: 4,
      name: "LinkedIn Recruiter",
      category: "Sourcing",
      logo: "IN",
      description: "Direct integration for sourcing and outreach"
    },
    {
      id: 5,
      name: "Zoom",
      category: "Scheduling",
      logo: "Z",
      description: "Automated interview scheduling and coordination"
    },
    {
      id: 6,
      name: "Slack",
      category: "Communication",
      logo: "S",
      description: "Real-time notifications and collaboration"
    },
    {
      id: 7,
      name: "Gmail",
      category: "Email",
      logo: "G",
      description: "Integrated email sequences and tracking"
    },
    {
      id: 8,
      name: "ZoomInfo",
      category: "Sourcing",
      logo: "Z",
      description: "Expanded candidate database access"
    }
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Product Integrations</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect Gem with your existing tools to create a seamless recruiting experience
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {integrations.map((integration) => (
            <div key={integration.id} className="border border-slate-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-16 h-16 rounded-lg flex items-center justify-center text-lg font-bold mx-auto mb-4">
                {integration.logo}
              </div>
              <h3 className="font-bold text-slate-800">{integration.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{integration.category}</p>
              <p className="text-sm text-slate-500 mt-3">{integration.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md">
            View All Integrations
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductIntegrations