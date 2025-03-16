import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, router } from "expo-router";
import { useSetAtom } from "jotai";
import { selectedGroupAtom } from "../../atoms";
// import { Group } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../../services/groupServices";
import { Tables } from "../../types/database.types";
import { useSupabase } from "../../lib/supbase";
type Group = Tables<"groups">;
export default function GroupSelector() {
  const supabase = useSupabase();
  const [searchText, setSearchText] = useState<string>("");
  const setGroup = useSetAtom(selectedGroupAtom);

  const { data, isLoading, error } = useQuery({
    queryKey: ["groups", { searchText }],
    queryFn: () => fetchGroups(searchText, supabase),
    staleTime: 10_000,
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    return <Text>Something went wrong</Text>;
  }

  const onGroupSelected = (group: Group) => {
    setGroup(group);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign
            name="close"
            size={30}
            color="black"
            onPress={() => router.back()}
          />
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              paddingRight: 30,
              fontWeight: "600",
              fontSize: 15,
            }}
          >
            Post to
          </Text>
        </View>
        {/* SEARCH BAR */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "lightgrey",
            borderRadius: 10,
            gap: 5,
            marginVertical: 15,
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <AntDesign name="search1" size={16} color="black" />
          <TextInput
            placeholder="Search for a community"
            placeholderTextColor={"gray"}
            style={{ paddingVertical: 10, flex: 1 }}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          {searchText && (
            <AntDesign
              name="closecircle"
              size={15}
              color="#E4E4E4"
              onPress={() => setSearchText("")}
            />
          )}
        </View>
        {/* LIST OF GROUPS */}
        <FlatList
          style={{ marginTop: 10 }}
          data={data}
          renderItem={({ item }) => (
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 20,
              }}
              onPress={() => onGroupSelected(item)}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 40, aspectRatio: 1, borderRadius: 20 }}
              />
              <View>
                <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                <Text style={{ color: "grey" }}>recently visited</Text>
              </View>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
