import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name='signIn' options={{ title: 'Sign In', headerShown: false, }} />
      <Stack.Screen name='signUp' options={{ title: 'Sign Up' , headerShown: false,}} />
    </Stack>
  )
}