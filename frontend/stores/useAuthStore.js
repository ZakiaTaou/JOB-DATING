import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "../services/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false, 

  setAuth: (user, token) => {
    set({ user, token, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await getProfile();
        // Backend returns { success: true, data: user }
        if (response && response.data) {
          set({ user: response.data, token, isAuthenticated: true, isInitialized: true });
        } else {
           // Fallback or error if structure is wrong
           set({ isInitialized: true });
        }
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error("Failed to load user", error);
      await AsyncStorage.removeItem("token");
      set({ user: null, token: null, isAuthenticated: false, isInitialized: true });
    }
  },

}));

