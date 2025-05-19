import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://vpjehludmfbdnerkgzop.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwamVobHVkbWZiZG5lcmtnem9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1OTE3MjQsImV4cCI6MjA2MDE2NzcyNH0.Vb68xTc2Mxtg1Pg8AevN3cJD1urYmZN5GMUzK-MK1Mk',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export default supabase;
