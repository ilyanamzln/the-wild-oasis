import { createClient } from "@supabase/supabase-js";

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabaseUrl = "https://icfydzxheueocsawgwau.supabase.co";

// Main supabase instance
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Serves as a seperator from our "main" supabase instance,
 * so signing up the user function won't interfere with the current user session.
 * If not, the current user session will be replaced by new signed-up user
 */
export const supabase2 = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: "s1",
  },
});

export default supabase;
