import { supabase } from '../../../lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('bench_list')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching data:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: unknown) {
    console.error('Error processing request:', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('bench_list')
      .insert([
        {
          name: body.name,
          title: body.title,
          experience: body.experience,
          skills: body.skills || [],
          monthly_rate: body.monthly_rate || 'On Request',
          resume_link: body.resume_link,
          market_rate: body.market_rate
        }
      ])
      .select();

    if (error) {
      console.error('Error inserting data:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (e: unknown) {
    console.error('Error processing request:', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), { status: 500 });
  }
}