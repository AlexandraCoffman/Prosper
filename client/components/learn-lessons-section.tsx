import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import type { Lesson } from "../app/tabs/learn";

type Props = {
  lessons: Lesson[];
  onComplete: () => void;
};

export default function LearnLessonsSection({ lessons, onComplete }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Lessons</Text>

      {lessons.map((lesson, index) => (
        <View key={index}>
          {index > 0 && <View style={styles.divider} />}
          <TouchableOpacity
            style={styles.lessonRow}
            onPress={onComplete}
          >
            <View style={styles.iconCircle}>
              <Ionicons
                name={lesson.icon as any}
                size={18}
                color={Colors.text}
              />
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.duration}>{lesson.duration}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.accent,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    ...Fonts.regular,
    color: Colors.text,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.background,
    marginVertical: 8,
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textBlock: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
  },
  duration: {
    fontSize: 12,
    ...Fonts.regular,
    color: Colors.text,
    marginTop: 2,
  },
});
