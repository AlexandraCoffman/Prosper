import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Alert } from "react-native";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import ProgressHeader from "../../../components/progress-header";
import { ContinueButton } from "../../../components/button";
import LargePieChart from "../../../components/large-pie-chart";
import CardMonthly from "../../../components/card-monthly";

interface IncomeSplitProps {
  onNavigateToBudgetPlan?: (split: {needs: number, wants: number, savings: number}) => void;
  onBack?: () => void;
  onExit?: () => void;
  progress?: number;
  totalIncome?: number;
  totalBills?: number;
}

export default function IncomeSplit({
  onBack,
  onExit,
  progress = 80,
  onNavigateToBudgetPlan,
  totalIncome = 1200,
  totalBills = 0,
}: IncomeSplitProps) {
  const [selectedPlan, setSelectedPlan] = useState("smart");
  const [customSplit, setCustomSplit] = useState({ needs: "", wants: "", savings: "" });
  const rawNeedsPct = (totalBills / totalIncome) * 100;
  let smartNeedsPct = Math.ceil((rawNeedsPct + 2) / 5) * 5;
  if (smartNeedsPct > 100) smartNeedsPct = 100;

  const smartRemaining = 100 - smartNeedsPct;
  const smartWantsPct = Math.round((smartRemaining * 0.6) / 5) * 5;
  const smartSavingsPct = smartRemaining - smartWantsPct;

  const plans = [
    {
      id: "smart",
      title: `${smartNeedsPct}/${smartWantsPct}/${smartSavingsPct}`,
      recommended: smartNeedsPct < 50,
      desc: "Dynamically adjusted based on your actual expenses with room for spending and savings goals.",
      needs: smartNeedsPct / 100, wants: smartWantsPct / 100, savings: smartSavingsPct / 100,
    },
    {
      id: "standard",
      title: "50/30/20",
      recommended: smartNeedsPct >= 50, 
      desc: "Standard way to budget with a consistent, full-time paying job.",
      needs: 0.50, wants: 0.30, savings: 0.20,
    },
    {
      id: "custom",
      title: "XX/XX/XX",
      desc: "Customize your own budgeting template, based on your income split with your expenses in mind and saving goals",
      needs: 0, wants: 0, savings: 0,
    },
  ];

  const activePlan = plans.find((p) => p.id === selectedPlan) || plans[0];
  let activeNeeds = activePlan.needs;
  let activeWants = activePlan.wants;
  let activeSavings = activePlan.savings;

  if (selectedPlan === "custom") {
    const n = parseInt(customSplit.needs) || 0;
    const w = parseInt(customSplit.wants) || 0;
    const s = parseInt(customSplit.savings) || 0;

    if (n + w + s === 100) {
      activeNeeds = n / 100;
      activeWants = w / 100;
      activeSavings = s / 100;
    }
  }

  const needsTotal = totalIncome * activeNeeds;
  const wantsTotal = totalIncome * activeWants;
  const savingsTotal = totalIncome * activeSavings;

  const handleContinue = () => {
    if (selectedPlan === "custom") {
      const totalPct = (parseInt(customSplit.needs) || 0) + (parseInt(customSplit.wants) || 0) + (parseInt(customSplit.savings) || 0);
      if (totalPct !== 100) {
        Alert.alert("Invalid Split", "Your custom budget split must add up to exactly 100.");
        return;
      }
    }

    onNavigateToBudgetPlan?.({
      needs: activeNeeds,
      wants: activeWants,
      savings: activeSavings
    });
  };

  return (
    <View style={styles.container}>
      <ProgressHeader onBack={onBack} onExit={onExit} progress={progress} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Income Split</Text>
        <Text style={styles.description}>
          We recommend this income split based on your previous income, current
          expenses, and financial goals
        </Text>

        <LargePieChart 
          total={totalIncome}
          needs={needsTotal}
          wants={wantsTotal}
          savings={savingsTotal}
          showLegend={true}
        />

        <Text style={styles.sectionTitle}>Needs/Wants/Savings</Text>

        {plans.map((plan) => (
          <View key={plan.id}>
            <CardMonthly
              id={plan.id}
              amount={plan.title}
              desc={plan.desc}
              recommended={plan.recommended}
              isSelected={selectedPlan === plan.id}
              onSelect={() => setSelectedPlan(plan.id)}
            />
            
            {/* Minimalist input row that only shows when 'custom' is selected */}
            {selectedPlan === "custom" && plan.id === "custom" && (
              <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 15, alignItems: "center" }}>
                <TextInput
                  value={customSplit.needs}
                  onChangeText={(val) => setCustomSplit({ ...customSplit, needs: val })}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="XX"
                  style={{ fontSize: 18, minWidth: 30, textAlign: "center", color: Colors.text }}
                />
                <Text style={{ fontSize: 18, color: Colors.text }}>/</Text>
                <TextInput
                  value={customSplit.wants}
                  onChangeText={(val) => setCustomSplit({ ...customSplit, wants: val })}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="XX"
                  style={{ fontSize: 18, minWidth: 30, textAlign: "center", color: Colors.text }}
                />
                <Text style={{ fontSize: 18, color: Colors.text }}>/</Text>
                <TextInput
                  value={customSplit.savings}
                  onChangeText={(val) => setCustomSplit({ ...customSplit, savings: val })}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="XX"
                  style={{ fontSize: 18, minWidth: 30, textAlign: "center", color: Colors.text }}
                />
              </View>
            )}
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <ContinueButton onPress={handleContinue} />
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