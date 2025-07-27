import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dcfeelpeinfnmiypywgp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZmVlbHBlaW5mbm1peXB5d2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTE4MjQsImV4cCI6MjA2OTE4NzgyNH0.wx3HZ-6vWmygFrQ28pVH3Yck9m45nVl4Ep3dXg4kRXs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)