import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PostListItem from "../../../components/PostListItem ";
import { fetchPostsById } from "../../../services/postServices";
import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "../../../lib/supbase";
export default function DetailPost() {
    const supabase = useSupabase();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostsById(id, supabase),
  });
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !data) {
    return (
      <View>
        <Text>Post not found</Text>
      </View>
    );
  }
  return (
    <View>
      <PostListItem post={data} isDetailedPost={true} />
    </View>
  );
}
