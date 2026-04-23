import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

interface LearnHeaderProps {
  onNavigateToSettings?: () => void;
}

export default function LearnHeader({ onNavigateToSettings }: LearnHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.spacer} />
      <Text style={styles.title}>Learn</Text>
      <TouchableOpacity style={styles.settingsButton} onPress={onNavigateToSettings}>
        <Ionicons name="settings-outline" size={24} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 12,
    backgroundColor: Colors.background,
  },
  spacer: {
    width: 24,
  },
  title: {
    fontSize: 25,
    ...Fonts.regular,
    color: Colors.text,
  },
  settingsButton: {
    width: 24,
    alignItems: "center",
  },
});
