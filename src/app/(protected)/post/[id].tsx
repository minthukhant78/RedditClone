import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PostListItem from "../../../components/PostListItem ";
import { fetchPostsById } from "../../../services/postServices";
import { useQuery } from "@tanstack/react-query";
export default function DetailPost() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostsById(id),
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
