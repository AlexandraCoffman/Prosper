import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

const DAYS = [
  { label: "S", completed: true },
  { label: "M", completed: true },
  { label: "T", completed: true },
  { label: "W", completed: false },
  { label: "T", completed: false },
  { label: "F", completed: false },
  { label: "S", completed: false },
];

export default function LearnStreakTracker() {
  return (
    <View style={styles.card}>
      <Text style={styles.streakTitle}>3 day streak</Text>
      <Text style={styles.streakSubtitle}>
        Complete a lesson today to own your finances
      </Text>
      <View style={styles.daysRow}>
        {DAYS.map((day, index) => (
          <View key={index} style={styles.dayColumn}>
            <Text style={styles.dayLabel}>{day.label}</Text>
            <View style={styles.dayCircle}>
              {day.completed && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
          </View>
        ))}
      </View>
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
    paddingBottom: 20,
  },
  streakTitle: {
    fontSize: 20,
    ...Fonts.regular,
    color: Colors.text,
    marginBottom: 4,
  },
  streakSubtitle: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
    marginBottom: 16,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayColumn: {
    alignItems: "center",
    flex: 1,
  },
  dayLabel: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
    marginBottom: 6,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.accent2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "700",
  },
});
