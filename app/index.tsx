import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import { useRouter } from "expo-router";
import ClassList from "@/components/ClassList";
import { auth, firestore } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

interface Class {
  id: string;
  title: string;
  description: string;
  date: string;
}

export default function HomeScreen() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const router = useRouter();

  useEffect(() => {
    const fetchClasses = async () => {
      const snapshot = await getDocs(collection(firestore, "classes"));
      const classesData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Class)
      );
      setClasses(classesData);
    };

    fetchClasses();
  }, []);

  const handleBookClass = (id: string) => {
    const selectedClass = classes.find((cls) => cls.id === id);
    if (selectedClass) {
      router.push(`/screens/class-details?classType=${selectedClass.title}`);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
      <ClassList
        classes={classes}
        onBookClass={handleBookClass}
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
});
