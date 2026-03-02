import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import ProgressHeader from "../../../components/progress-header";
import { ContinueButton } from "../../../components/button";
import Card from "../../../components/card";

interface IncomeSplitProps {
  onNavigateToBudgetPlan?: () => void;
  onBack?: () => void;
  onExit?: () => void;
  progress?: number;
}

export default function IncomeSplit({
  onBack,
  onExit,
  progress = 80,
  onNavigateToBudgetPlan,
}: IncomeSplitProps) {
  return (
    <View style={styles.container}>
      <ProgressHeader onBack={onBack} onExit={onExit} progress={progress} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Income Split</Text>
        <Text style={styles.description}>
          We recommend this income split based on your previous income, current
          expenses, and financial goals
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 25,
    ...Fonts.regular,
    color: Colors.text,
    marginTop: 10,
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  description: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
    marginBottom: 24,
  },
});
