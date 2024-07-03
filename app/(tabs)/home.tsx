import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import ClassList from "@/components/ClassList";
import { Colors } from "@/constants/Colors";

interface Class {
  id: string;
  title: string;
  description: string;
  date: string;
}

export default function HomeScreen() {
  const [classes, setClasses] = useState<Class[]>([
    {
      id: "1",
      title: "Yoga Class",
      description: "A relaxing yoga session.",
      date: "2024-06-25",
    },
    {
      id: "2",
      title: "Pilates Class",
      description: "A challenging pilates workout.",
      date: "2024-06-26",
    },
    {
      id: "3",
      title: "Cardio Class",
      description: "An intense cardio session.",
      date: "2024-06-27",
    },
  ]);

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const router = useRouter();

  const handleBookClass = (id: string) => {
    const selectedClass = classes.find((cls) => cls.id === id);
    if (selectedClass) {
      router.push(`/screens/class-details?classType=${selectedClass.title}`);
    }
  };

  return (
    <View style={styles.container}>
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
