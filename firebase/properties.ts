import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  getDoc, 
  Firestore 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  FirebaseStorage 
} from 'firebase/storage';
import { db, storage, isDemoMode } from './config';
import { Property } from '@/types/property';
import { properties as mockPropertiesData } from '@/mocks/properties';

// Mock storage for demo mode
let mockProperties: Property[] = [...mockPropertiesData];
let nextId = mockProperties.length + 1;

// Add a new property
export const addProperty = async (property: Omit<Property, 'id'>, images: string[]) => {
  try {
    if (isDemoMode) {
      // Create a new property with a unique ID
      const newProperty: Property = {
        id: String(nextId++),
        ...property,
        images: images, // In mock mode, we just use the image URIs directly
        //createdAt: new Date(),
        //updatedAt: new Date(),
      };
      
      mockProperties.push(newProperty);
      return newProperty;
    } else {
      if (!db || !storage) {
        throw new Error('Firebase not initialized');
      }
      
      // Collection reference
      const propertiesCollection = collection(db, 'properties');
      
      // Add property document to Firestore
      const docRef = await addDoc(propertiesCollection, {
        ...property,
        createdAt: new Date(),
        updatedAt: new Date(),
        images: [], // Will be updated with uploaded image URLs
      });

      // Upload images and get URLs
      const imageUrls = await Promise.all(
        images.map(async (imageUri, index) => {
          // Make sure storage is defined before using it
          if (!storage) {
            throw new Error('Firebase Storage not initialized');
          }
          
          const imageRef = ref(storage, `properties/${docRef.id}/image_${index}`);
          
          // For web, we need to fetch the image first
          let blob;
          if (imageUri.startsWith('data:')) {
            // Handle base64 data URLs
            const response = await fetch(imageUri);
            blob = await response.blob();
          } else {
            // Handle file URIs
            const response = await fetch(imageUri);
            blob = await response.blob();
          }
          
          await uploadBytes(imageRef, blob);
          return getDownloadURL(imageRef);
        })
      );

      // Update property with image URLs
      await updateDoc(docRef, {
        images: imageUrls,
      });

      return {
        id: docRef.id,
        ...property,
        images: imageUrls,
      };
    }
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

// Get all properties
export const getProperties = async () => {
  try {
    if (isDemoMode) {
      return mockProperties;
    } else {
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      
      const propertiesCollection = collection(db, 'properties');
      const querySnapshot = await getDocs(propertiesCollection);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Property[];
    }
  } catch (error) {
    console.error('Error getting properties:', error);
    throw error;
  }
};

// Get properties by seller ID
export const getSellerProperties = async (sellerId: string) => {
  try {
    if (isDemoMode) {
      //return mockProperties.filter(property => property.sellerId === sellerId);
    } else {
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      
      const propertiesCollection = collection(db, 'properties');
      const q = query(propertiesCollection, where("sellerId", "==", sellerId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Property[];
    }
  } catch (error) {
    console.error('Error getting seller properties:', error);
    throw error;
  }
};

// Get a single property by ID
export const getPropertyById = async (id: string) => {
  try {
    if (isDemoMode) {
      const property = mockProperties.find(p => p.id === id);
      if (!property) {
        throw new Error('Property not found');
      }
      return property;
    } else {
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      
      const docRef = doc(db, 'properties', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as Property;
      } else {
        throw new Error('Property not found');
      }
    }
  } catch (error) {
    console.error('Error getting property:', error);
    throw error;
  }
};

// Update a property
export const updateProperty = async (id: string, property: Partial<Property>, newImages?: string[]) => {
  try {
    if (isDemoMode) {
      const index = mockProperties.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error('Property not found');
      }
      
      // Add new images if provided
      let updatedImages = [...(mockProperties[index].images || [])];
      if (newImages && newImages.length > 0) {
        updatedImages = [...updatedImages, ...newImages];
      }
      
      // Update the property
      const updatedProperty = {
        ...mockProperties[index],
        ...property,
        images: property.images || updatedImages,
        updatedAt: new Date(),
      };
      
      mockProperties[index] = updatedProperty;
      return updatedProperty;
    } else {
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      
      const docRef = doc(db, 'properties', id);
      
      // If there are new images to upload
      if (newImages && newImages.length > 0 && storage) {
        const imageUrls = await Promise.all(
          newImages.map(async (imageUri, index) => {
            // Make sure storage is defined before using it
            if (!storage) {
              throw new Error('Firebase Storage not initialized');
            }
            
            const imageRef = ref(storage, `properties/${id}/image_new_${index}`);
            
            let blob;
            if (imageUri.startsWith('data:')) {
              const response = await fetch(imageUri);
              blob = await response.blob();
            } else {
              const response = await fetch(imageUri);
              blob = await response.blob();
            }
            
            await uploadBytes(imageRef, blob);
            return getDownloadURL(imageRef);
          })
        );
        
        // Add new images to existing ones
        const existingProperty = await getPropertyById(id);
        property.images = [...(existingProperty.images || []), ...imageUrls];
      }
      
      await updateDoc(docRef, {
        ...property,
        updatedAt: new Date(),
      });
      
      return {
        id,
        ...property,
      };
    }
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

// Delete a property
export const deleteProperty = async (id: string) => {
  try {
    if (isDemoMode) {
      mockProperties = mockProperties.filter(p => p.id !== id);
      return true;
    } else {
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      
      // Delete images from storage
      const property = await getPropertyById(id);
      if (property.images && property.images.length > 0 && storage) {
        await Promise.all(
          property.images.map(async (imageUrl) => {
            // Make sure storage is defined before using it
            if (!storage) {
              throw new Error('Firebase Storage not initialized');
            }
            
            // Extract the path from the URL
            const imagePath = imageUrl.split('?')[0].split('/o/')[1].replace(/%2F/g, '/');
            const imageRef = ref(storage, imagePath);
            try {
              await deleteObject(imageRef);
            } catch (error) {
              console.warn('Error deleting image:', error);
              // Continue with deletion even if image deletion fails
            }
          })
        );
      }
      
      // Delete the document
      const docRef = doc(db, 'properties', id);
      await deleteDoc(docRef);
      
      return true;
    }
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};