import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import posts from "../../../../assets/data/posts.json";
import PostListItem from "../../../components/PostListItem ";

export default function DetailPost() {
    const { id } = useLocalSearchParams();
    const detailPost = posts.find((post) => post.id === id);

    if (!detailPost) {
        return (
            <View>
                <Text>Post not found</Text>
            </View>
        )
    }
    return (
        <View>
            <PostListItem post={detailPost} isDetailedPost={true} />
        </View>
    )
}