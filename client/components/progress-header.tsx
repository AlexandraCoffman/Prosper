import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";

interface ProgressHeaderProps {
  onBack?: () => void;
  onExit?: () => void;
  progress?: number;
}

export default function ProgressHeader({
  onBack,
  onExit,
  progress = 20,
}: ProgressHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.headerRight}>
        <Pressable onPress={onExit} style={styles.exitButton}>
          <Ionicons name="close" size={28} color={Colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  backButton: {
    padding: 4,
  },
  exitButton: {
    padding: 4,
  },
  progressBarContainer: {
    flex: 4,
    height: 6,
    backgroundColor: Colors.accent,
    overflow: "hidden",
    borderRadius: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.text,
  },
});
