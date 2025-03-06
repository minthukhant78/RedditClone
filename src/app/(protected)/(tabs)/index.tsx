import { View, FlatList, ActivityIndicator, Text } from "react-native";
import PostListItem from "../../../components/PostListItem ";
import posts from "../../../../assets/data/posts.json";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supbase";
export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const {data, error} = await supabase.from("posts").select("*, group:groups(*), user:users!posts_user_id_fkey(*)");
    setPosts(data);
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