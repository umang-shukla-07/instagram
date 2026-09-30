import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://tteafvuwusoahafqwcye.supabase.co';

const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  'sb_publishable_DLnG4b1VgOfW9JWG7cEVqA_8lmafm91';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Key is missing. Check your environment variables or configuration.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
