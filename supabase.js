const SUPABASE_URL = 'https://xboklywxcozobvfrptpr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_amqWmR5MrUSFHlniU2yp3Q_c8kUysEY';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window._supabase = _supabase; // Gør den tilgængelig for alle scripts
