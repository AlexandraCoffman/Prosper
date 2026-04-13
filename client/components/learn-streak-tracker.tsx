import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import type { StreakData } from "../app/tabs/learn";

type Props = {
  streak: StreakData;
};

export default function LearnStreakTracker({ streak }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.streakTitle}>{streak.count} day streak</Text>
      <Text style={styles.streakSubtitle}>
        Complete a lesson today to own your finances
      </Text>
      <View style={styles.daysRow}>
        {streak.days.map((day, index) => (
          <View key={index} style={styles.dayColumn}>
            <Text style={styles.dayLabel}>{day.label}</Text>
            <View style={styles.dayCircle}>
              {day.completed && <Text style={styles.checkmark}>✓</Text>}
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
