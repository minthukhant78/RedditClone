import { View, FlatList, ActivityIndicator, Text } from "react-native";
import PostListItem from "../../../components/PostListItem ";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supbase";
import { Tables } from "../../../types/database.types";
import { useQuery } from "@tanstack/react-query";

type Post = Tables<"posts"> & {
  user: Tables<"users">;
  group: Tables<"groups">;
  };


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

  const { data : posts, isLoading,error} = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
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
