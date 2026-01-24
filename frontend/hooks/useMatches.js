import {useQuery} from "@tanstack/react-query";
import {getCandidateMatches, getRecruiterMatches} from "../services/api";

export const useCandidateMatches = () => {
  return useQuery({
    queryKey: ['candidate-matches'],        
    queryFn: getCandidateMatches,
  });
}

export const useRecruiterMatches = () => {
  return useQuery({
    queryKey: ['recruiter-matches'],        
    queryFn: getRecruiterMatches,
  });
}