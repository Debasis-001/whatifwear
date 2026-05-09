import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dsysodntdmcmpxlakjll.supabase.co/";
const supabaseAnonKey = "sb_publishable_9xZlcvnyWfZrNBiRTTGFCg_8xpblhLF";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);