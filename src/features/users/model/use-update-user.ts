import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, type UpdateUserDto, type User } from '@/shared/api/users-api';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      usersApi.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['users', 'detail', id] });
      const prev = queryClient.getQueryData<User>(['users', 'detail', id]);
      queryClient.setQueryData<User>(['users', 'detail', id], (old) =>
        old ? { ...old, ...data } : old
      );
      return { prev };
    },
    onError: (_err, { id }, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['users', 'detail', id], context.prev);
      }
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'detail', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
