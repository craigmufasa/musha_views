import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  
  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  
  return <Redirect href="/auth/welcome" />;
}