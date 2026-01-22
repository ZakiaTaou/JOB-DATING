import { Tabs } from "expo-router";
import { Briefcase, HeartHandshake, House, UserRoundPen } from "lucide-react-native";
export default function RecruiterLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Acceuil",
          tabBarIcon: ({ color }) => <House color={color} />,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ color }) => <HeartHandshake color={color} />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Offres",
          tabBarIcon: ({ color }) => <Briefcase color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <UserRoundPen color={color} />,
        }}
      />
    </Tabs>
  );
}
