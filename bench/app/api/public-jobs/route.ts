import { NextRequest } from 'next/server';

// Mock data for job listings
const mockJobs = [
  {
    id: 'job-1',
    title: 'Senior Software Engineer',
    department: 'Technology',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    experience: '5+ years',
    salaryMin: 120000,
    salaryMax: 160000,
    description: 'We are looking for a Senior Software Engineer to join our team. You will be responsible for developing high-quality software solutions.',
    requirements: 'JavaScript, React, Node.js, AWS, Docker, Kubernetes',
    responsibilities: 'Design and implement scalable software solutions, Collaborate with cross-functional teams, Write clean, maintainable code, Participate in code reviews',
    benefits: 'Health insurance, 401(k) matching, Unlimited PTO, Remote work options',
    postedDate: '2025-10-20',
    deadline: '2025-11-20',
    status: 'published'
  },
  {
    id: 'job-2',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'New York, NY',
    employmentType: 'Full-time',
    experience: '3-5 years',
    salaryMin: 85000,
    salaryMax: 110000,
    description: 'We are looking for a Marketing Manager to lead our marketing efforts and drive growth through innovative campaigns.',
    requirements: 'Digital marketing, SEO, PPC, Content strategy, Analytics',
    responsibilities: 'Develop and execute marketing strategies, Manage marketing campaigns, Analyze marketing data and performance, Collaborate with sales team',
    benefits: 'Health insurance, Performance bonuses, Flexible schedule',
    postedDate: '2025-10-18',
    deadline: '2025-11-18',
    status: 'published'
  },
  {
    id: 'job-3',
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote',
    employmentType: 'Full-time',
    experience: '2-4 years',
    salaryMin: 75000,
    salaryMax: 95000,
    description: 'We are looking for a UX/UI Designer to create user-centered designs that enhance user experience and engagement.',
    requirements: 'Figma, Sketch, Adobe XD, User research, Prototyping',
    responsibilities: 'Design user interfaces and experiences, Create wireframes and prototypes, Conduct user research and testing, Collaborate with developers and product managers',
    benefits: 'Health insurance, Flexible work hours, Professional development allowance',
    postedDate: '2025-10-15',
    deadline: '2025-11-15',
    status: 'published'
  },
  {
    id: 'job-4',
    title: 'Sales Associate',
    department: 'Sales',
    location: 'Chicago, IL',
    employmentType: 'Part-time',
    experience: '0-2 years',
    salaryMin: 15,
    salaryMax: 20,
    description: 'We are looking for motivated Sales Associates to engage with customers and drive sales in our retail locations.',
    requirements: 'Customer service, Communication skills, POS systems',
    responsibilities: 'Assist customers with product selection, Process sales transactions, Maintain store appearance, Meet sales targets',
    benefits: 'Commission opportunities, Employee discounts, Flexible scheduling',
    postedDate: '2025-10-10',
    deadline: '2025-11-10',
    status: 'published'
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real implementation, this would fetch from a database
    // For now, we return mock data filtered by status
    
    // Filter only published jobs
    const publishedJobs = mockJobs.filter(job => job.status === 'published');
    
    return new Response(JSON.stringify(publishedJobs), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error fetching job listings:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch job listings' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}