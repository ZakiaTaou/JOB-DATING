import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../stores/useAuthStore";
import { Ionicons } from "@expo/vector-icons";

const MOCK_MATCHES = [
  {
    id: 1,
    name: "Tech Innovators",
    subtitle: "Dev Full Stack JS",
    avatar: "TI",
    lastMessage: "Bonjour! Quand êtes-vous disponible?",
    unread: true,
    time: "10:30",
  },
  {
    id: 2,
    name: "Digital Solutions",
    subtitle: "Dev Frontend React",
    avatar: "DS",
    lastMessage: "Merci pour votre candidature",
    unread: false,
    time: "Hier",
  },
  {
    id: 3,
    name: "CloudTech",
    subtitle: "Backend Node.js",
    avatar: "CT",
    lastMessage: "Parfait! À bientôt",
    unread: false,
    time: "2j",
  },
];

export default function MatchesScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const renderMatch = ({ item }) => (
    <TouchableOpacity
      style={matchStyles.matchItem}
      onPress={() => {
        // Navigation vers le chat
        router.push(`/chat/${item.id}`);
      }}
    >
      <View style={matchStyles.avatar}>
        <Text style={matchStyles.avatarText}>{item.avatar}</Text>
      </View>

      <View style={matchStyles.matchInfo}>
        <Text style={matchStyles.matchName}>{item.name}</Text>
        <Text style={matchStyles.matchSubtitle}>{item.subtitle}</Text>
        <Text
          style={[
            matchStyles.matchMessage,
            item.unread && matchStyles.unreadMessage,
          ]}
        >
          {item.lastMessage}
        </Text>
      </View>

      <View style={matchStyles.matchRight}>
        <Text style={matchStyles.matchTime}>{item.time}</Text>
        {item.unread && <View style={matchStyles.unreadBadge} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={matchStyles.container}>
      <View style={matchStyles.header}>
        <View style={matchStyles.headerRow}>
          <Text style={matchStyles.title}>Mes Matchs</Text>
        </View>
        <Text style={matchStyles.email}>
          {user?.companyName || "Mon Entreprise"} • {MOCK_MATCHES.length} conversations
        </Text>
      </View>

      <FlatList
        data={MOCK_MATCHES}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={matchStyles.listContent}
        ListEmptyComponent={
          <View style={matchStyles.emptyContainer}>
            <Text style={matchStyles.emptyEmoji}>💔</Text>
            <Text style={matchStyles.emptyText}>Pas encore de matchs</Text>
            <Text style={matchStyles.emptySubtext}>Swipez pour matcher!</Text>
          </View>
        }
      />
    </View>
  );
}

const matchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 24,
    paddingTop: 60,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  email: {
    fontSize: 15,
    color: "#E3F2FF",
    opacity: 0.9,
  },
  listContent: {
    padding: 16,
  },
  matchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  matchSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  matchMessage: {
    fontSize: 14,
    color: "#999",
  },
  unreadMessage: {
    fontWeight: "bold",
    color: "#333",
  },
  matchRight: {
    alignItems: "flex-end",
  },
  matchTime: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3B30",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyEmoji: {
    fontSize: 64,

    marginBottom: 16,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#666",
  },
});
