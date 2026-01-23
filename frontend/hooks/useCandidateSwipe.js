import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getJobsToSwipe, swipeJob } from "../services/api";

export const useJobsToSwipe = () => {
  return useQuery({
    queryKey: ["jobs-to-swipe"],
    queryFn: getJobsToSwipe,
  });
};

export const useSwipeJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, action }) => 
      swipeJob(jobId, action),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs-to-swipe"]);
    },
  });
};
