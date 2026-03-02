import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import ProgressHeader from "../../../components/progress-header";
import { ContinueButton } from "../../../components/button";
import CardMonthly from "../../../components/card-monthly";

interface PickMonthlyProps {
  onNavigateToBills?: () => void;
  onBack?: () => void;
  onExit?: () => void;
  progress?: number;
}

const monthlyBudgetOptions = [
  {
    id: "irregular",
    title: "Irregular",
    amount: "$1200",
    desc: "Using the monthly earnings you selected, including your previous higher income and your current amount",
    recommended: true,
  },
  {
    id: "average",
    title: "Average",
    amount: "$450",
    desc: "Based on your average monthly earnings from the last three months",
    recommended: false,
  },
  {
    id: "custom",
    title: "Custom",
    amount: "$0",
    desc: "Manually input your monthly earnings",
    recommended: false,
  },
];

export default function PickMonthly({
  onBack,
  onExit,
  progress = 40,
  onNavigateToBills,
}: PickMonthlyProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>("irregular");

  return (
    <View style={styles.container}>
      <ProgressHeader onBack={onBack} onExit={onExit} progress={progress} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Estimate Monthly Earnings</Text>
        <Text style={styles.pageDescription}>
          The selected amount will be the total that you have to set your budget
        </Text>

        <View style={styles.cardsContainer}>
          {monthlyBudgetOptions.map((option) => (
            <CardMonthly
              key={option.id}
              id={option.id}
              title={option.title}
              amount={option.amount}
              desc={option.desc}
              recommended={option.recommended}
              isSelected={selectedOption === option.id}
              onSelect={() =>
                setSelectedOption(selectedOption === option.id ? null : option.id)
              }
            />
          ))}
        </View>

        <ContinueButton onPress={onNavigateToBills} />
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
  pageDescription: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
    marginBottom: 24,
  },
  cardsContainer: {
    marginBottom: 10,
  },
});