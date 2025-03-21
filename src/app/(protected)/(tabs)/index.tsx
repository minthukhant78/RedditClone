import { View, FlatList, ActivityIndicator, Text } from "react-native";
import PostListItem from "../../../components/PostListItem ";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../services/postServices";
import { useSupabase } from "../../../lib/supbase";
export default function HomeScreen() {
  const supabase = useSupabase();
  const {
    data: posts,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(supabase),
    staleTime: 10_000,
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
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </View>
  );
}
