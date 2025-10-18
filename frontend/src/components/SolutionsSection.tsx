'use client'

import React from 'react'

const SolutionsSection = () => {
  const solutions = [
    {
      id: 'startups',
      title: 'For Startups',
      description: '1-100 EMPLOYEES',
      icon: (
        <div className="bg-blue-100 text-blue-800 w-16 h-16 rounded-full flex items-center justify-center text-2xl">
          🚀
        </div>
      ),
      features: [
        'Launch your company with the right talent',
        'All-in-one recruiting platform',
        'AI-powered CRM and sourcing'
      ],
      cta: 'Learn More'
    },
    {
      id: 'growth',
      title: 'For Growth',
      description: '101-1000 EMPLOYEES',
      icon: (
        <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center text-2xl">
          📈
        </div>
      ),
      features: [
        'Consolidate tools and reduce tech spend',
        'Built for scale',
        'AI-powered analytics'
      ],
      cta: 'Learn More'
    },
    {
      id: 'enterprise',
      title: 'For Enterprise',
      description: '1000+ EMPLOYEES',
      icon: (
        <div className="bg-purple-100 text-purple-800 w-16 h-16 rounded-full flex items-center justify-center text-2xl">
          🏢
        </div>
      ),
      features: [
        'Hire faster with AI-powered tools',
        'All integrated with your ATS',
        'Enhanced security & compliance'
      ],
      cta: 'Learn More'
    }
  ]

  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Solutions tailored to your needs</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Whether you're a startup, growing company, or enterprise, we have the right solution for you
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div key={solution.id} className="bg-white rounded-2xl shadow-md p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                {solution.icon}
                <h3 className="text-xl font-bold text-slate-800 mt-4">{solution.title}</h3>
                <p className="text-purple-600 font-medium mt-2">{solution.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {solution.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition duration-300">
                {solution.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SolutionsSection