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
          presentation: "formSheet",
            animation: "fade_from_bottom",
            gestureDirection: "vertical",
            sheetGrabberVisible: true,
            sheetCornerRadius: 25,
            sheetAllowedDetents: [0.9, 1.0],
        }} 
      />
      <Stack.Screen 
        name="editJob/[id]" 
        options={{ 
          presentation: "formSheet",
            animation: "fade_from_bottom",
            gestureDirection: "vertical",
            sheetGrabberVisible: true,
            sheetCornerRadius: 25,
            sheetAllowedDetents: [0.9, 1.0],
        }}
      />
    </Stack>
  );
}