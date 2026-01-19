import { Redirect } from "expo-router";
import { useAuthStore } from "../stores/useAuthStore";

export default function Index() {
  const isAuth = useAuthStore((state) => state.isAuthenticated);

  if (isAuth) {
    return <Redirect href="/(tabs)/index" />;
  }

  return <Redirect href="/(auth)/login" />;
}
