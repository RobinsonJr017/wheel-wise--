/// <reference types="vite/client" />
// set the window.supabase global variable
declare global {
  interface Window {
    supabase: import("@supabase/supabase-js").SupabaseClient;
  }
}

export type {};