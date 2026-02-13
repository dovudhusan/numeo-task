import { useInfiniteQuery } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/users-api';
import type { UsersListParams } from '@/shared/api/users-api';

export function useUsersInfinite(params: Omit<UsersListParams, 'cursor'>) {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite', params],
    queryFn: ({ pageParam }) =>
      usersApi.getList({
        ...params,
        cursor: pageParam,
        limit: params.limit ?? 20,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
