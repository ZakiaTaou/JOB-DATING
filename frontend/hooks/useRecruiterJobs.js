import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyJobs, deleteJob, createJob } from "../services/api";

export const useMyJobs = () =>
  useQuery({
    queryKey: ["my-jobs"],
    queryFn: getMyJobs,
  });

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["my-jobs"]);
    },
  });
};

export const useCreateJob = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createJob,
        onSuccess: () => {
            queryClient.invalidateQueries(["my-jobs"]);
        },
    });
};