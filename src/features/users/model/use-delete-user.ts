import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/users-api';

export function useDeleteUser(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['users', 'detail', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onSuccess?.();
    },
  });
}
