import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  completeOnboarding: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,

      login: async (email: string, password: string) => {
        // In a real app, this would make an API call to authenticate
        // For demo purposes, we'll simulate a successful login with any credentials
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful login
        set({
          user: {
            id: '1',
            email,
            name: email.split('@')[0], // Use part of email as name
          },
          isAuthenticated: true,
        });
        
        return true;
      },

      signup: async (name: string, email: string, password: string) => {
        // In a real app, this would make an API call to register a new user
        // For demo purposes, we'll simulate a successful registration
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful signup
        set({
          user: {
            id: '1',
            email,
            name,
          },
          isAuthenticated: true,
        });
        
        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      completeOnboarding: () => {
        set({
          hasCompletedOnboarding: true,
        });
      },

      resetPassword: async (email: string) => {
        // In a real app, this would trigger a password reset email
        // For demo purposes, we'll simulate a successful request
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return true;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
    }
  )
);