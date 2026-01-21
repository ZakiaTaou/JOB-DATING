import { api } from "./api";

export const profileService = {
  // Candidat
  createCandidateProfile: async (data) => {
    const response = await api.post('/candidates/profile', data);
    return response.data.data;
  },

  updateCandidateProfile: async (data) => {
    const response = await api.put('/candidates/profile', data);
    return response.data.data;
  },

  getMyCandidateProfile: async () => {
    const response = await api.get('/candidates/profile/me');
    return response.data.data;
  },

  // Recruteur
  createRecruiterProfile: async (data) => {
    const response = await api.post('/recruiters/profile', data);
    return response.data.data;
  },

  updateRecruiterProfile: async (data) => {
    const response = await api.put('/recruiters/profile', data);
    return response.data.data;
  },

  getMyRecruiterProfile: async () => {
    const response = await api.get('/recruiters/profile/me');
    return response.data.data;
  },
};