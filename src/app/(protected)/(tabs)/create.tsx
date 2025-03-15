import React, { useState } from "react";
import { Link, router } from "expo-router";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { useAtom } from "jotai";
import { selectedGroupAtom } from "../../../atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supbase";
import { TablesInsert } from "../../../types/database.types";

type InsertPost = TablesInsert<"posts">;

const insertPost = async (post: InsertPost) => {
  // use supabase to post
  const { data, error } = await supabase
    .from("posts")
    .insert(post)
    .select()
    .single();

  if (error) {
    throw error;
  } else {
    return data;
  }
};
export default function CreateScreen() {
  const [title, setTitle] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [group, setGroup] = useAtom(selectedGroupAtom);



  const queryClient = useQueryClient();

  const { mutate,  isPending } = useMutation({
    mutationFn: () => {
      if (!group) {
        throw new Error("Please select a group");
      }
      if (!title) {
        throw new Error("Please enter a title");
      }

      return insertPost({
        title,
        description: bodyText,
        group_id: group.id,
        user_id: "4717cb6d-5780-4638-9416-b365f66b7c3e",
      }); 
    },
      
    onSuccess: (data) => {
      // invalidate the posts query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      goBack();
    },
    onError: (error) => {
      console.error(error);
      Alert.alert("An error occurred while posting", error.message);
    },
  });
  const goBack = () => {
    setTitle("");
    setBodyText("");
    setGroup(null);
    router.back();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const isPostButtonDisabled = !title || !group;

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 10 }}
    >
      {/* HEADER */}
      <Pressable
        disabled={!isPostButtonDisabled}
        onPress={goBack}
        style={{ flexDirection: "row", marginBottom: 5 }}
      >
        <AntDesign name="close" size={30} color="black" onPress={goBack} />

        <Pressable
          onPress={() => mutate()}
          disabled={isPending}
          style={{ marginLeft: "auto" }}
        >
          <Text
            style={{
              backgroundColor: isPostButtonDisabled ? "lightgrey" : "#115BCA",
              color: "white",
              marginLeft: "auto",
              padding: 7,
              borderRadius: 15,
              fontWeight: "bold",
            }}
          >
            {isPending ? "Posting..." : "Post"}
          </Text>
        </Pressable>
      </Pressable>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {/* SELECTOR */}
          <Link href="GroupSelector">
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#EDEDED",
                gap: 5,
                padding: 10,
                borderRadius: 20,
                alignItems: "center",
                alignSelf: "flex-start",
              }}
            >
              {group ? (
                <>
                  <Image
                    source={{ uri: group.image }}
                    style={{ width: 20, height: 20, borderRadius: 10 }}
                  />
                  <Text style={{ fontWeight: "600" }}>{group.name}</Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      paddingVertical: 1,
                      paddingHorizontal: 5,
                      borderRadius: 10,
                      fontWeight: "bold",
                    }}
                  >
                    r/
                  </Text>
                  <Text style={{ fontWeight: "600" }}>Select a community</Text>
                </>
              )}
              <AntDesign name="down" size={15} color="black" />
            </View>
          </Link>
          {/* INPUTS */}
          <TextInput
            placeholder="Title"
            style={{ fontSize: 20, fontWeight: "bold", paddingVertical: 20 }}
            onChangeText={(text) => setTitle(text)}
            value={title}
            multiline
            autoFocus
            scrollEnabled={false}
          />
          {image && (
            <View style={{ paddingBottom: 20 }}>
              <AntDesign
                name="close"
                size={25}
                color="white"
                onPress={() => setImage(null)}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  right: 10,
                  top: 10,
                  padding: 5,
                  backgroundColor: "#00000090",
                  borderRadius: 20,
                }}
              />
              <Image
                source={{ uri: image }}
                style={{ width: "100%", aspectRatio: 1 }}
              />
            </View>
          )}
          <TextInput
            placeholder="body text (optional)"
            onChangeText={(text) => setBodyText(text)}
            value={bodyText}
            multiline
            scrollEnabled={false}
          />
        </ScrollView>
        {/* FOOTER */}
        <View style={{ flexDirection: "row", gap: 20, padding: 10 }}>
          <Feather name="link" size={20} color="black" />
          <Feather name="image" size={20} color="black" onPress={pickImage} />
          <Feather name="youtube" size={20} color="black" />
          <Feather name="list" size={20} color="black" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
