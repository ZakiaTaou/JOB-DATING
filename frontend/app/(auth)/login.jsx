import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import { useRouter, Link } from "expo-router";
import { useLoginMutation } from "../../hooks/authHook";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { loginSchema } from "../../constants/validationSchemas";

export default function Login() {
    const router = useRouter();
    const loginMutation = useLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleLogin = async () => {
        // Validation Zod
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }
        setErrors({}); // Clear errors if valid

        loginMutation.mutate(
            { email, password },
            {
                onSuccess: () => {
                    // La redirection peut se faire ici ou dans le hook si le routeur était accessible là-bas
                    // Mais souvent l'UI gère la navigation
                    router.replace("/(tabs)");
                },
                onError: (error) => {
                    // L'erreur est gérée, React Query nous donne l'erreur
                    Alert.alert("Erreur de connexion", typeof error === 'string' ? error : "Une erreur est survenue");
                }
            }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Image
                            source={require("../../assets/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.title}>Bon retour !</Text>
                    <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={[styles.input, errors.email && styles.inputError]}
                                placeholder="votre@email.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mot de passe</Text>
                            <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="••••••••"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#666" />
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Se connecter</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Pas encore de compte ? </Text>
                            <Link href="/register" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.link}>S'inscrire</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
