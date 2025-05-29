import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Home, Building, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/user-store';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { setUserType } = useUserStore();

  const handleSelectBuyer = () => {
    setUserType('buyer');
    router.push('/(tabs)');
  };

  const handleSelectSeller = () => {
    setUserType('seller');
    router.push('/seller-dashboard');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>Welcome to</Text>
        <Text style={styles.appName}>Musha Views</Text>
        <Text style={styles.subtitle}>
          Your journey to finding the perfect home starts here
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.question}>I am looking to...</Text>

        <TouchableOpacity 
          style={styles.optionCard} 
          onPress={handleSelectBuyer}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[colors.primary, '#0e5bb7']}
            style={styles.optionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionIconContainer}>
                <Home size={32} color="white" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Buy or Rent</Text>
                <Text style={styles.optionDescription}>
                  Find your dream home from thousands of listings
                </Text>
              </View>
              <ArrowRight size={24} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionCard} 
          onPress={handleSelectSeller}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[colors.secondary, '#00a890']}
            style={styles.optionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionIconContainer}>
                <Building size={32} color="white" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Sell or Rent Out</Text>
                <Text style={styles.optionDescription}>
                  List your property and connect with potential buyers
                </Text>
              </View>
              <ArrowRight size={24} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', colors.background]}
          style={styles.imageGradient}
          pointerEvents="none"
        />
      </View>

      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => router.push('/(tabs)')}
      >
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    color: colors.text,
    marginBottom: 4,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 22,
  },
  optionsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    zIndex: 1,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  optionCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  optionGradient: {
    borderRadius: 16,
    padding: 20,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    zIndex: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  skipButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    zIndex: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});