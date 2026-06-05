const { createClient } = supabase;
const SUPABASE_URL = 'https://vspigbvqrlsambvpnuhp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ZWYxYOyj85_Reaaytk9jQw_Wg9Zr47z';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log('✅ Supabase connected - مركز قنديل');
