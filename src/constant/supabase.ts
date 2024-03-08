import { Database } from "@/model/database/database.types";
import { createClient } from "@supabase/supabase-js";

export const SUPABASE = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);