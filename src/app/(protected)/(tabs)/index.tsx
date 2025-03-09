import { View, FlatList, ActivityIndicator, Text } from "react-native";
import PostListItem from "../../../components/PostListItem ";
import { supabase } from "../../../lib/supbase";
import { useQuery } from "@tanstack/react-query";



const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, group:groups(*), user:users!posts_user_id_fkey(*)");
  if (error) {
    throw error;
  } else {
    return data;
  }
};
export default function HomeScreen() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </View>
  );
}
