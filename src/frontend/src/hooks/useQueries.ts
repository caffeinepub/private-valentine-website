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
    onSuccess: async (isValid) => {
      if (isValid) {
        // First, invalidate the query to mark it as stale
        await queryClient.invalidateQueries({ queryKey: ['hasAccess'] });
        
        // Then force an immediate refetch and wait for it to complete
        await queryClient.refetchQueries({ 
          queryKey: ['hasAccess'],
          type: 'active',
          exact: true
        });
        
        // Also set the query data directly to ensure immediate UI update
        queryClient.setQueryData(['hasAccess'], true);
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
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
