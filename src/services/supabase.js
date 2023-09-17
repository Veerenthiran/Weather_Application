import { createClient } from '@supabase/supabase-js' 
const supabaseUrl = 'https://hoivyvtbhsohoouvvtkp.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvaXZ5dnRiaHNvaG9vdXZ2dGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3OTgzOTUsImV4cCI6MjAxMDM3NDM5NX0.ThyfsVwRjJ9yPwdhFGvEA4M7LgADlLLndMdtUgDPa_4' 
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;