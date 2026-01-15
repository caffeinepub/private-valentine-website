import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useValidatePassword() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (password: string) => {
      if (!actor) throw new Error('Actor not available');
      const isValid = await actor.validatePassword(password);
      return isValid;
    },
    onSuccess: (isValid) => {
      if (isValid) {
        // Immediately update the cache to ensure instant UI transition
        queryClient.setQueryData(['hasAccess'], true);
        
        // Invalidate to ensure consistency with backend
        queryClient.invalidateQueries({ queryKey: ['hasAccess'] });
      }
    },
  });
}

export function useCheckAccess() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['hasAccess'],
    queryFn: async () => {
      if (!actor) return false;
      const result = await actor.hasAccess();
      return result;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
