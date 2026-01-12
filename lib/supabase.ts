import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      ideas: {
        Row: {
          id: string;
          text: string;
          tags: string[];
          created_at: string;
          done: boolean;
          done_at: string | null;
          user_id: string | null; // Will be used when we add auth
        };
        Insert: {
          id?: string;
          text: string;
          tags?: string[];
          created_at?: string;
          done?: boolean;
          done_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          text?: string;
          tags?: string[];
          created_at?: string;
          done?: boolean;
          done_at?: string | null;
          user_id?: string | null;
        };
      };
    };
  };
}
