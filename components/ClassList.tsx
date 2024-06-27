import React from "react";
import { FlatList, StyleSheet, View, ListRenderItem } from "react-native";
import ClassCard from "./ClassCard";

interface Class {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface ClassListProps {
  classes: Class[];
  onBookClass: (id: string) => void;
  theme: "light" | "dark";
}

const ClassList: React.FC<ClassListProps> = ({
  classes,
  onBookClass,
  theme,
}) => {
  const renderItem: ListRenderItem<Class> = ({ item }) => (
    <ClassCard
      title={item.title}
      description={item.description}
      date={item.date}
      onBook={() => onBookClass(item.id)}
      theme={theme}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ClassList;
