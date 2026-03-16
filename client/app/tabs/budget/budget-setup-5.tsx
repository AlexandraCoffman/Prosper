import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import ProgressHeader from "../../../components/progress-header";
import LargePieChart from "../../../components/large-pie-chart";
import Card from "../../../components/card";
import { ContinueButton } from "../../../components/button";

interface BudgetPlanProps {
  onBack?: () => void;
  onExit?: () => void;
  onNavigateToBudgetCreated?: () => void;
  progress?: number;
}

export default function BudgetPlan({
  onBack,
  onExit,
  onNavigateToBudgetCreated,
  progress = 100,
}: BudgetPlanProps) {
  const totalBudget = 1200;
  const needs = 900;
  const wants = 180;
  const savings = 120;

  const budgetSummary = [
    {
      title: "Needs",
      desc: "",
      value: `$${needs}`,
      iconName: "checklist",
      iconType: "Octicons" as const,
    },
    {
      title: "Wants",
      desc: "",
      value: `$${wants}`,
      iconName: "bag-outline",
      iconType: "Ionicons" as const,
    },
    {
      title: "Savings",
      desc: "",
      value: `$${savings}`,
      iconName: "piggy-bank-outline",
      iconType: "MaterialCommunityIcons" as const,
    },
  ];

  return (
    <View style={styles.container}>
      <ProgressHeader onBack={onBack} onExit={onExit} progress={progress} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Final Budget Plan</Text>
        <Text style={styles.description}>
          Based on your selection in the previous page, here is your finalize budget plan that can be edited at any moment by <Text style={styles.linkText}>clicking edit icon</Text> below the pie graph
        </Text>

        <View style={styles.chartWrapper}>
          <LargePieChart 
            total={totalBudget}
            needs={needs}
            wants={wants}
            savings={savings}
            showLegend={true}
          />
          
          <View style={[styles.iconBadge, { top: '2%', right: '56%' }]}>
            <MaterialCommunityIcons name="piggy-bank-outline" size={20} color={Colors.text} />
          </View>
          <View style={[styles.iconBadge, { top: '70%', left: '67.5%' }]}>
            <Octicons name="checklist" size={20} color={Colors.text} />
          </View>
          <View style={[styles.iconBadge, { bottom: '70%', left: '16%' }]}>
            <Ionicons name="bag-outline" size={20} color={Colors.text} />
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <Text style={styles.header}>75/15/10</Text>
        <Card 
          body={budgetSummary}
        />
        <View style={styles.buttonContainer}>
          <ContinueButton onPress={onNavigateToBudgetCreated} />
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    paddingHorizontal: 24 
  },
  scrollContent: { 
    paddingBottom: 40 
  },
  title: { 
    fontSize: 25, 
    ...Fonts.regular, 
    color: Colors.text, 
    marginTop: 10, 
    marginBottom: 8 
  },
  description: { 
    fontSize: 14, 
    ...Fonts.regular, 
    color: Colors.text, 
    marginBottom: 20 
  },
  linkText: { 
    textDecorationLine: 'underline', 
    textDecorationColor: Colors.primary,
  },
  chartWrapper: { 
    alignItems: 'center', 
    position: 'relative', 
    marginVertical: 10 
  },
  iconBadge: { 
    position: 'absolute', 
    backgroundColor: Colors.background,
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 3
  },
  editButton: {
    position: 'absolute', 
    bottom: 40, 
    right: 45, 
    backgroundColor: Colors.background,
    width: 35, 
    height: 35, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: Colors.primary,
  },
  header: {
    fontSize: 20, 
    ...Fonts.bold, 
    color: Colors.text, 
    marginTop: 20, 
    marginBottom: 12,
    marginLeft: 4,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
  }
});