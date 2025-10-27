import { NextRequest } from 'next/server';

// Mock data for workshop registrations
const mockRegistrations = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '9876543210',
    track: 'python',
    experience: 'beginner',
    registeredAt: '2025-10-20T10:30:00Z',
    attended: false,
    completed: false
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '9876543211',
    track: 'java',
    experience: 'intermediate',
    registeredAt: '2025-10-20T11:15:00Z',
    attended: true,
    completed: true
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    phone: '9876543212',
    track: 'python',
    experience: 'beginner',
    registeredAt: '2025-10-20T14:20:00Z',
    attended: false,
    completed: false
  },
  {
    id: '4',
    name: 'Priya Patel',
    email: 'priya.p@example.com',
    phone: '9876543213',
    track: 'java',
    experience: 'advanced',
    registeredAt: '2025-10-21T09:45:00Z',
    attended: true,
    completed: false
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real implementation, this would fetch from a database
    // For now, we return mock data
    
    // Check if there's data in localStorage (simulated)
    const localStorageData = typeof window !== 'undefined' ? localStorage.getItem('workshopRegistrations') : null;
    
    if (localStorageData) {
      return new Response(JSON.stringify(JSON.parse(localStorageData)), { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
    
    // Return mock data if no localStorage data
    return new Response(JSON.stringify(mockRegistrations), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error fetching workshop registrations:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch workshop registrations' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real implementation, this would save to a database
    // For now, we simulate saving to localStorage
    
    // Get existing data
    const localStorageData = typeof window !== 'undefined' ? localStorage.getItem('workshopRegistrations') : null;
    let registrations = localStorageData ? JSON.parse(localStorageData) : [...mockRegistrations];
    
    // Add new registration
    const newRegistration = {
      id: String(registrations.length + 1),
      ...body,
      registeredAt: new Date().toISOString()
    };
    
    registrations.push(newRegistration);
    
    // Save back to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('workshopRegistrations', JSON.stringify(registrations));
    }
    
    return new Response(JSON.stringify(newRegistration), { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error creating workshop registration:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create workshop registration' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    // In a real implementation, this would update in a database
    // For now, we simulate updating in localStorage
    
    // Get existing data
    const localStorageData = typeof window !== 'undefined' ? localStorage.getItem('workshopRegistrations') : null;
    let registrations = localStorageData ? JSON.parse(localStorageData) : [...mockRegistrations];
    
    // Update registration
    const updatedRegistrations = registrations.map((reg: any) => 
      reg.id === id ? { ...reg, ...updates, updatedAt: new Date().toISOString() } : reg
    );
    
    // Save back to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('workshopRegistrations', JSON.stringify(updatedRegistrations));
    }
    
    const updatedRegistration = updatedRegistrations.find((reg: any) => reg.id === id);
    
    return new Response(JSON.stringify(updatedRegistration), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error updating workshop registration:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update workshop registration' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}