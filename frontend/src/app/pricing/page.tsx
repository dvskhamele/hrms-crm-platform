'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)

  const pricingPlans = [
    {
      name: 'Gem All-in-One',
      description: '1-100 EMPLOYEES',
      monthlyPrice: 'Contact Sales',
      annualPrice: 'Contact Sales',
      priceDescription: '',
      features: [
        'AI-powered ATS & CRM',
        '650M+ candidate profiles',
        'Agentic AI for outreach',
        'Automated scheduling',
        'Advanced analytics',
        'Talent marketing tools',
        'Custom integrations',
        'Dedicated support'
      ],
      cta: 'Get Started',
      popular: false,
      color: 'from-slate-500 to-slate-600'
    },
    {
      name: 'Gem All-in-One',
      description: '101-1000 EMPLOYEES',
      monthlyPrice: 'Contact Sales',
      annualPrice: 'Contact Sales',
      priceDescription: '',
      features: [
        'Everything in Startup plan',
        'Advanced team management',
        'Custom branding',
        'Security compliance',
        'Dedicated account manager',
        'Priority support',
        'Custom reporting',
        'API access'
      ],
      cta: 'Get Started',
      popular: false,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Gem Enterprise',
      description: '1000+ EMPLOYEES',
      monthlyPrice: 'Contact Sales',
      annualPrice: 'Contact Sales',
      priceDescription: '',
      features: [
        'Enhanced ATS integration',
        'AI-powered CRM & sourcing',
        'Advanced security & compliance',
        'Custom AI model training',
        'Dedicated customer success',
        'SLA guarantees',
        'Custom development',
        'On-premise options'
      ],
      cta: 'Contact Sales',
      popular: true,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Gem
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-slate-600 hover:text-purple-600 font-medium">
              Log In
            </Link>
            <Link 
              href="/dashboard" 
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-purple-100">
            Choose the perfect plan for your team. All plans include our core features.
          </p>
          
          {/* Billing Cycle Toggle - Hidden for B2B SaaS like Gem */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex rounded-lg border border-purple-300 p-1 bg-purple-500 bg-opacity-20">
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium ${
                  !isAnnual 
                    ? 'bg-white text-purple-600 shadow' 
                    : 'text-purple-100 hover:text-white'
                }`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly Billing
              </button>
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium ${
                  isAnnual 
                    ? 'bg-white text-purple-600 shadow' 
                    : 'text-purple-100 hover:text-white'
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Annual Billing <span className="text-amber-300">(Save up to 17%)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-20 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-2xl shadow-xl overflow-hidden ${
                  plan.popular 
                    ? 'ring-4 ring-purple-500 ring-opacity-50 transform scale-105 z-10' 
                    : 'bg-white'
                }`}
              >
                {plan.popular && (
                  <div className={`bg-gradient-to-r ${plan.color} py-2 text-center`}>
                    <span className="text-sm font-bold text-white">ENTERPRISE FAVORITE</span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className={`text-2xl font-bold ${
                    plan.popular ? 'text-purple-600' : 'text-slate-800'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-purple-600 font-medium">{plan.description}</p>
                  
                  <div className="mt-6">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {plan.monthlyPrice}
                    </span>
                    <span className="text-lg font-medium text-slate-600">
                      {plan.priceDescription}
                    </span>
                  </div>
                  
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-3 text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={plan.name === 'Gem Enterprise' ? '/contact' : '/signup'}
                    className={`mt-10 w-full py-3 px-6 rounded-lg font-bold text-white shadow-md transition duration-300 flex items-center justify-center ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} hover:from-purple-600 hover:to-purple-700`
                        : 'bg-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    {plan.cta}
                    {plan.name !== 'Gem Enterprise' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Detailed Feature Comparison
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
              Everything you need to know about each plan
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-slate-100 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Startup
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Growth
                  </th>
                  <th className="px-6 py-3 bg-slate-100 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {[
                  'AI-powered ATS & CRM',
                  '650M+ Candidate Profiles',
                  'Agentic AI for Outreach',
                  'Automated Scheduling',
                  'Advanced Analytics',
                  'Talent Marketing Tools',
                  'Custom Integrations',
                  'Dedicated Support',
                  'Advanced Team Management',
                  'Custom Branding',
                  'Security Compliance',
                  'Dedicated Account Manager',
                  'Priority Support',
                  'Custom Reporting',
                  'API Access',
                  'Enhanced ATS Integration',
                  'Advanced Security & Compliance',
                  'Custom AI Model Training',
                  'SLA Guarantees',
                  'Custom Development',
                  'On-premise Options'
                ].map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {index < 8 ? (
                        <svg className="h-5 w-5 text-purple-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {index < 15 ? (
                        <svg className="h-5 w-5 text-purple-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="h-5 w-5 text-purple-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'Can I change plans later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Our team will help you transition smoothly between plans.'
              },
              {
                question: 'Is there a setup fee?',
                answer: 'No, there are no setup fees. Our team handles onboarding and setup as part of your subscription.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, bank transfers, and corporate purchase orders. Enterprise customers can also pay via invoice.'
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Yes, you can cancel your subscription at any time. Your service will continue until the end of your current billing period.'
              },
              {
                question: 'Do you offer discounts for non-profits?',
                answer: 'Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information.'
              },
              {
                question: 'How long is the implementation process?',
                answer: 'Implementation typically takes 1-2 weeks depending on your organization size and requirements. Our dedicated customer success team will guide you through the entire process.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Transform Your Recruitment Process?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-purple-100">
            Join thousands of companies using Gem to hire 5x faster with AI agents, CRM, and analytics.
          </p>
          
          <div className="mt-10 max-w-md mx-auto">
            <form className="sm:flex">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full px-5 py-3 text-base text-slate-900 placeholder-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full px-5 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
                >
                  Request Demo
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-purple-100">
              Start your journey with our AI-powered recruiting platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}