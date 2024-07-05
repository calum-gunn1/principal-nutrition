import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import ClassList from "@/components/ClassList";
import { auth, firestore } from "@/services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface Class {
  id: string;
  title: string;
  description: string;
  date: string;
}

const HomeScreen = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchClasses();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchClasses = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, "classes"));
      const classesData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Class)
      );
      setClasses(classesData);
    } catch (error) {
      console.error("Error fetching classes:", error);
      Alert.alert("Error", "Failed to fetch classes. Please try again later.");
    }
  };

  const handleBookClass = (id: string) => {
    const selectedClass = classes.find((cls) => cls.id === id);
    if (selectedClass) {
      router.push(`/screens/class-details?classType=${selectedClass.title}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Failed to log out. Please try again later.");
    }
  };

  if (!user) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
        <Button title="Login" onPress={() => router.push("/login")} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Button title="Logout" onPress={handleLogout} />
      <ClassList
        classes={classes}
        onBookClass={handleBookClass}
        theme={colorScheme} // Pass the theme prop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
});

export default HomeScreen;
