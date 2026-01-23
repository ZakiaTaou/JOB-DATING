import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useMyJobs, useDeleteJob } from "../../../hooks/useRecruiterJobs";
import { CircleDollarSign, MapPin,FileText } from "lucide-react-native";
const MOCK_MY_JOBS = [
  {
    id: 1,
    title: "Développeur Full Stack JS",
    location: "Casablanca",
    contractType: "CDI",
    workMode: "Hybrid",
    salary: { min: 15000, max: 25000 },
    skills: ["JavaScript", "React", "Node.js"],
    applicants: 12,
    matches: 3,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Développeur Frontend React",
    location: "Rabat",
    contractType: "CDI",
    workMode: "Remote",
    salary: { min: 12000, max: 20000 },
    skills: ["React", "TypeScript", "CSS"],
    applicants: 8,
    matches: 2,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    title: "Backend Developer Node.js",
    location: "Marrakech",
    contractType: "CDD",
    workMode: "Présentiel",
    salary: { min: 18000, max: 30000 },
    skills: ["Node.js", "PostgreSQL", "Docker"],
    applicants: 5,
    matches: 1,
    status: "closed",
    createdAt: "2024-01-05",
  },
];
export default function JobsList() {
  const { data, isLoading } = useMyJobs();
  const deleteJobMutation = useDeleteJob();

  const jobs = data?.data?.data || [];
  const router = useRouter();
  const handleDelete = (jobId) => {
    Alert.alert(
      "Supprimer l'offre",
      "Êtes-vous sûr de vouloir supprimer cette offre?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            deleteJobMutation.mutate(jobId);
            Alert.alert("Succès", "Offre supprimée");
          },
        },
      ],
    );
  };

  const renderJob = ({ item }) => (
    <View style={jobListStyles.jobCard}>
      {/* Header */}
      <View style={jobListStyles.jobHeader}>
        <View style={jobListStyles.jobHeaderLeft}>
          <Text style={jobListStyles.jobTitle}>{item.title}</Text>
          <View
            style={{ flexDirection: "row", alignItems: "flex-start", gap: 2 }}
          >
            <MapPin size={14} color={"#EF4444"} />
            <Text style={jobListStyles.jobLocation}> {item.location}</Text>
          </View>
        </View>
      </View>

      {/* Info */}
      <View style={jobListStyles.jobInfo}>
        <View
          style={{ flexDirection: "row", alignItems: "flex-start", gap: 4 }}
        >
          <CircleDollarSign color="#ae881e" size={14} />
          <Text style={jobListStyles.infoText}>
            {item.salary.min} - {item.salary.max} {item.salary.currency}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 4 }}>
          <FileText color="#38352e" size={16}  />
          <Text style={jobListStyles.infoText}>{item.contractType}</Text>
        </View>
      </View>

      {/* Skills */}
      <View style={jobListStyles.skillsRow}>
        {item.requiredSkills.slice(0, 3).map((skill, index) => (
          <View key={index} style={jobListStyles.skillBadge}>
            <Text style={jobListStyles.skillBadgeText}>#{skill}</Text>
          </View>
        ))}
        {item.requiredSkills.length > 3 && (
          <Text style={jobListStyles.moreSkills}>
            +{item.requiredSkills.length - 3}
          </Text>
        )}
      </View>
      {/* Actions */}
      <View style={jobListStyles.actionsRow}>
        <TouchableOpacity
          style={[jobListStyles.actionButton, jobListStyles.editButton]}
          onPress={() => router.push(`jobs/editJob/${item.id}`)}
        >
          <Text style={jobListStyles.editButtonText}>Modifier</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[jobListStyles.actionButton, jobListStyles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={jobListStyles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={jobListStyles.container}>
      {/* Header */}
      <View style={jobListStyles.header}>
        <View style={jobListStyles.headerRow}>
          <Text style={jobListStyles.title}>Mes Offres</Text>
          <TouchableOpacity
            style={jobListStyles.createButton}
            onPress={() => router.push("jobs/addJob")}
          >
            <Text style={jobListStyles.createButtonText}>+ Créer</Text>
          </TouchableOpacity>
        </View>
        <Text style={jobListStyles.headerSubtitle}>{jobs.length} total</Text>
      </View>

      {/* Liste */}
      <FlatList
        data={jobs}
        renderItem={renderJob}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={jobListStyles.listContent}
        ListEmptyComponent={
          <View style={jobListStyles.emptyContainer}>
            <Text style={jobListStyles.emptyEmoji}>📋</Text>
            <Text style={jobListStyles.emptyText}>Aucune offre créée</Text>
            <Text style={jobListStyles.emptySubtext}>
              Créez votre première offre!
            </Text>
            <TouchableOpacity
              style={jobListStyles.emptyButton}
              onPress={() => router.push("jobs/addJob")}
            >
              <Text style={jobListStyles.emptyButtonText}>
                + Créer une offre
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const jobListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
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
  headerSubtitle: {
    fontSize: 15,
    color: "#E3F2FF",
    opacity: 0.9,
  },
  createButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  jobHeaderLeft: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: "#6B7280",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusActive: {
    backgroundColor: "#D1FAE5",
  },
  statusClosed: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  jobInfo: {
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  skillBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  skillBadgeText: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "500",
  },
  moreSkills: {
    color: "#6B7280",
    fontSize: 12,
    alignSelf: "center",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#e3effb",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  editButtonText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  deleteButtonText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 100,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
