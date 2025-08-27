import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSaveJob() {
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: (id: string) => window.api.setJobSaved(id),
    onSuccess: (updatedJob) => {
      if (!updatedJob) return;
      queryClient.invalidateQueries({
        queryKey: ["jobs", "saved"],
      });
      queryClient.invalidateQueries({
        queryKey: ["jobs", "unmarked"],
      });
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: (id: string) => window.api.setJobNotSaved(id),
    onSuccess: (updatedJob) => {
      if (!updatedJob) return;
      queryClient.invalidateQueries({
        queryKey: ["jobs", "saved"],
      });
      queryClient.invalidateQueries({
        queryKey: ["jobs", "unmarked"],
      });
    },
  });

  return {
    save: saveMutation.mutate,
    unsave: unsaveMutation.mutate,
    status: saveMutation.status || unsaveMutation.status,
    error: saveMutation.error || unsaveMutation.error,
  };
}
