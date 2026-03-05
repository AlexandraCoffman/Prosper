import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";

interface ProgressBarProps {
  progress?: number;
}

export default function ProgressBar({ progress = 20 }: ProgressBarProps) {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    height: 6,
    backgroundColor: Colors.accent,
    overflow: "hidden",
    borderRadius: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
  },
});
