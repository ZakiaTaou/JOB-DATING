import { Stack } from "expo-router";

export default function JobsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
      <Stack.Screen 
        name="index" 
      />
      <Stack.Screen 
        name="create" 
        options={{ 
          presentation: "modal" 
        }} 
      />
      <Stack.Screen 
        name="job/[id]" 
        options={{ 
          title: "Modifier l'Offre",
        }} 
      />
    </Stack>
  );
}