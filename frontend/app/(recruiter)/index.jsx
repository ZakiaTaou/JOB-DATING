import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../stores/useAuthStore";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MOCK_CANDIDATES = [
  {
    id: 1,
    firstName: 'Ahmed',
    lastName: 'Benali',
    title: 'Développeur Full Stack',
    location: 'Casablanca',
    availability: 'Immédiatement',
    education: 'Licence en Informatique',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'Docker'],
    bio: 'Développeur Full Stack passionné avec 3 ans d\'expérience en JavaScript, React et Node.js. J\'aime créer des applications web performantes et user-friendly.',
    experience: [
      {
        title: 'Développeur Full Stack',
        company: 'Tech Company',
        period: '2021 - 2024'
      }
    ]
  },
  {
    id: 2,
    firstName: 'Fatima',
    lastName: 'Zahra',
    title: 'Frontend Developer',
    location: 'Rabat',
    availability: '1 mois',
    education: 'Master en Génie Logiciel',
    skills: ['React', 'TypeScript', 'CSS', 'Tailwind', 'Figma'],
    bio: 'Spécialisée en développement frontend avec un œil pour le design. Je transforme les maquettes en interfaces modernes.',
    experience: [
      {
        title: 'Frontend Developer',
        company: 'Digital Agency',
        period: '2020 - 2024'
      }
    ]
  }
];

export default function RecruiterSwipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuthStore();


  if (currentIndex >= MOCK_CANDIDATES.length) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Découverte</Text>
          <Text style={styles.headerSubtitle}>{user?.companyName || "Mon Entreprise"}</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🎉</Text>
          <Text style={styles.emptyTitle}>Plus de candidats disponibles</Text>
          <Text style={styles.emptySubtitle}>Revenez plus tard!</Text>
        </View>
      </View>
    );
  }

  const candidate = MOCK_CANDIDATES[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Découverte</Text>
        <Text style={styles.headerSubtitle}>{user?.companyName || "Mon Entreprise"}</Text>
      </View>

      <View style={styles.cardContainer}>
        <View
          style={styles.card}>
          <ScrollView style={styles.cardContent} showsVerticalScrollIndicator={false}>
            <View style={styles.cardHeader}>
              <Text style={styles.candidateName}>{candidate.firstName} {candidate.lastName}</Text>
              <Text style={styles.candidateTitle}>{candidate.title}</Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoBadge}>
                <Ionicons name="location-outline" size={16} color="#007AFF" />
                <Text style={styles.infoBadgeText}>{candidate.location}</Text>
              </View>
              <View style={styles.infoBadge}>
                <Ionicons name="time-outline" size={16} color="#007AFF" />
                <Text style={styles.infoBadgeText}>{candidate.availability}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Compétences</Text>
            <View style={styles.skillsContainer}>
              {candidate.skills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>#{skill}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Expérience</Text>
            {candidate.experience.map((exp, index) => (
              <View key={index} style={styles.experienceCard}>
                <Text style={styles.expTitle}>{exp.title}</Text>
                <Text style={styles.expCompany}>{exp.company} • {exp.period}</Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>Bio</Text>
            <Text style={styles.description}>{candidate.bio}</Text>
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
    backgroundColor: '#F5F7FA',
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
    height: SCREEN_HEIGHT * 0.6,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  candidateAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  candidateName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  candidateTitle: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  infoBadgeText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    marginTop: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: '#E3F2FF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#007AFF20',
  },
  skillText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  experienceCard: {
    backgroundColor: '#F8FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  expTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  expCompany: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingBottom: 10,

  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  likeButton: {
    borderWidth: 1,
    borderColor: '#007AFF20',
  },
  dislikeButton: {
    borderWidth: 1,
    borderColor: '#FF3B3020',
  },
  stamp: {
    position: 'absolute',
    top: 40,
    zIndex: 10,
    padding: 10,
    borderWidth: 4,
    borderRadius: 12,
  },
  likeStamp: {
    left: 40,
    borderColor: '#4CAF50',
    transform: [{ rotate: '-15deg' }],
  },
  dislikeStamp: {
    right: 40,
    borderColor: '#FF3B30',
    transform: [{ rotate: '15deg' }],
  },
  stampText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
  },
});
