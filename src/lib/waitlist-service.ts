import { supabase, storeEmailFallback } from './supabase';

export interface WaitlistSignup {
  email: string;
  created_at?: string;
}

// Add a message property to the return type for non-error feedback
export async function addToWaitlist(email: string): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    // Enhanced input validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { success: false, error: 'Please provide a valid email address' };
    }

    const cleanEmail = email.trim().toLowerCase();
    console.log('Attempting to add email to waitlist:', cleanEmail);
    
    // Check if Supabase client is properly initialized
    if (!supabase) {
      console.error('Supabase client not initialized, attempting fallback.');
      return await storeEmailFallback(cleanEmail);
    }
    
    // First, try to insert into the Supabase table
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email: cleanEmail }])
      .select();

    if (error) {
      console.error('Error adding to waitlist:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      
      // Handle unique constraint violation (email already exists)
      if (error.code === '23505') {
        // Return success, but indicate they are already registered
        console.log('Email already exists in waitlist:', cleanEmail);
        return { success: true, message: 'You\'re already on our waitlist!' };
      }
      
      // For any other Supabase error during insert, attempt fallback
      console.warn(`Supabase insert failed (Code: ${error.code || 'Unknown'}). Attempting fallback storage.`);
      try {
        return await storeEmailFallback(cleanEmail);
      } catch (fallbackErr) {
         console.error('Fallback storage also failed:', fallbackErr);
         // Provide a generic error if fallback fails too
         return { 
           success: false, 
           error: 'We\'re experiencing technical difficulties adding you to the waitlist. Please try again later.' 
         };
      }
    }

    console.log('Successfully added to waitlist:', data);
    return { success: true };
  } catch (err) {
    console.error('Unexpected error during waitlist signup:', err);
    
    // Try fallback as a last resort for unexpected errors
    try {
      console.log('Attempting fallback storage method due to unexpected error.');
      // Ensure email is cleaned here too, in case the error happened before cleaning
      const cleanEmailForFallback = (typeof email === 'string' ? email : '').trim().toLowerCase();
      if (!cleanEmailForFallback) {
         throw new Error("Email became invalid during unexpected error handling.");
      }
      return await storeEmailFallback(cleanEmailForFallback);
    } catch (fallbackErr) {
      console.error('Fallback storage also failed after unexpected error:', fallbackErr);
      return { 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.' 
      };
    }
  }
}

export async function getWaitlistCount(): Promise<number> {
  try {
    // Try to get count from Supabase
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error getting waitlist count from Supabase:', error);
      
      // Try fallback
      if (typeof localStorage !== 'undefined') {
        const localEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
        return localEmails.length;
      }
      
      return 0;
    }

    return count ?? 0;
  } catch (err) {
    console.error('Unexpected error getting count:', err);
    
    // Try fallback
    if (typeof localStorage !== 'undefined') {
      const localEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
      return localEmails.length;
    }
    
    return 0;
  }
}