import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Alert } from "react-native";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import ProgressHeader from "../../../components/progress-header";
import { ContinueButton } from "../../../components/button";
import CardMonthly from "../../../components/card-monthly";

interface PickMonthlyProps {
  onNavigateToBills?: (amount?: number) => void;
  onBack?: () => void;
  onExit?: () => void;
  progress?: number;
  incomeTotal?: number;
  hasRecentIncome?: boolean; 
  accountBalance?: number;   
}

export default function PickMonthly({
  onBack,
  onExit,
  progress = 40,
  onNavigateToBills,
  incomeTotal = 1500,
  hasRecentIncome = true,
  accountBalance = 3500, 
}: PickMonthlyProps) {
  
  const [selectedOption, setSelectedOption] = useState<string | null>(
    hasRecentIncome ? "average" : "irregular"
  );
  const [customAmount, setCustomAmount] = useState("");

  const monthlyBudgetOptions = [
    {
      id: "irregular",
      title: "Irregular",
      amount: `$${accountBalance.toFixed(2)}`,
      desc: "Using the total amount remaining in your account since your last recorded income.",
      recommended: !hasRecentIncome,
    },
    {
      id: "average",
      title: "Average",
      amount: `$${incomeTotal.toFixed(2)}`,
      desc: "Based on your average monthly earnings from the last three months.",
      recommended: hasRecentIncome,
    },
    {
      id: "custom",
      title: "Custom",
      amount: "$0",
      desc: "Manually input your monthly earnings",
      recommended: false,
    },
  ];

  const handleContinue = () => {
    let finalAmount = 0;

    if (selectedOption === "custom") {
      finalAmount = parseFloat(customAmount);
      if (isNaN(finalAmount) || finalAmount <= 0) {
        Alert.alert("Invalid Amount", "Please enter a valid monthly earning amount.");
        return;
      }
    } else if (selectedOption === "average") {
      finalAmount = incomeTotal;
    } else if (selectedOption === "irregular") {
      finalAmount = accountBalance;
    }
    onNavigateToBills?.(finalAmount);
  };

  return (
    <View style={styles.container}>
      <ProgressHeader onBack={onBack} onExit={onExit} progress={progress} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Estimate Monthly Earnings</Text>
        <Text style={styles.pageDescription}>
          The selected amount will be the total that you have to set your budget
        </Text>

        <View style={styles.cardsContainer}>
          {monthlyBudgetOptions.map((option) => (
            <View key={option.id}>
              <CardMonthly
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
              {selectedOption === "custom" && option.id === "custom" && (
                <View style={styles.customInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    value={customAmount}
                    onChangeText={setCustomAmount}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor="#A0A0A0"
                    style={styles.textInput}
                  />
                </View>
              )}
            </View>
          ))}
        </View>

        <ContinueButton onPress={handleContinue} />
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
  customInputContainer: {
    flexDirection: "row", 
    justifyContent: "center", 
    marginBottom: 15, 
    alignItems: "center"
  },
  currencySymbol: {
    fontSize: 20, 
    ...Fonts.bold,
    color: Colors.text,
    marginRight: 4,
  },
  textInput: {
    fontSize: 20, 
    ...Fonts.bold,
    minWidth: 80, 
    textAlign: "center", 
    color: Colors.text,
    borderBottomWidth: 1,
    borderColor: Colors.accent,
    paddingVertical: 4,
  }
});