import { api } from './base';

export type UserStatus = 'active' | 'pending' | 'banned' | 'rejected';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  company: string;
  role: string;
  status: UserStatus;
  stateRegion?: string;
  address?: string;
  country?: string;
  city?: string;
  zipCode?: string;
  emailVerified: boolean;
  banned: boolean;
  age: number;
}

export interface UsersListParams {
  cursor?: string;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UsersListResponse {
  items: User[];
  nextCursor: string | null;
  total: number;
  hasMore: boolean;
}

export interface StatusCounts {
  all: number;
  active: number;
  pending: number;
  banned: number;
  rejected: number;
}

export interface UpdateUserDto {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  company?: string;
  role?: string;
  status?: UserStatus;
  stateRegion?: string;
  address?: string;
  country?: string;
  city?: string;
  zipCode?: string;
  emailVerified?: boolean;
  banned?: boolean;
  age?: number;
}

export const usersApi = {
  getList: (params: UsersListParams) =>
    api.get<UsersListResponse>('/users', { params }).then((r) => r.data),

  getCounts: (params: { search?: string; role?: string }) =>
    api.get<StatusCounts>('/users/counts', { params }).then((r) => r.data),

  getOne: (id: string) => api.get<User>(`/users/${id}`).then((r) => r.data),

  update: (id: string, data: UpdateUserDto) =>
    api.put<User>(`/users/${id}`, data).then((r) => r.data),

  delete: (id: string) =>
    api.delete<{ success: boolean }>(`/users/${id}`).then((r) => r.data),
};
