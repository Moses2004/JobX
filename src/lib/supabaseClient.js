import { createClient } from '@supabase/supabase-js'

// In Vite, you access environment variables via import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables! Check your Vercel/Local settings.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)