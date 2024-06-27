import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";

interface ClassCardProps {
  title: string;
  description: string;
  date: string;
  onBook: () => void;
  theme: "light" | "dark";
}

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  description,
  date,
  onBook,
  theme,
}) => {
  const colors = Colors[theme];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.background, shadowColor: colors.text },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.icon }]}>
        {description}
      </Text>
      <Text style={[styles.date, { color: colors.icon }]}>{date}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={onBook}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>
          Book Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginVertical: 8,
  },
  date: {
    fontSize: 14,
    marginBottom: 16,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ClassCard;
