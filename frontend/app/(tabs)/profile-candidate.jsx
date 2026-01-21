import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../stores/useAuthStore';
import { useProfile } from '../../hooks/useProfile';

export default function CandidateProfile() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { profile, isLoading, saveProfile, isSaving } = useProfile('candidate');

  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Déconnexion",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          }
        }
      ]
    );
  };

  // State du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    location: '',
    availability: 'immediate'
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [experiences, setExperiences] = useState([]);

  // Charger les données du profil quand disponible
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        location: profile.location || '',
        availability: profile.availability || 'immediate'
      });
      setSkills(profile.skills || []);
      setExperiences(profile.experience || []);
    }
  }, [profile]);

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName) {
      Alert.alert('Erreur', 'Le prénom et le nom sont requis');
      return;
    }

    const data = {
      ...formData,
      skills,
      experience: experiences
    };

    saveProfile(data);
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const updateExperience = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mon Profil Candidat</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Informations de base */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>

        <TextInput
          style={styles.input}
          placeholder="Prénom *"
          placeholderTextColor="#8E8E93"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Nom *"
          placeholderTextColor="#8E8E93"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          placeholderTextColor="#8E8E93"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Localisation (ex: Casablanca)"
          placeholderTextColor="#8E8E93"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
        />
      </View>

      {/* Bio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Parlez-nous de vous, votre parcours, vos passions..."
          placeholderTextColor="#8E8E93"
          value={formData.bio}
          onChangeText={(text) => setFormData({ ...formData, bio: text })}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Compétences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compétences</Text>

        <View style={styles.skillInputContainer}>
          <TextInput
            style={[styles.input, styles.skillInput]}
            placeholder="Ajouter une compétence"
            placeholderTextColor="#8E8E93"
            value={skillInput}
            onChangeText={setSkillInput}
          />
          <TouchableOpacity style={styles.addButton} onPress={addSkill}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tagsContainer}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{skill}</Text>
              <TouchableOpacity onPress={() => removeSkill(skill)}>
                <Text style={styles.tagRemove}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Expériences */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Expériences</Text>
          <TouchableOpacity onPress={addExperience}>
            <Text style={styles.addLink}>+ Ajouter</Text>
          </TouchableOpacity>
        </View>

        {experiences.map((exp, index) => (
          <View key={index} style={styles.experienceCard}>
            <TextInput
              style={styles.input}
              placeholder="Poste"
              placeholderTextColor="#8E8E93"
              value={exp.title}
              onChangeText={(text) => updateExperience(index, 'title', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Entreprise"
              placeholderTextColor="#8E8E93"
              value={exp.company}
              onChangeText={(text) => updateExperience(index, 'company', text)}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Date début"
                placeholderTextColor="#8E8E93"
                value={exp.startDate}
                onChangeText={(text) => updateExperience(index, 'startDate', text)}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Date fin"
                placeholderTextColor="#8E8E93"
                value={exp.endDate}
                onChangeText={(text) => updateExperience(index, 'endDate', text)}
              />
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              placeholderTextColor="#8E8E93"
              value={exp.description}
              onChangeText={(text) => updateExperience(index, 'description', text)}
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeExperience(index)}
            >
              <Text style={styles.removeButtonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Disponibilité */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disponibilité</Text>
        <View style={styles.radioGroup}>
          {[
            { value: 'immediate', label: 'Immédiatement' },
            { value: '1-months', label: '1 mois' },
            { value: '2-months', label: '2 mois' },
            { value: '3-months', label: '3 mois' }
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.radioButton,
                formData.availability === option.value && styles.radioButtonActive
              ]}
              onPress={() => setFormData({ ...formData, availability: option.value })}
            >
              <Text
                style={[
                  styles.radioText,
                  formData.availability === option.value && styles.radioTextActive
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Boutons */}
      <TouchableOpacity
        style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Se déconnecter</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA'
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 24,
    paddingTop: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6
  },
  email: {
    fontSize: 15,
    color: '#E3F2FF',
    opacity: 0.9
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E1E8ED',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: '#F8FAFB',
    color: '#1A1A1A'
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top'
  },
  skillInputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16
  },
  skillInput: {
    flex: 1,
    marginBottom: 0
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold'
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#007AFF20'
  },
  tagText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600'
  },
  tagRemove: {
    color: '#007AFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 2
  },
  addLink: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '700'
  },
  experienceCard: {
    backgroundColor: '#F8FAFB',
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E1E8ED'
  },
  row: {
    flexDirection: 'row',
    gap: 10
  },
  halfInput: {
    flex: 1
  },
  removeButton: {
    marginTop: 10
  },
  removeButtonText: {
    color: '#FF3B30',
    fontSize: 15,
    fontWeight: '600'
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14
  },
  radioButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E1E8ED',
    backgroundColor: '#FFFFFF'
  },
  radioButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FF'
  },
  radioText: {
    fontSize: 15,
    color: '#8E8E93',
    fontWeight: '500'
  },
  radioTextActive: {
    color: '#007AFF',
    fontWeight: '700'
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 10
  },
  charCount: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: -8,
    marginBottom: 12,
    fontWeight: '500'
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 14,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  saveButtonDisabled: {
    backgroundColor: '#C7C7CC',
    shadowOpacity: 0
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#FF3B30'
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: '700'
  }
});