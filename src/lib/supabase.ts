import { createClient } from '@supabase/supabase-js'

// These environment variables should be set in a .env file in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hlfnvdilgujaascyoupt.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsZm52ZGlsZ3VqYWFzY3lvdXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NzgwNjAsImV4cCI6MjA2MDA1NDA2MH0.YxLcL6GY3B0qT8cuCg_t5TnoysPlLI_UaCu07ytoakk'

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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