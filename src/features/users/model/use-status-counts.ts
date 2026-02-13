import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/users-api';

export function useStatusCounts(search: string, role?: string) {
  return useQuery({
    queryKey: ['users', 'counts', search, role],
    queryFn: () => usersApi.getCounts({ search: search || undefined, role: role || undefined }),
  });
}
