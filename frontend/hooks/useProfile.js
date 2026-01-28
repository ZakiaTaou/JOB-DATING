import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../services/profileService";
import { Alert } from "react-native";

export const useProfile = (role) => {
  const queryClient = useQueryClient();

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
      if (error.response?.status !== 404) {
        console.error("Erreur chargement profil:", error);
      }
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (profile) {
        return await updateProfileFn(data);
      } else {
        return await createProfileFn(data);
      }
    },
    onSuccess: (data) => {
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
    profile,
    isLoading,
    error,

    saveProfile: saveMutation.mutate,
    isSaving: saveMutation.isPending,
    refetch,
  };
};
