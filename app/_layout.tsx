import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SessionProvider, useSession } from "@/contexts/SessionContext";
import { useNavigation } from "@react-navigation/native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const { user, loading } = useSession();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  useEffect(() => {
    if (!loading) {
      const inAuthGroup = segments[0] === "(auth)";
      if (!user && !inAuthGroup) {
        router.replace("/login");
      } else if (user && inAuthGroup) {
        router.replace("/(tabs)");
      }
    }
  }, [user, loading, segments]);

  if (!fontsLoaded || loading) {
    return null; // You can replace this with a loading screen component if desired
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/class-details"
        options={{ title: "Class Details" }}
      />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

// Wrap your entire application with SessionProvider
export default function App() {
  return (
    <SessionProvider>
      <RootLayout />
    </SessionProvider>
  );
}
