// Mock data for job postings
const mockJobPostings = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Technology',
    description: 'We are looking for a Senior Software Engineer to join our dynamic technology team. You will be responsible for developing high-quality software solutions.',
    requirements: '5+ years of experience in software development, Expertise in JavaScript, React, and Node.js, Experience with cloud technologies (AWS, Azure, or GCP)',
    experience: 'Senior Level (5+ years)',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    salaryMin: 120000,
    salaryMax: 160000,
    benefits: 'Health insurance, 401(k) matching, Unlimited PTO, Remote work options',
    startDate: '2025-11-01',
    applicationDeadline: '2025-11-20',
    responsibilities: 'Design and implement scalable software solutions, Collaborate with cross-functional teams, Write clean, maintainable code, Participate in code reviews',
    status: 'published',
    createdAt: '2025-10-20T00:00:00Z',
    updatedAt: '2025-10-20T00:00:00Z'
  },
  {
    id: '2',
    title: 'Marketing Manager',
    department: 'Marketing',
    description: 'We are looking for a Marketing Manager to lead our marketing efforts and drive growth through innovative campaigns.',
    requirements: '3-5 years of marketing experience, Bachelor\'s degree in Marketing or related field, Experience with digital marketing tools, Strong analytical skills',
    experience: 'Mid Level (2-5 years)',
    location: 'New York, NY',
    employmentType: 'Full-time',
    salaryMin: 85000,
    salaryMax: 110000,
    benefits: 'Health insurance, Performance bonuses, Flexible schedule',
    startDate: '2025-11-15',
    applicationDeadline: '2025-11-18',
    responsibilities: 'Develop and execute marketing strategies, Manage marketing campaigns, Analyze marketing data and performance, Collaborate with sales team',
    status: 'published',
    createdAt: '2025-10-18T00:00:00Z',
    updatedAt: '2025-10-18T00:00:00Z'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    department: 'Design',
    description: 'We are looking for a UX/UI Designer to create user-centered designs that enhance user experience and engagement.',
    requirements: '2-4 years of UX/UI design experience, Portfolio showcasing design projects, Proficiency in design tools (Figma, Sketch, etc.), Understanding of user research methods',
    experience: 'Mid Level (2-4 years)',
    location: 'Remote',
    employmentType: 'Full-time',
    salaryMin: 75000,
    salaryMax: 95000,
    benefits: 'Health insurance, Performance bonuses, Flexible schedule, Professional development allowance',
    startDate: '2025-11-10',
    applicationDeadline: '2025-11-15',
    responsibilities: 'Design user interfaces and experiences, Create wireframes and prototypes, Conduct user research and testing, Collaborate with developers and product managers',
    status: 'published',
    createdAt: '2025-10-15T00:00:00Z',
    updatedAt: '2025-10-15T00:00:00Z'
  },
  {
    id: '4',
    title: 'Sales Associate',
    department: 'Sales',
    description: 'We are looking for motivated Sales Associates to engage with customers and drive sales in our retail locations.',
    requirements: '0-2 years of sales experience, Strong communication skills, Customer service experience, Ability to work in a fast-paced environment',
    experience: 'Entry Level (0-2 years)',
    location: 'Chicago, IL',
    employmentType: 'Part-time',
    salaryMin: 15,
    salaryMax: 20,
    benefits: 'Commission opportunities, Employee discounts, Flexible scheduling',
    startDate: '2025-11-05',
    applicationDeadline: '2025-11-10',
    responsibilities: 'Assist customers with product selection, Process sales transactions, Maintain store appearance, Meet sales targets',
    status: 'published',
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-10-10T00:00:00Z'
  }
];

export async function GET() {
  try {
    // In a real implementation, this would fetch from a database
    // For now, we return mock data filtered by status
    
    // Filter only published jobs
    const publishedJobs = mockJobPostings.filter(job => job.status === 'published');
    
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'department', 'description', 'requirements', 'experience', 'location'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }), 
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // Create new job posting
    const newJob = {
      id: String(mockJobPostings.length + 1),
      title: body.title,
      department: body.department,
      description: body.description,
      requirements: body.requirements,
      experience: body.experience,
      location: body.location,
      employmentType: body.employmentType || 'Full-time',
      salaryMin: body.salaryMin ? parseInt(body.salaryMin) : null,
      salaryMax: body.salaryMax ? parseInt(body.salaryMax) : null,
      benefits: body.benefits || '',
      startDate: body.startDate || null,
      applicationDeadline: body.applicationDeadline || null,
      responsibilities: body.responsibilities || '',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to mock data (in real implementation, this would save to database)
    mockJobPostings.push(newJob);
    
    return new Response(JSON.stringify(newJob), { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error processing job posting:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}