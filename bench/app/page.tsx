'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-16 mt-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
            Welcome to Signimus
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            AI-first recruiting platform connecting top talent with innovative companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Job Seekers Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-teal-500 to-teal-600"></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-slate-800">For Job Seekers</h2>
              </div>
              
              <p className="text-slate-600 mb-8">
                Find your dream job without the complexity. Browse opportunities, apply directly, 
                and build your career with our AI-powered matching system.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Apply to jobs without creating an account</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">AI-powered job matching</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Real-time application tracking</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Career development resources</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/public/jobs" 
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 text-center"
                >
                  Browse Jobs
                </Link>
                <Link 
                  href="/workshop/registration" 
                  className="flex-1 px-6 py-3 border border-teal-500 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition duration-300 text-center"
                >
                  Free Workshop
                </Link>
              </div>
            </div>
          </div>

          {/* Employers Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3v-4m0 0v-4m0 4h16m0 0v-4m0 4H3" />
                  </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-slate-800">For Employers</h2>
              </div>
              
              <p className="text-slate-600 mb-8">
                Streamline your hiring process with our integrated platform. Post jobs, find top talent, 
                and manage your recruitment workflow efficiently.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Post to multiple platforms with one click</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">AI-powered candidate matching</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Centralized application management</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Talent bench for quick hiring</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/job-posting" 
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition duration-300 text-center"
                >
                  Post Jobs
                </Link>
                <Link 
                  href="/workshop/registration" 
                  className="flex-1 px-6 py-3 border border-purple-500 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition duration-300 text-center"
                >
                  Free Workshop
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-3xl font-bold text-teal-600">500+</p>
            <p className="text-slate-600 mt-2">Jobs Posted</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-3xl font-bold text-purple-600">10,000+</p>
            <p className="text-slate-600 mt-2">Candidates</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-3xl font-bold text-amber-600">2,500+</p>
            <p className="text-slate-600 mt-2">Successful Hires</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600">95%</p>
            <p className="text-slate-600 mt-2">Satisfaction Rate</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Join thousands of companies using Signimus to find top talent and build winning teams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/job-posting" 
              className="px-8 py-4 bg-white text-teal-600 font-bold rounded-lg shadow-lg hover:bg-slate-100 transition duration-300"
            >
              Post Your First Job
            </Link>
            <a 
              href="https://readylaunch.signimus.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 transition duration-300"
            >
              🚀 Purchase Complete Solution
            </a>
          </div>
          <p className="mt-6 text-teal-100 text-sm">
            No credit card required for trial • 14-day free trial • Cancel anytime
          </p>
        </div>

        {/* Additional Purchase Options */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-bold text-slate-800">Starter Plan</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Perfect for small teams getting started with recruitment automation
            </p>
            <div className="text-2xl font-bold text-slate-800 mb-4">
              ₹4,999<span className="text-lg font-normal text-slate-600">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Up to 25 job postings</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Basic candidate matching</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Email support</span>
              </li>
            </ul>
            <a 
              href="https://readylaunch.signimus.com?plan=starter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition duration-300 text-center block"
            >
              Get Started
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-500 relative">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              MOST POPULAR
            </div>
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-bold text-slate-800">Professional Plan</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Ideal for growing teams with advanced recruitment needs
            </p>
            <div className="text-2xl font-bold text-slate-800 mb-4">
              ₹9,999<span className="text-lg font-normal text-slate-600">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Unlimited job postings</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Advanced candidate matching</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">AI-powered screening</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Priority support</span>
              </li>
            </ul>
            <a 
              href="https://readylaunch.signimus.com?plan=professional" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition duration-300 text-center block"
            >
              Get Professional Plan
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-bold text-slate-800">Enterprise Plan</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Complete solution for large organizations with custom needs
            </p>
            <div className="text-2xl font-bold text-slate-800 mb-4">
              Custom
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Everything in Professional Plan</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Custom integrations</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Dedicated account manager</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">SLA guarantees</span>
              </li>
            </ul>
            <a 
              href="https://readylaunch.signimus.com?plan=enterprise" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition duration-300 text-center block"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}