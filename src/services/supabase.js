import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "../utils/constants";

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Main supabase instance
const supabase = createClient(SUPABASE_URL, supabaseKey);

/**
 * Serves as a seperator from our "main" supabase instance,
 * so signing up the user function won't interfere with the current user session.
 * If not, the current user session will be replaced by new signed-up user
 */
export const supabase2 = createClient(SUPABASE_URL, supabaseKey, {
  auth: {
    storageKey: "s1",
  },
});

export default supabase;
