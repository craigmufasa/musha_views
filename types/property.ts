export type PropertyType = 'house' | 'apartment' | 'Hotels & Lodges'|'Commercial Warehouse'| 'townhouse';
export type PropertyStatus = 'for_sale' | 'for_rent' | 'sold' | 'pending';

export interface PropertyFilter {
  priceMin?: number;
  priceMax?: number;
  bedsMin?: number;
  bathsMin?: number;
  type?: PropertyType[];
  status?: PropertyStatus[];
  has3DTour?: boolean;
  has3DModel?: boolean;
}

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'house' | 'apartment' | 'Hotels & Lodges'|'Commercial Warehouse'| 'townhouse';
  yearBuilt: number;
  description: string;
  images: string[];
  latitude: number;
  longitude: number;
  features: string[];
  status: 'for_sale' | 'for_rent' | 'sold' | 'pending';
  listedDate: string;
  has3DTour?: boolean;
  tourRooms?: TourRoom[];
}

export interface TourRoom {
  id: string;
  name: string;
  modelUrl: string; // URL to the GLB/GLTF file
  connections: string[];
  hotspots: {
    roomId: string;
    position: [number, number, number]; // 3D coordinates in the model
    label: string;
  }[];
}


export interface Model3D {
  id: string;
  name: string;
  modelUrl: string;
  thumbnailUrl: string;
  format: '3d-model/gltf' | '3d-model/glb' | '3d-model/obj' | '3d-model/usdz';
  scale?: number;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
}

