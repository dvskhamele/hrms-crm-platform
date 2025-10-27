import { NextRequest } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract fields from form data
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const coverLetter = formData.get('coverLetter') as string || '';
    const jobId = formData.get('jobId') as string;
    const resume = formData.get('resume') as File | null;

    // Validate required fields
    if (!fullName || !email || !phone || !jobId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate phone (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return new Response(
        JSON.stringify({ error: 'Phone number must be 10 digits' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Handle file upload if resume is provided
    let resumeUrl = null;
    if (resume && resume.size > 0) {
      const fileExt = resume.name.split('.').pop();
      const fileName = `${Date.now()}_${fullName.replace(/\s+/g, '_')}.${fileExt}`;
      
      const { data, error: uploadError } = await supabase
        .storage
        .from('resumes')
        .upload(fileName, resume, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading resume:', uploadError);
        // Don't fail the entire application if resume upload fails
        // Just log the error and continue
      } else {
        resumeUrl = data.path;
      }
    }

    // Insert application into database
    const { data, error } = await supabase
      .from('job_applications')
      .insert([
        {
          job_id: jobId,
          full_name: fullName,
          email: email,
          phone: phone,
          cover_letter: coverLetter,
          resume_url: resumeUrl,
          status: 'submitted',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Error inserting application:', error);
      return new Response(
        JSON.stringify({ error: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: 'Application submitted successfully', 
        application: data[0] 
      }), 
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (e: unknown) {
    console.error('Error processing request:', e);
    return new Response(
      JSON.stringify({ 
        error: e instanceof Error ? e.message : 'Unknown error' 
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET() {
  try {
    // Fetch all job applications
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
      return new Response(
        JSON.stringify({ error: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(data), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (e: unknown) {
    console.error('Error processing request:', e);
    return new Response(
      JSON.stringify({ 
        error: e instanceof Error ? e.message : 'Unknown error' 
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}