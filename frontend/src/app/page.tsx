'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-First Recruiting Platform
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-10">
              Streamline your hiring operations with our comprehensive management system. 
              From position tracking to candidate management, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => router.push('/role-select')}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Select Role
              </button>
              <button 
                onClick={() => router.push('/login')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-purple-600 transition duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to efficiently manage your HR operations in one place
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Dashboard Analytics",
                description: "Real-time insights into recruitment performance with customizable widgets and visualizations.",
                icon: "📊"
              },
              {
                title: "Position Management",
                description: "Track candidate status, interview progress, and application stages with real-time updates.",
                icon: "💼"
              },
              {
                title: "Application Tracking",
                description: "Streamline candidate applications with priority management and department assignment.",
                icon: "📋"
              },
              {
                title: "Recruiter Management",
                description: "Track recruiter performance, schedules, and department assignments.",
                icon: "👥"
              },
              {
                title: "AI-Powered Sourcing",
                description: "Intelligent candidate discovery using advanced NLP and ML algorithms.",
                icon: "🤖"
              },
              {
                title: "Voice Commands",
                description: "Hands-free operation with voice-enabled controls for accessibility and efficiency.",
                icon: "🎤"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Key Benefits</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transform your HR operations with measurable improvements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "5x faster hiring process",
              "30% reduction in time-to-fill",
              "Improved candidate experience",
              "Data-driven decision making",
              "Reduced bias in hiring",
              "Automated routine tasks",
              "Enhanced collaboration",
              "Comprehensive analytics",
              "Mobile-first design",
              "Offline functionality",
              "PWA compatibility",
              "Enterprise-grade security"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-lg text-slate-700">{benefit}</p>
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
            Join thousands of companies already using Gem to hire faster with AI agents, CRM, and analytics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => router.push('/role-select')}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-100 transition duration-300 shadow-lg"
            >
              Select Role
            </button>
            <button 
              onClick={() => router.push('/login')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-purple-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="inline-flex items-center text-2xl font-bold text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Gem</span>
              </Link>
              <p className="mt-4 text-sm">
                AI-first recruiting platform to help teams hire 5x faster.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/benefits" className="hover:text-white transition">Benefits</Link></li>
                <li><Link href="/use-cases" className="hover:text-white transition">Use Cases</Link></li>
                <li><Link href="/demo" className="hover:text-white transition">Demo</Link></li>
                <li><Link href="/tools" className="hover:text-white transition">Tools</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/documentation" className="hover:text-white transition">Documentation</Link></li>
                <li><Link href="/api-reference" className="hover:text-white transition">API Reference</Link></li>
                <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
                <li><Link href="/status" className="hover:text-white transition">Status</Link></li>
                <li><Link href="/roadmap" className="hover:text-white transition">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/partners" className="hover:text-white transition">Partners</Link></li>
                <li><Link href="/press" className="hover:text-white transition">Press</Link></li>
                <li><Link href="/legal" className="hover:text-white transition">Legal</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p>© {new Date().getFullYear()} Gem. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}