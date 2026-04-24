import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import LargePieChart from "../../../components/large-pie-chart";
import List from "../../../components/list";
import { CreateBudgetButton } from "../../../components/button";
import { useAuth } from "@clerk/clerk-expo";

interface MonthlyEarningsProps {
  onNavigateToEstimateMonthlyEarnings?: () => void;
  onNavigateToSettings?: () => void;
}

export default function Budget({ onNavigateToEstimateMonthlyEarnings, onNavigateToSettings }: MonthlyEarningsProps) {
  const [budgetData, setBudgetData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, getToken } = useAuth();
  const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      
      const response = await fetch(`${API_URL}/api/budget/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBudgetData(data);
      } else {
        setBudgetData(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!budgetData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRightSide} />
          <TouchableOpacity style={styles.headerDateContainer}>
            <Text style={styles.headerDate}>April 2026</Text>
            <Ionicons name="chevron-down" size={18} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerRightSide, { alignItems: "flex-end" }]} onPress={onNavigateToSettings}>
            <Ionicons name="settings-outline" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <View style={styles.chartContainer}>
            <LargePieChart total={0} needs={0} wants={0} savings={0} showLegend={true} />
          </View>

          <List
            title="Needs"
            items={[
              { title: "XXXXXX", subtitle: "XXX% of paycheck", amount: "$XXX" },
              { title: "XXXXX", subtitle: "XX% of paycheck", amount: "$XX" },
              { title: "XXXX", subtitle: "X% of paycheck", amount: "$X" },
            ]}
          />

          <View style={styles.viewSwitch}>
            <View style={[styles.dotView, styles.dotViewActive]} />
            <View style={styles.dotView} />
            <View style={styles.dotView} />
          </View>

          <CreateBudgetButton onPress={() => onNavigateToEstimateMonthlyEarnings?.()} />
        </ScrollView>
      </View>
    );
  }

  const totalBudget = budgetData.totalIncome;
  const totalBills = budgetData.totalBills;
  const activeSplit = budgetData.splitStrategy;

  const needsTotal = totalBills > totalBudget ? totalBudget : totalBills;
  const remainingIncome = totalBudget - totalBills > 0 ? totalBudget - totalBills : 0;
  
  const wantsRatio = activeSplit.wants / (activeSplit.wants + activeSplit.savings);
  const savingsRatio = activeSplit.savings / (activeSplit.wants + activeSplit.savings);

  const wantsTotal = remainingIncome * wantsRatio;
  const savingsTotal = remainingIncome * savingsRatio;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRightSide} />
        <TouchableOpacity style={styles.headerDateContainer}>
          <Text style={styles.headerDate}>{budgetData.month}</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerRightSide, { alignItems: "flex-end" }]} onPress={onNavigateToSettings}>
          <Ionicons name="settings-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.chartContainer}>
          <LargePieChart 
            total={totalBudget} 
            needs={needsTotal} 
            wants={wantsTotal} 
            savings={savingsTotal} 
            showLegend={true} 
          />
        </View>

        <List title="Needs" items={budgetData.needsItems || []} />

        <View style={styles.viewSwitch}>
          <View style={[styles.dotView, styles.dotViewActive]} />
          <View style={styles.dotView} />
          <View style={styles.dotView} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 10,
  },
  headerRightSide: {
    flex: 1,
  },
  headerDateContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerDate: {
    fontSize: 18,
    ...Fonts.regular,
    color: Colors.text,
    marginRight: 4,
  },
  chartContainer: {
    marginBottom: 20,
    marginVertical: 15,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  viewSwitch: {
    flexDirection: "row",
    marginBottom: 15,
  },
  dotView: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: Colors.accent,
    marginHorizontal: 4,
  },
  dotViewActive: {
    backgroundColor: Colors.primary,
  },
});
