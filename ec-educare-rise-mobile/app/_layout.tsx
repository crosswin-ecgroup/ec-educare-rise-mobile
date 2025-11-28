import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import '../global.css';

function RootLayoutNav() {
  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === 'auth';

    // Wrap in setTimeout to ensure navigation happens after component mount/update
    const timer = setTimeout(() => {
      if (isAuthenticated && inAuthGroup) {
        router.replace('/dashboard');
      } else if (!isAuthenticated && segments[0] !== 'auth') {
        router.replace('/auth/login');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isAuthenticated, segments, rootNavigationState]);

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
