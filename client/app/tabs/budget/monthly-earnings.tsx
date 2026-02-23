// Alexandra Coffman - Estimate Monthly Earnings Screen
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "../../../styles/fonts";
import { Colors } from "../../../styles/colors";

interface MonthlyEarningsProps {
  onBack?: () => void;
}

export default function MonthlyEarnings({ onBack }: MonthlyEarningsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            {onBack && (
            <Pressable onPress={onBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </Pressable>
          )}
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFill} />
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={onBack} style={styles.exitButton}>
            <Ionicons name="close" size={28} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Monthly Earnings</Text>
        <Text style={styles.description}>
          If you’ve had an seasonal or irregular income, click the earnings from
          each month and we’ll handle the division
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 10,
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
    height: 8,
    backgroundColor: Colors.accent,
    overflow: "hidden",
    borderRadius: 12,
  },
  progressBarFill: {
    width: "20%",
    height: "100%",
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 24,
    ...Fonts.regular,
    color: Colors.text,
    marginTop: 0,
    alignContent: "flex-start",
  },
  scrollContent: {
    padding: 8,
    paddingTop: 8,
    paddingBottom: 24,
  },
  description: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
    marginTop: 8,
  },
});
