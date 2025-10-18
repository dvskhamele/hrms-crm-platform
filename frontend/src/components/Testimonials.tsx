'use client'

import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Without Gem, I had to go look in four different places to piece together a story. With Gem, you have a track record of success and excellence. This is a tool that is not just solving for one of your recruiting needs, Gem wants to solve for all of them.",
      author: "Sammy Reardon",
      role: "Senior Director of Recruiting",
      company: "One Medical",
      logo: "OM",
      rating: 5
    },
    {
      id: 2,
      quote: "Within the first 30 days of using Gem, we were filling positions that had been open for over a year",
      author: "Jaime Schmitt",
      role: "Talent Attraction Manager",
      company: "Celestica",
      logo: "C",
      rating: 5
    },
    {
      id: 3,
      quote: "Recruiters are meeting their SLAs because they have access to precisely the data that helps them do so.",
      author: "Emily Russell",
      role: "Senior Global Data Analyst for Recruiting",
      company: "Unity",
      logo: "U",
      rating: 5
    }
  ]

  const caseStudies = [
    {
      id: 1,
      title: "One Medical",
      description: "3+ tools consolidated, $15,000 saved in annual spend",
      result: "30% improvement in hiring efficiency"
    },
    {
      id: 2,
      title: "Celestica",
      description: "700+ hires in 90 days",
      result: "Positions filled that had been open for over a year"
    },
    {
      id: 3,
      title: "Unity",
      description: "10 day reduction in time-to-fill",
      result: "+20% above industry average offer accept rate"
    },
    {
      id: 4,
      title: "Yext",
      description: "1+ week faster time to hire than industry average",
      result: "High sense of urgency maintained across team"
    }
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hear from our customers</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Over 1,200 companies, from startups to large enterprises, trust Gem to fuel their growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-md border border-slate-100">
              <div className="text-yellow-400 text-4xl mb-4">"</div>
              <p className="text-lg text-slate-700 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.logo}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                  <div className="text-sm text-purple-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Case Studies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-slate-800 mb-2">{study.title}</h4>
                <p className="text-slate-600 text-sm mb-3">{study.description}</p>
                <p className="text-purple-600 font-medium text-sm">{study.result}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to join our customer success stories?</h3>
          <p className="mb-6 max-w-2xl mx-auto">See how companies like yours are transforming their recruiting with Gem.</p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition duration-300 shadow-lg">
            Request a Demo
          </button>
        </div>
      </div>
    </div>
  )
}

export default Testimonials