import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { useFonts } from "expo-font";
import { auth } from "../services/firebase";
import CustomLayout from "@/components/CustomLayout";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [user, setUser] = useState<any>(null); // Track authentication state
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (loaded) {
        SplashScreen.hideAsync();
      }
    });

    // Simulate font loading
    setTimeout(() => setLoaded(true), 1000);

    return () => unsubscribe();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <CustomLayout>
      <Stack>
        {!user ? (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="screens/class-details"
              options={{ title: "Class Details" }}
            />
            <Stack.Screen name="+not-found" />
          </>
        )}
      </Stack>
    </CustomLayout>
  );
}
