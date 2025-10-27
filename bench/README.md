# Signimus Recruitment System

A comprehensive recruitment solution that allows candidates to apply without creating accounts and provides employers with a streamlined hiring workflow.

## Features

### For Candidates (No Account Required)
- Apply to jobs without registration
- Upload resumes and submit cover letters
- Real-time application status tracking
- Access to public job listings

### For Employers
- Talent bench management
- Job posting to multiple platforms
- Candidate application tracking
- Interview scheduling
- Comprehensive dashboard

## System Architecture

### Core Components
1. **Public Job Listings** - Browse and apply to jobs without logging in
2. **Talent Bench** - Manage a pool of pre-vetted candidates
3. **Job Posting** - Create and publish job listings
4. **Application Management** - Track and manage candidate applications
5. **Dashboard** - Central hub for recruitment analytics

### Technologies
- Next.js 13+ with App Router
- React 18+
- TypeScript
- Tailwind CSS
- Supabase (Backend-as-a-Service)
- PostgreSQL (Database)

## Setup Instructions

### Prerequisites
1. Node.js v18+
2. npm or yarn
3. Docker Desktop (for Supabase)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hrmscrm/bench
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the complete system:
   ```bash
   ./setup-complete.sh
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Visit the application:
   - Public Jobs: http://localhost:3000/public/jobs
   - Talent Bench: http://localhost:3000/bench
   - Employer Dashboard: http://localhost:3000/dashboard
   - Job Posting: http://localhost:3000/job-posting

## Key Functionalities

### Talent Bench Management
- View and filter talent profiles
- Search by skills, experience, and job requirements
- Select candidates for interviews
- Export candidate information

### Job Posting Workflow
1. Create job description
2. Set requirements and responsibilities
3. Define compensation and benefits
4. Select posting platforms (LinkedIn, Indeed, etc.)
5. Publish with one click

### Application Processing
- Receive applications without candidate accounts
- Review resumes and cover letters
- Schedule interviews
- Track candidate progress

### Integration Capabilities
- Connect with LinkedIn, Indeed, Unstop, Prosple
- Email notifications via MailerLite, Brevo
- WhatsApp community management
- Calendly integration for scheduling

## Folder Structure

```
bench/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── bench/              # Talent bench pages
│   ├── dashboard/          # Employer dashboard
│   ├── job-posting/        # Job posting pages
│   ├── public/             # Public pages (no login required)
│   └── apply/              # Job application pages
├── lib/                    # Utility functions and configurations
├── supabase/              # Supabase configuration and migrations
└── scripts/                # Setup and utility scripts
```

## Database Schema

### bench_list
Stores information about talent bench profiles.

### job_postings
Contains job listings with all relevant details.

### job_applications
Tracks candidate applications to jobs.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup

The system uses Supabase for:
- Database storage (PostgreSQL)
- Authentication
- Storage (for resumes)
- Real-time subscriptions

Run the following to set up Supabase locally:
```bash
npx supabase start
```

## Deployment

### Local Development
1. Run `./setup-complete.sh` to initialize everything
2. Run `npm run dev` to start the development server

### Production Deployment
The application can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- Custom server deployment

## API Endpoints

### Public Endpoints
- `GET /api/bench-list` - Retrieve talent bench profiles
- `GET /api/job-posting` - Retrieve published job listings
- `POST /api/job-application` - Submit job applications

### Admin Endpoints
- `POST /api/job-posting` - Create new job postings
- `PUT /api/job-posting/:id` - Update job postings
- `GET /api/job-application` - Retrieve job applications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## License

This project is proprietary to Signimus Technologies Private Limited.

## Support

For support, contact:
- Email: hr@signimus.com
- WhatsApp: +91 82259 98112