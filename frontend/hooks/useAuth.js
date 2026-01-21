import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../services/api";
import { useAuthStore } from "../stores/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLoginMutation = () => {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await loginUser(email, password);
      return response;
    },
    onSuccess: async (response) => {
      // Backend returns { success: true, data: { user, token } }
      if (response && response.data) {
        const { user, token } = response.data;
        await AsyncStorage.setItem("token", token);
        setAuth(user, token);
      }
    },
  });
};

export const useRegisterMutation = () => {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await registerUser(userData);
      return response;
    },
    onSuccess: async (response) => {
      if (response && response.data) {
        const { user, token } = response.data;
        await AsyncStorage.setItem("token", token);
        setAuth(user, token);
      }
    },
  });
};

