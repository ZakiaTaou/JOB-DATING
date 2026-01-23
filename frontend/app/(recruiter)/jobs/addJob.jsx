import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useCreateJob } from "../../../hooks/useRecruiterJobs";

export default function CreateJob() {
  const createJobMutation = useCreateJob();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    contractType: "CDI",
    workMode: "Hybrid",
    description: "",
    requirements: "",
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.location || !formData.description) {
      Alert.alert("Erreur", "Remplissez les champs obligatoires (*)");
      return;
    }

    if (formData.description.length < 100) {
      Alert.alert("Erreur", "Description minimum 100 caractères");
      return;
    }

    if (skills.length === 0) {
      Alert.alert("Erreur", "Ajoutez au moins une compétence");
      return;
    }

    const payload = {
      title: formData.title,
      location: formData.location,
      contractType: formData.contractType,
      workMode: formData.workMode,
      description: formData.description,
      requirements: formData.requirements,
      skills,
      salary: {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
      },
    };
  
  
  createJobMutation.mutate(payload,{
    onSuccess: ()=>{
      Alert.alert("Succès", "Offre créée!", [
        { text: "OK", onPress: () => router.push("/(recruiter)/jobs") },
      ]);
    },
    onError: (error)=>{
      Alert.alert("Erreur", "Échec de la création de l'offre. Réessayez.");
    }
  });}
  return (
    <ScrollView style={jobStyles.container}>
      <View style={jobStyles.header}>
        <Text style={jobStyles.title}>Créer une Offre</Text>
        <Text style={jobStyles.subtitle}>Trouvez votre talent</Text>
      </View>

      <View style={jobStyles.section}>
        <Text style={jobStyles.sectionTitle}>Informations de base</Text>

        <TextInput
          style={jobStyles.input}
          placeholder="Titre du poste *"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholderTextColor="#9CA3AF"
        />

        <TextInput
          style={jobStyles.input}
          placeholder="Localisation *"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
          placeholderTextColor="#9CA3AF"
        />

        <Text style={jobStyles.label}>Type de contrat</Text>
        <View style={jobStyles.radioGroup}>
          {["CDI", "CDD", "Stage", "Freelance"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                jobStyles.radioButton,
                formData.contractType === type && jobStyles.radioButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, contractType: type })}
            >
              <Text
                style={[
                  jobStyles.radioText,
                  formData.contractType === type && jobStyles.radioTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={jobStyles.section}>
        <Text style={jobStyles.sectionTitle}>Salaire (MAD/mois)</Text>

        <View style={jobStyles.row}>
          <View style={{ flex: 1 }}>
            <Text style={jobStyles.label}>Minimum</Text>
            <TextInput
              style={jobStyles.input}
              placeholder="15 000"
              value={formData.salaryMin}
              onChangeText={(text) =>
                setFormData({ ...formData, salaryMin: text })
              }
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={jobStyles.label}>Maximum</Text>
            <TextInput
              style={jobStyles.input}
              placeholder="25 000"
              value={formData.salaryMax}
              onChangeText={(text) =>
                setFormData({ ...formData, salaryMax: text })
              }
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </View>

      <View style={jobStyles.section}>
        <Text style={jobStyles.sectionTitle}>Compétences *</Text>

        <View style={jobStyles.skillInputContainer}>
          <TextInput
            style={[jobStyles.input, jobStyles.skillInput]}
            placeholder="Ex: JavaScript..."
            value={skillInput}
            onChangeText={setSkillInput}
            placeholderTextColor="#9CA3AF"
            onSubmitEditing={addSkill}
          />
          <TouchableOpacity style={jobStyles.addButton} onPress={addSkill}>
            <Text style={jobStyles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={jobStyles.tagsContainer}>
          {skills.map((skill, index) => (
            <View key={index} style={jobStyles.tag}>
              <Text style={jobStyles.tagText}>#{skill}</Text>
              <TouchableOpacity onPress={() => removeSkill(skill)}>
                <Text style={jobStyles.tagRemove}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={jobStyles.section}>
        <Text style={jobStyles.sectionTitle}>Description *</Text>
        <TextInput
          style={[jobStyles.input, jobStyles.textArea]}
          placeholder="Décrivez le poste..."
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          multiline
          numberOfLines={6}
          placeholderTextColor="#9CA3AF"
        />
        <Text style={jobStyles.charCount}>
          {formData.description.length} / 100 min
        </Text>
      </View>
      <TouchableOpacity style={jobStyles.submitButton} onPress={handleSubmit}>
        <Text style={jobStyles.submitButtonText}>Publier l'offre</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const jobStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  radioButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },
  radioButtonActive: {
    borderColor: "#007AFF",
    backgroundColor: "#EEF2FF",
  },
  radioText: {
    fontSize: 14,
    color: "#6B7280",
  },
  radioTextActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
  skillInputContainer: {
    flexDirection: "row",
    gap: 8,
  },
  skillInput: {
    flex: 1,
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: "#007AFF",
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: "center",
    gap: 6,
  },
  tagText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  tagRemove: {
    color: "#007AFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  charCount: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: -8,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    margin: 20,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
