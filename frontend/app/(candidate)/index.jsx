import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../stores/useAuthStore";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = 120;

// DONNÉES DE TEST
const MOCK_JOBS = [
  {
    id: 1,
    title: "Développeur Full Stack JS",
    company: "Tech Innovators",
    location: "Casablanca",
    salaryMin: 15000,
    salaryMax: 25000,
    contractType: "CDI",
    workMode: "Hybrid",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    description:
      "Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant les dernières technologies web.",
    requirements: "Bac+3 en informatique, 3 ans d'expérience minimum",
  },
  {
    id: 2,
    title: "Développeur Frontend React",
    company: "Digital Solutions",
    location: "Rabat",
    salaryMin: 12000,
    salaryMax: 20000,
    contractType: "CDI",
    workMode: "Remote",
    skills: ["React", "TypeScript", "CSS", "Tailwind"],
    description:
      "Rejoignez notre équipe frontend et créez des interfaces utilisateur modernes et réactives.",
    requirements: "Portfolio requis, 2 ans d'expérience en React",
  },
  {
    id: 3,
    title: "Backend Developer Node.js",
    company: "CloudTech",
    location: "Marrakech",
    salaryMin: 18000,
    salaryMax: 30000,
    contractType: "CDI",
    workMode: "Présentiel",
    skills: ["Node.js", "Express", "PostgreSQL", "Docker"],
    description:
      "Développez des APIs robustes et scalables pour nos applications cloud.",
    requirements: "Expérience with microservices et architecture cloud",
  },
];

export default function CandidateSwipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuthStore();


  if (currentIndex >= MOCK_JOBS.length) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Offres d'emploi</Text>
          <Text style={styles.headerSubtitle}>
            {user?.firstName || "Candidat"}
          </Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🎉</Text>
          <Text style={styles.emptyTitle}>Plus d'offres disponibles</Text>
          <Text style={styles.emptySubtitle}>Revenez plus tard!</Text>
        </View>
      </View>
    );
  }

  const currentJob = MOCK_JOBS[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Offres d'emploi</Text>
        <Text style={styles.headerSubtitle}>
          {user?.firstName || "Candidat"}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <ScrollView
            style={styles.cardContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardHeader}>
              <View style={styles.companyLogo}>
                <Ionicons name="briefcase" size={30} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.jobTitle}>{currentJob.title}</Text>
                <Text style={styles.companyName}>{currentJob.company}</Text>
              </View>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={16} color="#007AFF" />
                <Text style={styles.infoText}>{currentJob.location}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="cash-outline" size={16} color="#007AFF" />
                <Text style={styles.infoText}>
                  {currentJob.salaryMin.toLocaleString()} -{" "}
                  {currentJob.salaryMax.toLocaleString()} MAD
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons
                  name="document-text-outline"
                  size={16}
                  color="#007AFF"
                />
                <Text style={styles.infoText}>
                  {currentJob.contractType} • {currentJob.workMode}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Compétences</Text>
            <View style={styles.skillsContainer}>
              {currentJob.skills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>#{skill}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{currentJob.description}</Text>

            {currentJob.requirements && (
              <>
                <Text style={styles.sectionTitle}>Prérequis</Text>
                <Text style={styles.description}>
                  {currentJob.requirements}
                </Text>
              </>
            )}
          </ScrollView>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.dislikeButton]}
        >
          <Ionicons name="close" size={32} color="#FF3B30" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.likeButton]}
        >
          <Ionicons name="heart" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#E3F2FF",
    opacity: 0.9,
    marginTop: 4,
  },
  cardContainer: {
     flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 16,
  },
  card: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_HEIGHT * 0.62,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  companyName: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
    marginTop: 2,
  },
  infoGrid: {
    marginBottom: 20,
    gap: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
    marginTop: 8,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: "#E3F2FF",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#007AFF20",
  },
  skillText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingBottom: 5,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  likeButton: {
    borderWidth: 1,
    borderColor: "#007AFF20",
  },
  dislikeButton: {
    borderWidth: 1,
    borderColor: "#FF3B3020",
  },
  stamp: {
    position: "absolute",
    top: 40,
    zIndex: 10,
    padding: 10,
    borderWidth: 4,
    borderRadius: 12,
  },
  likeStamp: {
    left: 40,
    borderColor: "#4CAF50",
    transform: [{ rotate: "-15deg" }],
  },
  dislikeStamp: {
    right: 40,
    borderColor: "#FF3B30",
    transform: [{ rotate: "15deg" }],
  },
  stampText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
  },
});
