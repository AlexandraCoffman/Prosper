import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import ProgressHeader from "../../../components/progress-header";
import { ContinueButton } from "../../../components/button";
import LargePieChart from "../../../components/large-pie-chart";
import CardMonthly from "../../../components/card-monthly";

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
  const [selectedPlan, setSelectedPlan] = useState("plan1");
  const totalBudget = 1200;

  const plans = [
    {
      id: "plan1",
      title: "75/15/10",
      recommended: true,
      desc: "Based off the cost of living from your expenses such as rent, utilities, and income from summer months divided up until next income spike",
      needs: 0.75,
      wants: 0.15,
      savings: 0.10,
    },
    {
      id: "plan2",
      title: "50/30/20",
      recommended: false,
      desc: "Standard way to budget with a consistent, full-time paying job which is not recommended for your current livings expenses and income",
      needs: 0.50,
      wants: 0.30,
      savings: 0.20,
    },
    {
      id: "plan3",
      title: "65/20/15",
      desc: "Possible with your current need-related expenses with added spending on wants and reaching your savings goal",
      needs: 0.65,
      wants: 0.20,
      savings: 0.15,
    },
    {
      id: "custom",
      title: "XX/XX/XX",
      desc: "Customize your own budgeting template, based on your income split with your expenses in mind and saving goals",
      needs: 0.33,
      wants: 0.33,
      savings: 0.34,
    },
  ];

  const activePlan = plans.find((p) => p.id === selectedPlan) || plans[0];

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

        {/* Dynamic Pie Chart */}
        <LargePieChart 
          total={totalBudget}
          needs={totalBudget * activePlan.needs}
          wants={totalBudget * activePlan.wants}
          savings={totalBudget * activePlan.savings}
          showLegend={true}
        />

        <Text style={styles.sectionTitle}>Needs/Wants/ Savings</Text>

        {plans.map((plan) => (
          <CardMonthly
            key={plan.id}
            id={plan.id}
            amount={plan.title}
            desc={plan.desc}
            recommended={plan.recommended}
            isSelected={selectedPlan === plan.id}
            onSelect={() => setSelectedPlan(plan.id)}
          />
        ))}

        <View style={styles.buttonContainer}>
          <ContinueButton onPress={onNavigateToBudgetPlan} />
        </View>
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
  sectionTitle: {
    fontSize: 18,
    ...Fonts.bold,
    color: Colors.text,
    marginTop: 30,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
  }
});