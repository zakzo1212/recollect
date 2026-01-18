import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function getServerSupabase() {
  const cookieStore = await cookies();
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        // In Next.js API routes, we can't set cookies directly
        // The client-side will handle session persistence
      },
      remove(name: string, options: any) {
        // In Next.js API routes, we can't remove cookies directly
      },
    },
  });
}

export async function getCurrentUser() {
  try {
    const supabase = await getServerSupabase();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting user:', error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return null;
  }
}
