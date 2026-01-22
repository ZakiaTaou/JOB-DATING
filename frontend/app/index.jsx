import { Redirect } from "expo-router";
import { useAuthStore } from "../stores/useAuthStore";

export default function Index() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (user?.role === "candidate") {
    return <Redirect href="/(candidate)" />;
  }

  if (user?.role === "recruiter") {
    return <Redirect href="/(recruiter)" />;
  }

  return null;
}
