import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { store } from '../store';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import '../global.css';

function RootLayoutNav() {
  const { isAuthenticated, isHydrated, setHydrated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    console.log('RootLayoutNav state:', { isHydrated, isAuthenticated, segments: segments[0], navKey: rootNavigationState?.key });

    // Fallback: If hydration takes too long, force it to finish
    const hydrationTimeout = setTimeout(() => {
      if (!isHydrated) {
        console.warn('Hydration timed out, forcing hydration completion');
        setHydrated();
      }
    }, 2000);

    if (!isHydrated || !rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === 'auth';

    if (isAuthenticated) {
      // If authenticated and in auth group OR at root, go to dashboard
      if (inAuthGroup || !segments[0]) {
        console.log('Redirecting to dashboard');
        router.replace('/dashboard');
      }
    } else if (!isAuthenticated && segments[0] !== 'auth') {
      console.log('Redirecting to login');
      router.replace('/auth/login');
    }

    return () => clearTimeout(hydrationTimeout);
  }, [isAuthenticated, segments, rootNavigationState, isHydrated]);

  if (!isHydrated || !rootNavigationState?.key) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/callback" options={{ title: 'Authenticating...' }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}
