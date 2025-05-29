import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Property, PropertyFilter } from '@/types/property';
import { properties as mockProperties } from '@/mocks/properties';
import * as FirebaseProperties from '@/firebase/properties';

interface PropertyState {
  properties: Property[];
  favoriteIds: string[];
  recentlyViewed: string[];
  filter: PropertyFilter;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  toggleFavorite: (id: string) => void;
  addToRecentlyViewed: (id: string) => void;
  updateFilter: (filter: Partial<PropertyFilter>) => void;
  resetFilter: () => void;
  getFilteredProperties: () => Property[];
  isFavorite: (id: string) => boolean;
  
  // Firebase actions
  fetchProperties: () => Promise<void>;
  fetchSellerProperties: (sellerId: string) => Promise<Property[]> | undefined;
  addProperty: (property: Omit<Property, 'id'>, images: string[]) => Promise<Property>;
  updateProperty: (id: string, property: Partial<Property>, newImages?: string[]) => Promise<Property>;
  deleteProperty: (id: string) => Promise<boolean>;
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      properties: mockProperties,
      favoriteIds: [],
      recentlyViewed: [],
      filter: {},
      isLoading: false,
      error: null,

      toggleFavorite: (id: string) => {
        set((state) => {
          const isFavorite = state.favoriteIds.includes(id);
          return {
            favoriteIds: isFavorite
              ? state.favoriteIds.filter((favId) => favId !== id)
              : [...state.favoriteIds, id],
          };
        });
      },

      addToRecentlyViewed: (id: string) => {
        set((state) => {
          // Remove if already exists to avoid duplicates
          const filtered = state.recentlyViewed.filter((viewedId) => viewedId !== id);
          // Add to the beginning of the array and limit to 10 items
          return {
            recentlyViewed: [id, ...filtered].slice(0, 10),
          };
        });
      },

      updateFilter: (filter: Partial<PropertyFilter>) => {
        set((state) => ({
          filter: { ...state.filter, ...filter },
        }));
      },

      resetFilter: () => {
        set({ filter: {} });
      },

      getFilteredProperties: () => {
        const { properties, filter } = get();
        
        return properties.filter((property) => {
          // Price filter
          if (filter.priceMin && property.price < filter.priceMin) return false;
          if (filter.priceMax && property.price > filter.priceMax) return false;
          
          // Beds filter
          if (filter.bedsMin && property.beds < filter.bedsMin) return false;
          
          // Baths filter
          if (filter.bathsMin && property.baths < filter.bathsMin) return false;
          
          // Property type filter
          if (filter.type && filter.type.length > 0 && !filter.type.includes(property.type)) return false;
          
          // Status filter
          if (filter.status && filter.status.length > 0 && !filter.status.includes(property.status as any)) return false;
          
          // 3D Tour filter
          if (filter.has3DTour && !property.has3DTour) return false;
          
          return true;
        });
      },

      isFavorite: (id: string) => {
        return get().favoriteIds.includes(id);
      },
      
      // Firebase actions
      fetchProperties: async () => {
        set({ isLoading: true, error: null });
        try {
          const properties = await FirebaseProperties.getProperties();
          set({ properties, isLoading: false });
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.message || 'Failed to fetch properties' 
          });
        }
      },
      
      fetchSellerProperties: async (sellerId: string) => {
        set({ isLoading: true, error: null });
        try {
          const properties = await FirebaseProperties.getSellerProperties(sellerId);
          set({ isLoading: false });
          return properties;
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.message || 'Failed to fetch seller properties' 
          });
          return [];
        }
      },
      
      addProperty: async (property: Omit<Property, 'id'>, images: string[]) => {
        set({ isLoading: true, error: null });
        try {
          const newProperty = await FirebaseProperties.addProperty(property, images);
          set((state) => ({ 
            properties: [...state.properties, newProperty],
            isLoading: false 
          }));
          return newProperty;
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.message || 'Failed to add property' 
          });
          throw error;
        }
      },
      
      updateProperty: async (id: string, property: Partial<Property>, newImages?: string[]) => {
        set({ isLoading: true, error: null });
        try {
          const updatedProperty = await FirebaseProperties.updateProperty(id, property, newImages);
          set((state) => ({ 
            properties: state.properties.map(p => 
              p.id === id ? { ...p, ...updatedProperty } : p
            ),
            isLoading: false 
          }));
          return updatedProperty as Property;
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.message || 'Failed to update property' 
          });
          throw error;
        }
      },
      
      deleteProperty: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await FirebaseProperties.deleteProperty(id);
          set((state) => ({ 
            properties: state.properties.filter(p => p.id !== id),
            isLoading: false 
          }));
          return true;
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.message || 'Failed to delete property' 
          });
          return false;
        }
      },
    }),
    {
      name: 'property-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favoriteIds: state.favoriteIds,
        recentlyViewed: state.recentlyViewed,
        filter: state.filter,
      }),
    }
  )
);