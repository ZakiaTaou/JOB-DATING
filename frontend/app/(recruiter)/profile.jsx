import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../stores/useAuthStore";
import { useProfile } from "../../hooks/useProfile";
import { Ionicons } from "@expo/vector-icons";
import { LogOut } from "lucide-react-native";

export default function RecruiterProfile() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { profile, isLoading, saveProfile, isSaving } = useProfile("recruiter");

  const handleLogout = async () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    description: "",
    companySize: "11-50",
    website: "",
    location: "",
    phone: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        companyName: profile.companyName || "",
        industry: profile.industry || "",
        description: profile.description || "",
        companySize: profile.companySize || "11-50",
        website: profile.website || "",
        location: profile.location || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleSave = () => {
    if (!formData.companyName || !formData.description) {
      Alert.alert(
        "Erreur",
        "Le nom de l'entreprise et la description sont requis",
      );
      return;
    }

    if (formData.description.length < 50) {
      Alert.alert(
        "Erreur",
        "La description doit contenir au moins 50 caractères",
      );
      return;
    }

    const normalizedWebsite =
      formData.website && !/^https?:\/\//i.test(formData.website)
        ? `https://${formData.website}`
        : formData.website;

    const payload = { ...formData, website: normalizedWebsite };
    saveProfile(payload);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Profil Entreprise</Text>
          <TouchableOpacity onPress={handleLogout}>
            <LogOut size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.email}>{formData.companyName}</Text>
      </View>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de l'entreprise</Text>

          <TextInput
            style={styles.input}
            placeholder="Nom de l'entreprise *"
            placeholderTextColor="#8E8E93"
            value={formData.companyName}
            onChangeText={(text) =>
              setFormData({ ...formData, companyName: text })
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Secteur d'activité"
            placeholderTextColor="#8E8E93"
            value={formData.industry}
            onChangeText={(text) =>
              setFormData({ ...formData, industry: text })
            }
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description de l'entreprise (min 50 caractères) *"
            placeholderTextColor="#8E8E93"
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            multiline
            numberOfLines={5}
          />

          <Text style={styles.charCount}>
            {formData.description.length} / 50 caractères minimum
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails</Text>

          <Text style={styles.label}>Taille de l'entreprise</Text>
          <View style={styles.radioGroup}>
            {[
              { value: "1-10", label: "1-10" },
              { value: "11-50", label: "11-50" },
              { value: "51-200", label: "51-200" },
              { value: "201-500", label: "201-500" },
              { value: "500+", label: "500+" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.radioButton,
                  formData.companySize === option.value &&
                    styles.radioButtonActive,
                ]}
                onPress={() =>
                  setFormData({ ...formData, companySize: option.value })
                }
              >
                <Text
                  style={[
                    styles.radioText,
                    formData.companySize === option.value &&
                      styles.radioTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Site web"
            placeholderTextColor="#8E8E93"
            value={formData.website}
            onChangeText={(text) => setFormData({ ...formData, website: text })}
            keyboardType="url"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Localisation"
            placeholderTextColor="#8E8E93"
            value={formData.location}
            onChangeText={(text) =>
              setFormData({ ...formData, location: text })
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Téléphone de contact"
            placeholderTextColor="#8E8E93"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />
        </View>
        {/* Boutons */}
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? "Sauvegarde..." : "Sauvegarder"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
    color: "#E3F2FF",
    opacity: 0.9,
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E1E8ED",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: "#F8FAFB",
    color: "#1A1A1A",
  },
  textArea: {
    height: 110,
    textAlignVertical: "top",
  },
  skillInputContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  skillInput: {
    flex: 1,
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: "#007AFF",
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "#E3F2FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#007AFF20",
  },
  tagText: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "600",
  },
  tagRemove: {
    color: "#007AFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 2,
  },
  addLink: {
    color: "#007AFF",
    fontSize: 17,
    fontWeight: "700",
  },
  experienceCard: {
    backgroundColor: "#F8FAFB",
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E1E8ED",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  removeButton: {
    marginTop: 10,
  },
  removeButtonText: {
    color: "#FF3B30",
    fontSize: 15,
    fontWeight: "600",
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  radioButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#E1E8ED",
    backgroundColor: "#FFFFFF",
  },
  radioButtonActive: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FF",
  },
  radioText: {
    fontSize: 15,
    color: "#8E8E93",
    fontWeight: "500",
  },
  radioTextActive: {
    color: "#007AFF",
    fontWeight: "700",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 10,
  },
  charCount: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: -8,
    marginBottom: 12,
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 14,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonDisabled: {
    backgroundColor: "#C7C7CC",
    shadowOpacity: 0,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 30,
    borderWidth: 1.5,
    borderColor: "#FF3B30",
  },
  logoutButtonText: {
    color: "#FF3B30",
    fontSize: 18,
    fontWeight: "700",
  },
});
