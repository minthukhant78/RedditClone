import { supabase } from "../lib/supbase";

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, group:groups(*), user:users!posts_user_id_fkey(*)")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  } else {
    return data;
  }
};

export const fetchPostsById = async (id: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, group:groups(*), user:users!posts_user_id_fkey(*)")
    .eq("id", id)
    .single()
    ;
  if (error) {
    throw error;
  } else {
    return data;
  }
};
