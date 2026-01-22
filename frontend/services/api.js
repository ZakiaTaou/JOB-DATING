import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_url = "http://192.168.68.116:5000/api";

export const api = axios.create({
  baseURL: API_url,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor pour ajouter le token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erreur lors de la connexion";
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erreur lors de l'inscription";
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erreur lors de la récupération du profil";
  }
};
