import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pbktwyqkpgjjkbajnnig.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBia3R3eXFrcGdqamtiYWpubmlnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODgwOTY0OSwiZXhwIjoxOTk0Mzg1NjQ5fQ.VdKqvfnllkURtwcZSXb1SrgM9PJ_wnFYx3wv-p8UvfM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
