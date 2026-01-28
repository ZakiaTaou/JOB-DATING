import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../stores/useAuthStore";
import { HeartCrack, MapPin, MessageCircleHeart } from "lucide-react-native";
import { useCandidateMatches } from "../../hooks/useMatches";

export default function CandidateMatchesScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: matches, isLoading } = useCandidateMatches();
  // console.log(matches)
  const renderMatch = ({ item }) => (
    <TouchableOpacity
      style={styles.matchItem}
      onPress={() => router.push(`/(candidate)/chat/${item.id}`)}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.jobOffer?.recruiter?.companyName?.charAt(0).toUpperCase()}
          {item.jobOffer?.recruiter?.companyName?.charAt(1).toUpperCase()}
        </Text>
      </View>

      <View style={styles.matchInfo}>
        <Text style={styles.matchName}>
          {item.jobOffer?.recruiter?.companyName}
        </Text>

        <Text style={styles.matchSubtitle}>{item.jobOffer?.title}</Text>

        <Text style={styles.matchLocation}>
          <MapPin size={14} color={"#EF4444"} />{" "}
          {item.jobOffer?.location || "Non spécifié"}
        </Text>
      </View>

      <View style={styles.matchRight}>
        <MessageCircleHeart size={22} color="#007AFF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Matchs</Text>
        <Text style={styles.subtitle}>Offres qui vous ont matché</Text>
      </View>

      <FlatList
        data={matches || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMatch}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}><HeartCrack size={50} color={"#007AFF"}/></Text>
            <Text style={styles.emptyTitle}>Aucun match</Text>
            <Text style={styles.emptySubtitle}>
              Continuez à swiper pour décrocher un job
            </Text>
          </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: "#007AFF",
    paddingTop: 60,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },

  subtitle: {
    fontSize: 15,
    color: "#E3F2FF",
    marginTop: 6,
  },

  listContent: {
    padding: 16,
  },

  matchItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  matchInfo: {
    flex: 1,
  },

  matchName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A1A1A",
  },

  matchSubtitle: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 2,
  },

  matchLocation: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  matchRight: {
    alignItems: "flex-end",
  },

  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },

  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  emptySubtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 6,
    textAlign: "center",
  },
});
