import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

const LESSONS = [
  {
    icon: "bag-outline" as const,
    title: "How to Properly budget for groceries?",
    duration: "5 min",
  },
  {
    icon: "bar-chart-outline" as const,
    title: "Budgeting with yearly irregular income",
    duration: "2 min",
  },
  {
    icon: "card-outline" as const,
    title: "Learning to invest for beginners",
    duration: "3 min",
  },
];

export default function LearnLessonsSection() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Lessons</Text>

      {LESSONS.map((lesson, index) => (
        <View key={index}>
          {index > 0 && <View style={styles.divider} />}
          <View style={styles.lessonRow}>
            <View style={styles.iconCircle}>
              <Ionicons name={lesson.icon} size={16} color={Colors.text} />
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.duration}>{lesson.duration}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.text} />
          </View>
        </View>
      ))}

      <View style={styles.divider} />
      <TouchableOpacity>
        <Text style={styles.moreLink}>Check out more of our lessons</Text>
      </TouchableOpacity>
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
    marginBottom: 8,
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
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
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.background,
    borderRadius: 10,
    marginVertical: 2,
  },
  moreLink: {
    fontSize: 15,
    ...Fonts.bold,
    color: Colors.text,
    textAlign: "center",
    paddingVertical: 10,
  },
});
