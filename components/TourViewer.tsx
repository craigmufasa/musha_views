import React, { useState, useRef, Suspense } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { X, Maximize2, Minimize2 } from 'lucide-react-native';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls, useGLTF, Environment, Text as Text3D } from '@react-three/drei/native';
import { colors } from '@/constants/colors';

// Define proper types for our rooms
interface HotspotData {
  roomId: string;
  position: [number, number, number]; // x, y, z coordinates
  label: string;
}

interface TourRoom {
  id: string;
  name: string;
  modelUrl: string; // URL to the GLB/GLTF file
  connections: string[];
  hotspots: HotspotData[];
}

interface TourViewerProps {
  rooms: TourRoom[];
  initialRoomId?: string;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

// Define prop types for the RoomModel component
interface RoomModelProps {
  modelUrl: string;
  hotspots: HotspotData[];
  onNavigate: (roomId: string) => void;
}

// Define prop types for the HotspotMarker component
interface HotspotMarkerProps {
  position: [number, number, number];
  label: string;
  onClick: () => void;
}

// Component to render a 3D model - uses useGLTF hook instead of GLTFLoader directly
const RoomModel: React.FC<RoomModelProps> = ({ modelUrl, hotspots, onNavigate }) => {
  // useGLTF is a hook that loads the model and handles caching
  const { scene } = useGLTF(modelUrl);
  
  return (
    <>
      <primitive object={scene} scale={0.5} />
      {hotspots.map((hotspot, index) => (
        <HotspotMarker 
          key={index} 
          position={hotspot.position}
          label={hotspot.label} 
          onClick={() => onNavigate(hotspot.roomId)} 
        />
      ))}
    </>
  );
};

// Component for hotspot in 3D space
const HotspotMarker: React.FC<HotspotMarkerProps> = ({ position, label, onClick }) => {
  return (
    <group position={position} onClick={onClick}>
      {/* Main hotspot sphere */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#00D1B2" opacity={0.8} transparent />
      </mesh>
      
      {/* Outer ring for better visibility */}
      <mesh>
        <ringGeometry args={[0.25, 0.35, 16]} />
        <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
      </mesh>
      
      {/* 3D Text label */}
      <Text3D
        position={[0, 0.5, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text3D>
    </group>
  );
};

export const TourViewer: React.FC<TourViewerProps> = ({ rooms, initialRoomId, onClose }) => {
  const [currentRoomId, setCurrentRoomId] = useState(initialRoomId || rooms[0].id);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentRoom = rooms.find(room => room.id === currentRoomId) || rooms[0];
  
  const navigateToRoom = (roomId: string) => {
    setIsLoading(true);
    setCurrentRoomId(roomId);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleModelLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, isFullscreen && styles.fullscreenContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.roomName}>{currentRoom.name}</Text>
        <TouchableOpacity onPress={toggleFullscreen} style={styles.fullscreenButton}>
          {isFullscreen ? (
            <Minimize2 size={24} color="white" />
          ) : (
            <Maximize2 size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.modelContainer}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>Loading room...</Text>
          </View>
        )}
        
        <Canvas onCreated={handleModelLoad}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <RoomModel 
              modelUrl={currentRoom.modelUrl} 
              hotspots={currentRoom.hotspots || []}
              onNavigate={navigateToRoom}
            />
            <Environment preset="apartment" />
          </Suspense>
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.5}
            panSpeed={0.5}
            rotateSpeed={0.5}
          />
        </Canvas>
      </View>

      {/* Room selector */}
      <View style={styles.roomSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {rooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={[
                styles.roomButton,
                currentRoomId === room.id && styles.activeRoomButton
              ]}
              onPress={() => navigateToRoom(room.id)}
            >
              <Text 
                style={[
                  styles.roomButtonText,
                  currentRoomId === room.id && styles.activeRoomButtonText
                ]}
              >
                {room.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>
          Drag to look around • Pinch to zoom • Tap on hotspots to move between rooms
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullscreenContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    padding: 8,
  },
  fullscreenButton: {
    padding: 8,
  },
  roomName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modelContainer: {
    flex: 1,
    position: 'relative',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
  roomSelector: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  roomButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeRoomButton: {
    backgroundColor: colors.secondary,
  },
  roomButtonText: {
    color: 'white',
    fontSize: 14,
  },
  activeRoomButtonText: {
    fontWeight: '600',
  },
  instructions: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  instructionsText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
});