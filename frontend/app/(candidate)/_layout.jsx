import { Tabs } from "expo-router";
import { HeartHandshake, House, UserRoundPen } from "lucide-react-native";

export default function CandidateLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false}}>
      <Tabs.Screen name="index" options={{ title: "Swipe", tabBarIcon:({color})=>(<House color={color} />) }} />
      <Tabs.Screen name="matches" options={{ title: "Matches", tabBarIcon:({color})=>(<HeartHandshake color={color} />) }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon:({color})=>(<UserRoundPen color={color} />) }} />
    </Tabs>
  );
}
