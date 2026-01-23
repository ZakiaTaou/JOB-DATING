import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCandidatesToSwipe, swipeCandidate } from "../services/api";

export const useCandidatesToSwipe = () => {
  return useQuery({
    queryKey: ["candidates-to-swipe"],
    queryFn: getCandidatesToSwipe,
  });
};

export const useSwipeCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ candidateId, action }) =>
      swipeCandidate(candidateId, action),
    onSuccess: () => {
      queryClient.invalidateQueries(["candidates-to-swipe"]);
    },
  });
};
