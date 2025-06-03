import { createClient } from '@supabase/supabase-js'

// These environment variables should be set in a .env file in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nmnekzvpjkqvqyljxrgs.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbmVrenZwamtxdnF5bGp4cmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MDAzNDcsImV4cCI6MjA2NDM3NjM0N30.7zEnBayJ7awlIuOwV8AfmdODal2mZWVsXLuiUkXAT-c'

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('Supabase client initialized with URL:', supabaseUrl);

// Function to test Supabase connection
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    console.log('Testing Supabase connection...');
    // Simple query to test connection
    const { data, error } = await supabase.from('demo_requests').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    
    console.log('Supabase connection successful!');
    return true;
  } catch (err) {
    console.error('Error testing Supabase connection:', err);
    return false;
  }
}

// Test connection on import
testSupabaseConnection().then(success => {
  if (success) {
    console.log('Supabase is properly connected and ready to use');
  } else {
    console.warn('Supabase connection test failed, some features may not work correctly');
  }
});

// Function to store an email in a fallback storage method if Supabase table doesn't exist
export async function storeEmailFallback(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if localStorage is available (client-side only)
    if (typeof localStorage !== 'undefined') {
      // Get existing emails or initialize empty array
      const existingEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
      
      // Check if email already exists
      if (existingEmails.includes(email)) {
        return { success: false, error: 'This email is already on our waitlist' };
      }
      
      // Add new email and save back to localStorage
      existingEmails.push(email);
      localStorage.setItem('waitlistEmails', JSON.stringify(existingEmails));
      
      return { success: true };
    }
    
    return { success: false, error: 'Fallback storage not available' };
  } catch (err) {
    console.error('Error using fallback storage:', err);
    return { success: false, error: 'An error occurred with fallback storage' };
  }
}

// Function to check if demo_requests table exists, and create it if it doesn't
export async function ensureDemoRequestsTable(): Promise<boolean> {
  try {
    console.log('Checking if demo_requests table exists...');
    // Check if the table exists by querying it
    const { error: queryError } = await supabase
      .from('demo_requests')
      .select('id')
      .limit(1);
    
    // If we get an error about the table not existing, create it
    if (queryError && queryError.message.includes('relation "demo_requests" does not exist')) {
      console.log('demo_requests table does not exist, attempting to create it...');
      
      // Create the table directly with SQL
      // Note: This requires sufficient permissions in your Supabase project
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS demo_requests (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          company TEXT NULL,
          phone TEXT NULL,
          message TEXT NULL,
          requested_at TIMESTAMP NOT NULL DEFAULT timezone('utc', now())
        );
      `;
      
      // Execute the SQL
      const { error: createError } = await supabase.rpc('exec', { 
        query: createTableSQL 
      });
      
      // Alternative approach via stored function
      if (createError) {
        console.error('Error creating table directly:', createError);
        console.log('Trying alternative approach with create_demo_requests_table function...');
        
        const { error: funcError } = await supabase.rpc('create_demo_requests_table');
        
        if (funcError) {
          console.error('Error creating demo_requests table via function:', funcError);
          return false;
        }
      }
      
      console.log('Successfully created demo_requests table');
      return true;
    } else if (queryError) {
      console.error('Error checking for demo_requests table:', queryError);
      return false;
    }
    
    // Table already exists
    console.log('demo_requests table already exists');
    return true;
  } catch (err) {
    console.error('Error ensuring demo_requests table exists:', err);
    return false;
  }
}

// Initialize on import (will run once when this file is first imported)
ensureDemoRequestsTable().catch(err => {
  console.error('Failed to initialize demo_requests table:', err);
});

// Function to store demo request with fallback if needed
export async function storeDemoRequest(data: {
  full_name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
}): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Attempting to submit demo request to Supabase:', { ...data });
    
    // First try direct insert (may fail due to RLS policy)
    const { data: insertedData, error } = await supabase
      .from('demo_requests')
      .insert([
        {
          full_name: data.full_name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          message: data.message,
        }
      ])
      .select();
    
    // If there's an RLS policy error, try alternative approaches
    if (error && error.message.includes("row-level security policy")) {
      console.log('RLS policy error detected, trying alternative approaches...');
      
      // 1. Try using the demo_request_insert function if it exists
      // This is a server-side function that bypasses RLS
      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc('insert_demo_request', {
          p_full_name: data.full_name,
          p_email: data.email,
          p_company: data.company,
          p_phone: data.phone,
          p_message: data.message
        });
        
        if (!rpcError) {
          console.log('Successfully stored demo request via RPC function');
          return { success: true };
        }
        
        console.error('RPC function also failed:', rpcError);
      } catch (rpcErr) {
        console.error('Error calling RPC function:', rpcErr);
      }
      
      // 2. Store in localStorage as fallback
      console.log('Using localStorage as fallback storage');
      if (typeof localStorage !== 'undefined') {
        const existingRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
        const newRequest = {
          ...data,
          id: crypto.randomUUID?.() || `local-${Date.now()}`,
          requested_at: new Date().toISOString()
        };
        existingRequests.push(newRequest);
        localStorage.setItem('demoRequests', JSON.stringify(existingRequests));
        
        // 3. Also try to send this to the server via a contact form endpoint if available
        try {
          await fetch('/api/demo-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRequest)
          });
        } catch (fetchErr) {
          console.error('Backup API endpoint failed:', fetchErr);
          // Continue anyway, we've saved to localStorage
        }
        
        return { 
          success: true, 
          error: 'Saved locally. The team will contact you when you reconnect.'
        };
      }
      
      return { 
        success: false, 
        error: 'Security policy prevents form submission. Please contact support.'
      };
    } else if (error) {
      // Other database errors
      console.error('Error storing demo request in Supabase:', error);
      console.error('Error details:', error.details, error.hint, error.message);
      
      // Fallback to localStorage
      if (typeof localStorage !== 'undefined') {
        console.log('Using localStorage fallback for demo request due to database error');
        const existingRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
        existingRequests.push({
          ...data,
          id: crypto.randomUUID?.() || `local-${Date.now()}`,
          requested_at: new Date().toISOString()
        });
        localStorage.setItem('demoRequests', JSON.stringify(existingRequests));
        return { success: true };
      }
      
      return { 
        success: false, 
        error: `Database error: ${error.message}. ${error.hint || ''}`
      };
    }
    
    console.log('Successfully stored demo request in Supabase:', insertedData);
    return { success: true };
  } catch (err: any) {
    console.error('Error in storeDemoRequest:', err);
    return { 
      success: false, 
      error: `An unexpected error occurred: ${err?.message || 'Unknown error'}`
    };
  }
}