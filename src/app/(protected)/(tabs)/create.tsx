import { useState } from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
export default function CreateScreen() {
  const [title, setTitle] = useState<string>("");

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 10 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <AntDesign name="close" size={30} color="black" onPress={() => router.back()} />
        <Pressable
          onPress={() => console.error("Pressed")}
          style={{ marginLeft: "auto" }}
        >
          <Text style={styles.postText}>Post</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postText: {
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 7,
    fontWeight: "bold",
    backgroundColor: "#0d469b",
    borderRadius: 10,
  },
});
