import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserType = 'buyer' | 'seller' | null;

interface UserState {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userType: null,
      
      setUserType: (type) => {
        set({ userType: type });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);