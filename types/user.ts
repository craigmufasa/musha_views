export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  email: string;
  name: string;
  isSeller: boolean;
  role?: UserRole;
  createdAt: string;
  avatar?: string;
  photoURL?: string;
  phone?: string;
  bio?: string;
}