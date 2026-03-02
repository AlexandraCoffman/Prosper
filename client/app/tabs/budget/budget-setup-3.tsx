import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import ProgressHeader from "../../../components/progress-header";
import { ContinueButton } from "../../../components/button";
import Card from "../../../components/card";

interface BillsProps {
  onNavigateToIncomeSplit?: () => void;
  onBack?: () => void;
  onExit?: () => void;
  progress?: number;
}

export default function Bills({
  onBack,
  onExit,
  progress = 60,
  onNavigateToIncomeSplit,
}: BillsProps) {
  return (
    <View style={styles.container}>
      <ProgressHeader onBack={onBack} onExit={onExit} progress={progress} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Bills & Utilities</Text>
        <Text style={styles.description}>
          Here are the expenses that we found are predictable in cost and
          reoccurring. Select expenses that you pay for yourself
        </Text>
        <Card
          isAdd={true}
          body={[
            {
              title: "Rent",
              desc: "October 30",
              value: "-700.12",
              iconName: "flash-outline",
            },
            {
              title: "Water",
              desc: "October 30",
              value: "-25.06",
              iconName: "water-outline",
            },
            {
              title: "Netflix",
              desc: "October 30",
              value: "-14.99",
              iconName: "videocam-outline",
            },
            {
              title: "Spotify",
              desc: "October 30",
              value: "-9.99",
              iconName: "musical-notes-outline",
            },
          ]}
        />

        <ContinueButton onPress={onNavigateToIncomeSplit} />
        <Text style={styles.addMissingBill}>Add Missing Bill</Text>
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
  addMissingBill: {
    fontSize: 15,
    ...Fonts.bold,
    color: Colors.text,
    textAlign: "center",
    padding: 10,
    flex: 1,
  }
});