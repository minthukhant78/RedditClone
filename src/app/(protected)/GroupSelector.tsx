import { FlatList, Text, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import groups from '../../../assets/data/groups.json';

export default function GroupSelector() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList style={{ marginTop: 10 }} data={groups} renderItem={({ item }) => (
          <Text style={{ fontWeight: '600' }}>{item.name}</Text>
        )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}