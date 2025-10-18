'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Testimonials from '../components/Testimonials'
import WorkdayPartnerBadge from '../components/WorkdayPartnerBadge'
import PlatformFeatures from '../components/PlatformFeatures'
import SolutionsSection from '../components/SolutionsSection'
import ProductIntegrations from '../components/ProductIntegrations'
import TalentMarketing from '../components/TalentMarketing'

export default function HomePage() {
  const router = useRouter()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('template')
  const [notification, setNotification] = useState<{message: string, type: string} | null>(null)

  const features = [
    {
      title: "AI Overview",
      description: "Get intelligent insights into your recruiting efforts with predictive analytics and automated recommendations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Agentic AI",
      description: "Autonomous agents that handle candidate outreach, screening, and follow-up without manual intervention.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "ATS",
      description: "Seamlessly connect with your existing ATS to streamline workflows and avoid duplicate data entry.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      title: "CRM",
      description: "Centralized candidate relationship management with rich profiles and engagement history.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Sourcing",
      description: "Automated candidate sourcing with access to 650M+ profiles and intelligent matching algorithms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Analytics",
      description: "Advanced reporting and analytics to optimize your recruiting process and measure ROI.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ]

  const pricingPlans = [
    {
      id: 'template',
      name: 'Gem All-in-One',
      price: 'Contact Sales',
      description: 'Complete recruiting platform for 1-100 employees',
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
      cta: 'Get Started'
    },
    {
      id: 'backend',
      name: 'Gem All-in-One',
      price: 'Contact Sales',
      description: 'Complete recruiting platform for 101-1000 employees',
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
      cta: 'Get Started'
    },
    {
      id: 'full',
      name: 'Gem Enterprise',
      price: 'Contact Sales',
      description: 'Enterprise-grade recruiting solution with ATS integration',
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
      popular: true
    }
  ]

  const benefits = [
    "5x productivity with AI and automation",
    "Up to 50% cost savings on tech and sourcing",
    "50% reduction in time-to-hire",
    "4.8/5 average G2 user rating",
    "Trusted by 1,200+ talent acquisition teams",
    "Consolidate 3-5 tools into one platform"
  ]

  const useCases = [
    "Startups launching with the right talent",
    "Growth companies consolidating tools & reducing costs",
    "Enterprises hiring faster with AI-powered solutions",
    "Recruiting firms seeking all-in-one platform",
    "Companies needing better candidate experience",
    "Organizations requiring ATS integration"
  ]

  const technologies = [
    { name: "Next.js 14+", category: "Frontend Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "React", category: "UI Library" },
    { name: "Node.js", category: "Backend Runtime" },
    { name: "Express", category: "Backend Framework" },
    { name: "MongoDB", category: "Database" },
    { name: "AI/ML Models", category: "Intelligence" },
    { name: "Vercel", category: "Deployment" },
    { name: "Recharts", category: "Data Visualization" }
  ]

  const testimonials = [
    {
      quote: "Without Gem, I had to go look in four different places to piece together a story. With Gem, you have a track record of success and excellence. This is a tool that is not just solving for one of your recruiting needs, Gem wants to solve for all of them.",
      author: "Sammy Reardon",
      role: "Senior Director of Recruiting",
      company: "One Medical"
    },
    {
      quote: "Within the first 30 days of using Gem, we were filling positions that had been open for over a year",
      author: "Jaime Schmitt",
      role: "Talent Attraction Manager",
      company: "Celestica"
    }
  ]

  const solutionCategories = [
    {
      title: "For Startups",
      description: "1-100 EMPLOYEES",
      icon: <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-lg flex items-center justify-center">S</div>
    },
    {
      title: "For Growth",
      description: "101-1000 EMPLOYEES",
      icon: <div className="bg-green-100 text-green-800 w-12 h-12 rounded-lg flex items-center justify-center">G</div>
    },
    {
      title: "For Enterprise",
      description: "1000+ EMPLOYEES",
      icon: <div className="bg-purple-100 text-purple-800 w-12 h-12 rounded-lg flex items-center justify-center">E</div>
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 flex-wrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-slate-800">Gem</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-10 flex-wrap">
              <a href="#features" className="text-slate-600 hover:text-purple-600 font-medium">Platform</a>
              <a href="#solutions" className="text-slate-600 hover:text-purple-600 font-medium">Solutions</a>
              <a href="#pricing" className="text-slate-600 hover:text-purple-600 font-medium">Pricing</a>
              <a href="#testimonials" className="text-slate-600 hover:text-purple-600 font-medium">Customers</a>
            </nav>
            <div className="flex items-center space-x-4 flex-wrap">
              <button 
                onClick={() => router.push('/login')}
                className="text-slate-600 hover:text-purple-600 font-medium"
              >
                Log In
              </button>
              <button 
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition duration-300"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Workday Innovation Partner Badge
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
              AI-first All-in-one recruiting software
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
              The only AI-first all-in-one recruiting platform. Save time, money, and the headaches of juggling multiple tools. 
              Gem brings together your ATS, CRM, sourcing, scheduling, and analytics — plus 650M+ profiles to source from — with AI built into every workflow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Request a demo
              </button>
              <button 
                onClick={() => setIsPreviewOpen(true)}
                className="bg-white text-purple-600 border border-purple-500 px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-50 transition duration-300"
              >
                4.8/5 on G2
              </button>
            </div>
            <div className="mt-8 text-slate-600">
              Trusted by 1,200+ talent acquisition teams
            </div>
          </div>
        </div>
      </section>

      <PlatformFeatures />

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need for modern, AI-powered recruiting
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Gem Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Gem</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the power of a truly connected recruiting platform — one consistent interface, unified data, 
              smarter AI recommendations, and simplified permissions.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Use products that work better together</h3>
                <p className="text-slate-600 mb-4">
                  Cut technology costs by 30-50% while boosting recruiter productivity up to 5x. 
                  With Gem, you have a track record of success and excellence.
                </p>
                <p className="text-slate-600">
                  "This is a tool that is not just solving for one of your recruiting needs, 
                  Gem wants to solve for all of them." - Sammy Reardon, One Medical
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-8 w-full max-w-md">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-700 mb-2">30-50%</div>
                    <div className="text-lg text-purple-600">Technology Cost Reduction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SolutionsSection />

      <ProductIntegrations />

      <TalentMarketing />

      {/* Results Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Achieve results with tech your team will love</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Gem is designed for simplicity. Recruiters spend less time figuring things out and more time making hires, faster.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "5x", label: "recruiter productivity with AI and automation", icon: "⚡" },
              { value: "30-50%", label: "cost savings on tech, external sourcing, and ads", icon: "💰" },
              { value: "50%", label: "reduction in average time-to-hire", icon: "⏱️" },
              { value: "4.8/5", label: "average G2 user rating (industry best)", icon: "⭐" }
            ].map((metric, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-purple-600 mb-2">{metric.value}</div>
                <div className="text-slate-600 mb-4">{metric.label}</div>
                <div className="text-3xl">{metric.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorkdayPartnerBadge />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include our core features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular 
                    ? 'ring-2 ring-purple-500 transform scale-105 z-10 bg-white' 
                    : 'bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="bg-purple-500 text-white text-center py-2">
                    <span className="text-sm font-semibold">ENTERPRISE FAVORITE</span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    {plan.id !== 'template' && <span className="text-slate-600">/user/month</span>}
                  </div>
                  <p className="text-slate-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      setSelectedPlan(plan.id)
                      setNotification({
                        message: `Contact sales for ${plan.name} would be implemented here`,
                        type: 'success'
                      })
                      setTimeout(() => setNotification(null), 3000)
                    }}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-md'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="tech" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Modern Technology Stack</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built with cutting-edge technologies for optimal performance and AI capabilities
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100 transition duration-300">
                <h3 className="font-semibold text-slate-800">{tech.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Recruitment Process?</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-10">
            Join hundreds of companies already using Gem to hire 5x faster with AI agents, CRM, and analytics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => router.push('/dashboard')}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-100 transition duration-300 shadow-lg"
            >
              Request a demo
            </button>
            <button 
              onClick={() => setIsPreviewOpen(true)}
              className="bg-purple-700 text-white border border-purple-300 px-8 py-4 rounded-lg font-medium text-lg hover:bg-purple-800 transition duration-300"
            >
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-white">Gem</span>
              </div>
              <p className="mt-4 text-sm">
                AI-first recruiting platform to help teams hire 5x faster.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Why Gem</a></li>
                <li><a href="#" className="hover:text-white transition">Talent 360</a></li>
                <li><a href="#" className="hover:text-white transition">Product Integrations</a></li>
                <li><a href="#" className="hover:text-white transition">CRM</a></li>
                <li><a href="#" className="hover:text-white transition">Full-Funnel Analytics</a></li>
                <li><a href="#" className="hover:text-white transition">Gem ATS</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Enterprise</a></li>
                <li><a href="#" className="hover:text-white transition">Growth</a></li>
                <li><a href="#" className="hover:text-white transition">Startups</a></li>
                <li><a href="#" className="hover:text-white transition">By Industry</a></li>
                <li><a href="#" className="hover:text-white transition">By Need</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Resource Center</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Customers</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Tools</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 pt-8 border-t border-slate-800">
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
                <li><a href="#" className="hover:text-white transition">Newsroom</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
                <li><a href="#" className="hover:text-white transition">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Socials</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                  X/Twitter
                </a></li>
                <li><a href="#" className="hover:text-white transition flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                  LinkedIn
                </a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Sales</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
            <p>© 2025 Gem. All rights reserved. Various trademarks held by their respective owners.</p>
          </div>
        </div>
      </footer>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto max-w-[calc(100vw-2rem)]">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-slate-800">Gem Feature Preview</h3>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-slate-100 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Interactive Dashboard Preview</h4>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Experience the full Gem dashboard with AI-powered analytics, candidate management, 
                    and sourcing tools.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="text-3xl font-bold text-purple-600 mb-1">95%</div>
                  <div className="text-slate-600">Candidate Satisfaction</div>
                </div>
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="text-3xl font-bold text-purple-600 mb-1">5x</div>
                  <div className="text-slate-600">Recruiter Productivity</div>
                </div>
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="text-3xl font-bold text-purple-600 mb-1">50%</div>
                  <div className="text-slate-600">Reduction in Time-to-Hire</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Key Features Included:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>AI-Powered Dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Agentic AI for Outreach</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>650M+ Candidate Profiles</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Automated Scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>ATS Integration</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setIsPreviewOpen(false)
                    router.push('/dashboard')
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition duration-300"
                >
                  View Full Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn">
          {notification.message}
        </div>
      )}
    </div>
  )
}