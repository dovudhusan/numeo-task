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
