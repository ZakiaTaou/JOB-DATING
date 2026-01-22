import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../services/profileService";
import { Alert } from "react-native";

export const useProfile = (role) => {
  const queryClient = useQueryClient();

  // Déterminer quelle fonction utiliser selon le rôle
  const getProfileFn =
    role === "candidate"
      ? profileService.getMyCandidateProfile
      : profileService.getMyRecruiterProfile;

  const createProfileFn =
    role === "candidate"
      ? profileService.createCandidateProfile
      : profileService.createRecruiterProfile;

  const updateProfileFn =
    role === "candidate"
      ? profileService.updateCandidateProfile
      : profileService.updateRecruiterProfile;

  // Query pour récupérer le profil
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [`${role}Profile`],
    queryFn: getProfileFn,
    retry: false,
    onError: (error) => {
      // Si 404, c'est normal (profil pas encore créé)
      if (error.response?.status !== 404) {
        console.error("Erreur chargement profil:", error);
      }
    },
  });

  // Mutation pour créer ou modifier
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      // Si le profil existe, on update, sinon on crée
      if (profile) {
        return await updateProfileFn(data);
      } else {
        return await createProfileFn(data);
      }
    },
    onSuccess: (data) => {
      // Invalider le cache pour recharger le profil
      queryClient.invalidateQueries([`${role}Profile`]);
      Alert.alert("Succès", "Profil sauvegardé avec succès");
    },
    onError: (error) => {
      const validationErrors = error?.response?.data?.errors;
      const message =
        (validationErrors &&
          validationErrors.map((e) => e.message).join("\n")) ||
        error?.response?.data?.message ||
        "Erreur lors de la sauvegarde";
      Alert.alert("Erreur", message);
    },
  });

  return {
    // Data
    profile,
    isLoading,
    error,

    // Actions
    saveProfile: saveMutation.mutate,
    isSaving: saveMutation.isPending,
    refetch,
  };
};
