import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useJob, useUpdateJob } from '../../../../hooks/useRecruiterJobs';
export default function EditJob() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Simuler la récupération du job
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    contractType: 'CDI',
    workMode: 'Hybrid',
    description: '',
    requirements: ''
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const { data, isLoading } = useJob(id);
const updateJobMutation = useUpdateJob();
console.log("ID:", id);
console.log("DATA:", data);
useEffect(() => {
  if (data?.data) {
        const job = data.data;

    setFormData({

      title: job.title,
      location: job.location,
      salaryMin: String(job.salary?.min || ""),
      salaryMax: String(job.salary?.max || ""),
      contractType: job.contractType,
      workMode: job.workMode||"Hybrid",
      description: job.description,
      requirements: job.requirements||"",
    });
    setSkills(job.requiredSkills || []);
  }
}, [data]);


  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleUpdate = () => {
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
    salary: {
      min: Number(formData.salaryMin),
      max: Number(formData.salaryMax),
    },
    contractType: formData.contractType,
    workMode: formData.workMode,
    description: formData.description,
    requirements: formData.requirements,
    requiredSkills: skills,
  };

  updateJobMutation.mutate(
    { id, data: payload },
    {
      onSuccess: () => {
        Alert.alert("Succès", "Offre modifiée avec succès", [
          { text: "OK", onPress: () => router.back() },
        ]);
      },
      onError: () => {
        Alert.alert("Erreur", "Impossible de modifier l'offre");
      },
    }
  );
};


  if (isLoading) {
    return (
      <View style={jobStyles.container}>
        <Text style={{ textAlign: 'center', marginTop: 100 }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={jobStyles.container}>
      <View style={jobStyles.header}>
        <Text style={jobStyles.title}>✏️ Modifier l'Offre</Text>
        <Text style={jobStyles.subtitle}>ID: {id}</Text>
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
          placeholder="📍 Localisation *"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
          placeholderTextColor="#9CA3AF"
        />

        <Text style={jobStyles.label}>Type de contrat</Text>
        <View style={jobStyles.radioGroup}>
          {['CDI', 'CDD', 'Stage', 'Freelance'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                jobStyles.radioButton,
                formData.contractType === type && jobStyles.radioButtonActive
              ]}
              onPress={() => setFormData({ ...formData, contractType: type })}
            >
              <Text style={[
                jobStyles.radioText,
                formData.contractType === type && jobStyles.radioTextActive
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={jobStyles.label}>Mode de travail</Text>
        <View style={jobStyles.radioGroup}>
          {['Remote', 'Hybrid', 'Présentiel'].map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                jobStyles.radioButton,
                formData.workMode === mode && jobStyles.radioButtonActive
              ]}
              onPress={() => setFormData({ ...formData, workMode: mode })}
            >
              <Text style={[
                jobStyles.radioText,
                formData.workMode === mode && jobStyles.radioTextActive
              ]}>
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={jobStyles.section}>
        <Text style={jobStyles.sectionTitle}>💰 Salaire (MAD/mois)</Text>
        
        <View style={jobStyles.row}>
          <View style={{ flex: 1 }}>
            <Text style={jobStyles.label}>Minimum</Text>
            <TextInput
              style={jobStyles.input}
              placeholder="15 000"
              value={formData.salaryMin}
              onChangeText={(text) => setFormData({ ...formData, salaryMin: text })}
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
              onChangeText={(text) => setFormData({ ...formData, salaryMax: text })}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </View>

      <View style={jobStyles.section}>
        <Text style={jobStyles.sectionTitle}>💼 Compétences *</Text>
        
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
        <Text style={jobStyles.sectionTitle}>📝 Description *</Text>
        <TextInput
          style={[jobStyles.input, jobStyles.textArea]}
          placeholder="Décrivez le poste..."
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={6}
          placeholderTextColor="#9CA3AF"
        />
        <Text style={jobStyles.charCount}>
          {formData.description.length} / 100 min
        </Text>
      </View>

      <View style={jobStyles.section}>
        <Text style={jobStyles.sectionTitle}>🎓 Prérequis</Text>
        <TextInput
          style={[jobStyles.input, jobStyles.textArea]}
          placeholder="Diplômes, expérience..."
          value={formData.requirements}
          onChangeText={(text) => setFormData({ ...formData, requirements: text })}
          multiline
          numberOfLines={4}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <TouchableOpacity style={jobStyles.submitButton} onPress={handleUpdate}>
        <Text style={jobStyles.submitButtonText}>💾 Enregistrer les modifications</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const jobStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },  
  header: {
    marginBottom: 24,
  },  
  title: {
    fontSize: 24,
    fontWeight: 'bold', 
    color: '#1F2937',
  },  
  subtitle: { 
    fontSize: 14,
    color: '#6B7280',
  },  
  section: {  
    marginBottom: 24,
  },  
  sectionTitle: { 
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },  
  input: {  
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top', 
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,  
    marginTop: 8,
  },
  radioGroup: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12, 
  },  
  radioButton: { 
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,  
    backgroundColor: '#FFFFFF',
  },  
  radioButtonActive: { 
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },  
  radioText: {  
    fontSize: 14,
    color: '#374151',
  },  
  radioTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },  
  skillInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#007AFF', 
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    gap: 8,
  },  
  tag: {  
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF', 
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8, 
    marginBottom: 8,
  },  
  tagText: {  
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },  
  tagRemove: {
    color: '#6B7280',
    fontSize: 16,
    marginLeft: 6,
  },  
  charCount: {  
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },  
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,  
    alignItems: 'center',
  },  
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
});