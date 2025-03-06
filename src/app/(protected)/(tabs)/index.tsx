import { View, FlatList, ActivityIndicator, Text } from "react-native";
import PostListItem from "../../../components/PostListItem ";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supbase";
import { Tables } from "../../../types/database.types";

type Post = Tables<"posts"> & {
  user: Tables<"users">;
  group: Tables<"groups">;
  };
export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, group:groups(*), user:users!posts_user_id_fkey(*)");
    if (error) {
      console.log(error);
    } else {
      setPosts(data);
    }
  };


  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </View>
  );
}
