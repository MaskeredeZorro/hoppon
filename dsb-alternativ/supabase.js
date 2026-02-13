// supabase.js - Central konfiguration for HoppOn
const SUPABASE_URL = 'https://xboklywxcozobvfrptpr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_amqWmR5MrUSFHlniU2yp3Q_c8kUysEY';

// Initialiser Supabase klienten
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Gør klienten tilgængelig globalt på alle dine sider
window._supabase = _supabase;

console.log("HoppOn Database: Forbundet korrekt ✅");
