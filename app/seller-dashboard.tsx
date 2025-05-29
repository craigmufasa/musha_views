import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  Home, 
  Plus, 
  Users, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  Settings,
  ChevronRight
} from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function SellerDashboardScreen() {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.titleText}>Seller Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Active Listings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Total Views</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Inquiries</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addPropertyButton}>
          <Plus size={20} color="white" />
          <Text style={styles.addPropertyText}>Add New Property</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Properties</Text>
          
          <View style={styles.propertyCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
              style={styles.propertyImage}
            />
            <View style={styles.propertyContent}>
              <Text style={styles.propertyPrice}>$750,000</Text>
              <Text style={styles.propertyAddress}>3078 41st crescent, Glen view 2, Harare</Text>
              <View style={styles.propertyStats}>
                <Text style={styles.propertyStat}>4 bd</Text>
                <Text style={styles.statDivider}>|</Text>
                <Text style={styles.propertyStat}>3 ba</Text>
                <Text style={styles.statDivider}>|</Text>
                <Text style={styles.propertyStat}>2,200 sqm</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.propertyCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
              style={styles.propertyImage}
            />
            <View style={styles.propertyContent}>
              <Text style={styles.propertyPrice}>$1,100,000</Text>
              <Text style={styles.propertyAddress}>222 Highland Drive, Harare</Text>
              <View style={styles.propertyStats}>
                <Text style={styles.propertyStat}>3 bd</Text>
                <Text style={styles.statDivider}>|</Text>
                <Text style={styles.propertyStat}>2.5 ba</Text>
                <Text style={styles.statDivider}>|</Text>
                <Text style={styles.propertyStat}>1,750 sqm</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Users size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Potential Buyers</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <MessageSquare size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Messages</Text>
            </View>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Calendar size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Schedule Viewings</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <BarChart3 size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Analytics</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Settings size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.switchButton}
          onPress={navigateToHome}
        >
          <Home size={20} color={colors.primary} />
          <Text style={styles.switchButtonText}>Switch to Buyer Mode</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textLight,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
  addPropertyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 24,
    gap: 8,
  },
  addPropertyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  propertyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  propertyImage: {
    width: '100%',
    height: 150,
  },
  propertyContent: {
    padding: 16,
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  propertyStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyStat: {
    fontSize: 14,
    color: colors.textLight,
  },
  statDivider: {
    marginHorizontal: 6,
    color: colors.textExtraLight,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  menuSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
  },
  badgeContainer: {
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 40,
    gap: 8,
  },
  switchButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});