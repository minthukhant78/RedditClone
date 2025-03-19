import { View, Text, ActivityIndicator, Alert } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import PostListItem from "../../../components/PostListItem ";
import { deletePostById, fetchPostsById } from "../../../services/postServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "../../../lib/supbase";
import React from "react";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
export default function DetailPost() {
    const supabase = useSupabase();
  const { id } = useLocalSearchParams<{ id: string }>();

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostsById(id, supabase),
  });

    const { mutate: remove } = useMutation({
    mutationFn: () => deletePostById(id, supabase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
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
      <Stack.Screen
              name='post/[id]'
              options={{
                headerRight: () =>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                       <Entypo
                onPress={() => remove()}
                name="trash"
                size={24}
                color="white"
              />
                    <AntDesign name="search1" size={24} color="white" />
                    <MaterialIcons name="sort" size={27} color="white" />
                    <Entypo name="dots-three-horizontal" size={24} color="white" />
                  </View>,
                animation: "slide_from_right",
              }} />
      <PostListItem post={data} isDetailedPost={true} />
    </View>
  );
}
