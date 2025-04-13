import { supabase } from './supabase';

/**
 * Creates the waitlist table in Supabase if it doesn't already exist
 * This function should be called when your app initializes
 */
export async function setupWaitlistTable(): Promise<{ success: boolean; message: string }> {
  try {
    // First check if the table already exists
    const { error: checkError } = await supabase
      .from('waitlist')
      .select('count(*)', { count: 'exact', head: true });
    
    // If we don't get a specific error about the relation not existing, the table likely exists
    if (!checkError || checkError.code !== '42P01') {
      console.log('Waitlist table already exists');
      return { success: true, message: 'Waitlist table already exists' };
    }
    
    // Table doesn't exist, create it using SQL
    // Note: This requires higher privileges than the anon key usually provides
    // You may need to perform this operation from your server or during deployment
    console.log('Creating waitlist table...');
    
    // This SQL statement would need to be executed with appropriate permissions
    // For security reasons, this shouldn't be done client-side in production
    const { error: createError } = await supabase.rpc('create_waitlist_table');
    
    if (createError) {
      console.error('Error creating waitlist table:', createError);
      return { 
        success: false, 
        message: 'Unable to create waitlist table automatically. Please create it manually in the Supabase dashboard.' 
      };
    }
    
    return { success: true, message: 'Waitlist table created successfully' };
  } catch (err) {
    console.error('Error setting up waitlist table:', err);
    return { 
      success: false, 
      message: 'Unexpected error trying to setup waitlist table. Please check console for details.' 
    };
  }
}