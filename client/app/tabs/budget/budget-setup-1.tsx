import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Fonts } from "../../../styles/fonts";
import { Colors } from "../../../styles/colors";
import Card from "../../../components/card";
import { ContinueButton } from "../../../components/button";
import ProgressHeader from "../../../components/progress-header";

interface MonthlyEarningsProps {
  onNavigateToPickMonthly?: (total: number) => void;
  onBack?: () => void;
  onExit?: () => void;
  progress?: number;
}

export default function MonthlyEarnings({ 
  onBack, 
  onExit, 
  progress = 20, 
  onNavigateToPickMonthly 
}: MonthlyEarningsProps) {
  const [selectedApril, setSelectedApril] = useState<number[]>([]);
  const [selectedMarch, setSelectedMarch] = useState<number[]>([]);

  const AprilData = [
    { title: "University of Pittsburgh", desc: "April 30", value: "+$1500.81" },
    { title: "University of Pittsburgh", desc: "April 12", value: "+$1500.81" },
  ];

  const MarchData = [
    { title: "University of Pittsburgh", desc: "March 30", value: "+$1500.81" },
    { title: "University of Pittsburgh", desc: "March 12", value: "+$1286.81" },
  ];

  const toggleApril = (index: number) => {
    setSelectedApril((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleMarch = (index: number) => {
    setSelectedMarch((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleContinue = () => {
    let octTotal = 0;
    let septTotal = 0;
    
    selectedApril.forEach(index => {
       const val = parseFloat(AprilData[index].value.replace(/[^0-9.-]+/g,""));
       octTotal += val;
    });
    
    selectedMarch.forEach(index => {
       const val = parseFloat(MarchData[index].value.replace(/[^0-9.-]+/g,""));
       septTotal += val;
    });
    
    let monthsSelected = 0;
    if (selectedApril.length > 0) monthsSelected++;
    if (selectedMarch.length > 0) monthsSelected++;

    let averageIncome = 3000;
    if (monthsSelected > 0) {
      averageIncome = (octTotal + septTotal) / monthsSelected;
    }

    onNavigateToPickMonthly?.(averageIncome);
  };

  return (
    <View style={styles.container}>
      <ProgressHeader onBack={onBack} onExit={onExit} progress={progress} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Monthly Earnings</Text>
        <Text style={styles.description}>
          If you’ve had an seasonal or irregular income, click the earnings from
          each month and we’ll handle the division
        </Text>
        
        <Card
          header="April"
          isAdd={true}
          body={AprilData}
          selectedIndexes={selectedApril}
          onItemPress={toggleApril}
        />

        <Card
          header="March"
          isAdd={true}
          body={MarchData}
          selectedIndexes={selectedMarch}
          onItemPress={toggleMarch}
        />

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
  description: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
    marginBottom: 24, 
  },
});