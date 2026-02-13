import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/users-api';

export function useUserDetail(id: string | null) {
  return useQuery({
    queryKey: ['users', 'detail', id],
    queryFn: () => (id ? usersApi.getOne(id) : Promise.reject(new Error('No ID'))),
    enabled: !!id,
  });
}
