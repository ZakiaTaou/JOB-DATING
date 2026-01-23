import { Stack } from "expo-router";

export default function JobsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
      <Stack.Screen 
        name="index" 
      />
      <Stack.Screen 
        name="addJob" 
        options={{ 
          presentation: "modal" 
        }} 
      />
      <Stack.Screen 
        name="editJob/[id]" 
        options={{ 
          presentation: "modal" 
        }} 
      />
    </Stack>
  );
}