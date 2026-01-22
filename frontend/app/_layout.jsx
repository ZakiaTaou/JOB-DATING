import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../stores/useAuthStore";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { isInitialized, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false}} />
    </QueryClientProvider>
  );
}

