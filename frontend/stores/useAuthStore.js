import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "../services/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,

  setAuth: async (user, token) => {
    await AsyncStorage.setItem("token", token);
    set({
      user,
      token,
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  loadUser: async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        set({ isInitialized: true });
        return;
      }

      const response = await getProfile();

      if (response?.data) {
        set({
          user: response.data,
          token,
          isAuthenticated: true,
          isInitialized: true,
        });
      } else {
        await AsyncStorage.removeItem("token");
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error("loadUser error:", error);
      await AsyncStorage.removeItem("token");
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isInitialized: true,
      });
    }
  },
}));
