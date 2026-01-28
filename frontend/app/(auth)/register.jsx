import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useRegisterMutation } from "../../hooks/useAuth";
import { registerSchema } from "../../constants/validationSchemas";
import { useAuthStore } from "../../stores/useAuthStore";

export default function Register() {
  const registerMutation = useRegisterMutation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = () => {
    const result = registerSchema.safeParse({ email, password, role });

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    registerMutation.mutate(
      { email, password, role },
      {
        onSuccess: async (response) => {
          const { user, token } = response.data;

          await setAuth(user, token);
        },
        onError: () => {
          Alert.alert(
            "Erreur d'inscription",
            "Impossible de créer le compte"
          );
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>
              Rejoignez Job Dating aujourd'hui
            </Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="votre@email.com"
                  placeholderTextColor="#8E8E93"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mot de passe</Text>
                <View
                  style={[
                    styles.passwordContainer,
                    errors.password && styles.inputError,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Min 6 caractères, 1 chiffre"
                    placeholderTextColor="#8E8E93"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye" : "eye-off"}
                      size={22}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Vous êtes ?</Text>
                <View style={styles.roleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      role === "candidate" && styles.roleButtonActive,
                    ]}
                    onPress={() => setRole("candidate")}
                  >
                    <Text
                      style={[
                        styles.roleText,
                        role === "candidate" && styles.roleTextActive,
                      ]}
                    >
                      Candidat
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      role === "recruiter" && styles.roleButtonActive,
                    ]}
                    onPress={() => setRole("recruiter")}
                  >
                    <Text
                      style={[
                        styles.roleText,
                        role === "recruiter" && styles.roleTextActive,
                      ]}
                    >
                      Recruteur
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.role && (
                  <Text style={styles.errorText}>{errors.role}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>S'inscrire</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Déjà un compte ? </Text>
                <Link href="/login">
                  <Text style={styles.link}>Se connecter</Text>
                </Link>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 32,
        textAlign: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 200,
    },
    form: {
        gap: 20,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    inputError: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        backgroundColor: "#f9f9f9",
        paddingHorizontal: 16,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 4,
    },
    roleContainer: {
        flexDirection: "row",
        gap: 12,
    },
    roleButton: {
        flex: 1,
        padding: 14,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: "#f9f9f9",
    },
    roleButtonActive: {
        borderColor: "#007AFF",
        backgroundColor: "#E3F2FD",
    },
    roleText: {
        fontSize: 16,
        color: "#666",
        fontWeight: "500",
    },
    roleTextActive: {
        color: "#007AFF",
        fontWeight: "700",
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 18,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },
    footerText: {
        fontSize: 16,
        color: "#666",
    },
    link: {
        fontSize: 16,
        color: "#007AFF",
        fontWeight: "600",
    },
});
