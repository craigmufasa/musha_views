import { Stack } from "expo-router";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/store/auth-store";
import { Redirect } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  
  // If user is authenticated, redirect to tabs
  if (isAuthenticated) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "Log In" }} />
      <Stack.Screen name="signup" options={{ title: "Create Account" }} />
      <Stack.Screen name="forgot-password" options={{ title: "Reset Password" }} />
    </Stack>
  );
}