import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
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
  budgetData?: { totalIncome: number, totalBills: number, split: any };
}

export default function BudgetPlan({
  onBack,
  onExit,
  onNavigateToBudgetCreated,
  progress = 100,
  budgetData
}: BudgetPlanProps) {
  const [isSaving, setIsSaving] = useState(false);

  const totalBudget = budgetData?.totalIncome || 1200;
  const totalBills = budgetData?.totalBills || 0;
  const activeSplit = budgetData?.split || { needs: 0.50, wants: 0.30, savings: 0.20 };
  
  const needsTotal = totalBills > totalBudget ? totalBudget : totalBills;
  const remainingIncome = totalBudget - totalBills > 0 ? totalBudget - totalBills : 0;
  
  const wantsRatio = activeSplit.wants / (activeSplit.wants + activeSplit.savings);
  const savingsRatio = activeSplit.savings / (activeSplit.wants + activeSplit.savings);

  const wantsTotal = remainingIncome * wantsRatio;
  const savingsTotal = remainingIncome * savingsRatio;

  const handleSaveBudget = async () => {
    setIsSaving(true);
    const API_URL = "http://localhost:3000/api";
    const DUMMY_USER_ID = "user_1";

    const dataToSave = {
      userId: DUMMY_USER_ID,
      month: "October 2025",
      totalIncome: totalBudget,
      totalBills: totalBills,
      splitStrategy: activeSplit,
      needsItems: [
        { title: "Needs", subtitle: "Fixed Bills", amount: `$${needsTotal.toFixed(0)}`,iconName: "home-outline" },
        { title: "Wants", subtitle: "Spending Money", amount: `$${wantsTotal.toFixed(0)}`, iconName: "bag-outline" },
        { title: "Savings", subtitle: "Future Goals", amount: `$${savingsTotal.toFixed(0)}`, iconName: "piggy-bank-outline" },
      ]
    };

    try {
      const response = await fetch(`${API_URL}/budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        onNavigateToBudgetCreated?.(); 
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const budgetSummary = [
    { title: "Needs", desc: "", value: `$${needsTotal.toFixed(0)}`, iconName: "checklist", iconType: "Octicons" as const },
    { title: "Wants", desc: "", value: `$${wantsTotal.toFixed(0)}`, iconName: "bag-outline", iconType: "Ionicons" as const },
    { title: "Savings", desc: "", value: `$${savingsTotal.toFixed(0)}`, iconName: "piggy-bank-outline", iconType: "MaterialCommunityIcons" as const },
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
            needs={needsTotal}
            wants={wantsTotal}
            savings={savingsTotal}
            showLegend={true}
          />
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <Text style={styles.header}>
          {`${activeSplit.needs * 100}/${activeSplit.wants * 100}/${activeSplit.savings * 100} Plan`}
        </Text>
        <Card body={budgetSummary} />
        
        <View style={styles.buttonContainer}>
          {isSaving ? (
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
          ) : (
            <ContinueButton onPress={handleSaveBudget} />
          )}
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
    bottom: 50, 
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