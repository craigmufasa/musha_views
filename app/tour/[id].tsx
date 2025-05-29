import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TourViewer } from '@/components/TourViewer';
import { usePropertyStore } from '@/store/property-store';

export default function TourScreen() {
  const { id } = useLocalSearchParams();
  const { properties } = usePropertyStore();
  const router = useRouter();
  
  const property = properties.find(p => p.id === id);
  
  if (!property || !property.has3DTour || !property.tourRooms) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: "3D Tour" }} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            3D tour not available for this property
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{ 
          title: `3D Tour: ${property.address}`,
          headerShown: false
        }} 
      />
      <TourViewer 
        rooms={property.tourRooms} 
        onClose={() => router.back()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});