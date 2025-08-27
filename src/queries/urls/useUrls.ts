import { useQuery } from "@tanstack/react-query";

export function useUrls() {
  return useQuery({
    queryKey: ["urls"],
    queryFn: () => window.api.getUrls(),
  });
}
