import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, Firestore } from 'firebase/firestore';
import { auth, db, isDemoMode } from './config';
import { User, UserRole } from '@/types/user';

// Mock user storage for demo mode
const mockUsers = new Map<string, User>();
let currentMockUser: User | null = null;

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Sign up a new user
export const signUp = async (email: string, password: string, name: string, isSeller: boolean = false): Promise<User> => {
  try {
    if (isDemoMode) {
      // Check if user already exists in mock storage
      const existingUser = Array.from(mockUsers.values()).find(u => u.email === email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create mock user
      const userId = generateId();
      const newUser: User = {
        id: userId,
        email: email,
        name: name,
        isSeller: isSeller,
        createdAt: new Date().toISOString(),
      };

      // Store in mock storage
      mockUsers.set(userId, newUser);
      currentMockUser = newUser;

      return newUser;
    } else {
      // Real Firebase implementation
      if (!auth || !db) {
        throw new Error('Firebase not initialized');
      }
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update profile with display name
      await updateProfile(firebaseUser, {
        displayName: name
      });
      
      // Create user document in Firestore
      const userData: User = {
        id: firebaseUser.uid,
        email: email,
        name: name,
        isSeller: isSeller,
        createdAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      return userData;
    }
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in an existing user
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    if (isDemoMode) {
      // Find user in mock storage
      const user = Array.from(mockUsers.values()).find(u => u.email === email);
      if (!user) {
        // For demo purposes, create a new user if not found
        return signUp(email, password, email.split('@')[0]);
      }
      
      currentMockUser = user;
      return user;
    } else {
      // Real Firebase implementation
      if (!auth || !db) {
        throw new Error('Firebase not initialized');
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        return userDoc.data() as User;
      } else {
        // If user document doesn't exist, create it
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          name: firebaseUser.displayName || email.split('@')[0],
          isSeller: false,
          createdAt: new Date().toISOString(),
        };
        
        await setDoc(doc(db, 'users', firebaseUser.uid), userData);
        
        return userData;
      }
    }
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    if (isDemoMode) {
      currentMockUser = null;
    } else {
      if (!auth) {
        throw new Error('Firebase not initialized');
      }
      await firebaseSignOut(auth);
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    if (isDemoMode) {
      // Just pretend it worked in demo mode
      return;
    } else {
      if (!auth) {
        throw new Error('Firebase not initialized');
      }
      await sendPasswordResetEmail(auth, email);
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  if (isDemoMode) {
    return currentMockUser;
  }
  
  if (!auth || !db) {
    throw new Error('Firebase not initialized');
  }
  
  const firebaseUser = auth.currentUser;
  
  if (!firebaseUser) {
    return null;
  }
  
  try {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (userDoc.exists()) {
      return userDoc.data() as User;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, data: Partial<User>): Promise<User> => {
  try {
    if (isDemoMode) {
      const user = mockUsers.get(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const updatedUser = { ...user, ...data };
      mockUsers.set(userId, updatedUser);
      
      if (currentMockUser?.id === userId) {
        currentMockUser = updatedUser;
      }
      
      return updatedUser;
    } else {
      if (!db || !auth) {
        throw new Error('Firebase not initialized');
      }
      
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, data);
      
      // If updating name, also update in Firebase Auth
      if (data.name && auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: data.name
        });
      }
      
      const updatedDoc = await getDoc(userRef);
      return updatedDoc.data() as User;
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Upgrade user to seller
export const upgradeToSeller = async (userId: string): Promise<User> => {
  try {
    if (isDemoMode) {
      const user = mockUsers.get(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const updatedUser = { ...user, isSeller: true, role: 'seller' as UserRole };
      mockUsers.set(userId, updatedUser);
      
      if (currentMockUser?.id === userId) {
        currentMockUser = updatedUser;
      }
      
      return updatedUser;
    } else {
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { isSeller: true, role: 'seller' });
      
      const updatedDoc = await getDoc(userRef);
      return updatedDoc.data() as User;
    }
  } catch (error) {
    console.error('Error upgrading to seller:', error);
    throw error;
  }
};