import { createClient } from "@supabase";

const supabaseUrl = "https://rmbelkrhtqvhfouksgns.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtYmVsa3JodHF2aGZvdWtzZ25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU0NDk4ODgsImV4cCI6MTk4MTAyNTg4OH0.DlacXbFn4igEydqhVBf5hji9UBeInEujyAV-UhtKbfg";

export const supabaseClient = createClient(supabaseUrl, supabaseKey, { fetch });
