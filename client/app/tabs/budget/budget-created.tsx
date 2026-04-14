import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import LargePieChart from "../../../components/large-pie-chart";
import List from "../../../components/list";
import { useAuth } from "@clerk/clerk-expo";
import Card from "../../../components/card";

interface BudgetCreatedProps {
  progress?: number;
  onBack?: () => void;
  onExit?: () => void;
  onNavigateToSettings?: () => void;
}

interface Transaction {
  _id: string;
  name: string;
  date: string;
  amount: number;
  type: string;
  category: string;
}

interface RepeatTransaction {
  name: string;
  count: number;
  totalAmount: number;
}

export default function BudgetCreated({progress = 100, onBack, onExit, onNavigateToSettings}: BudgetCreatedProps) {
  const [budgetData, setBudgetData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [topData, setTopData] = useState<Transaction[]>([]);
  const [repeatData, setRepeatData] = useState<RepeatTransaction[]>([]);

  const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";
  const { userId, getToken } = useAuth();

  useEffect(() => {
    fetchBudget();
    fetchTopPurchases();
    fetchRepeatPurchases();
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
      }
    } catch (error) {
      console.error(error);
    }
  }

  
    const fetchTopPurchases = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await fetch(`${API_URL}/api/transactions/top`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setTopData(data);
        }
      } catch (error) {
        console.error("Error fetching top purchases:", error);
      } 
    };

    const fetchRepeatPurchases = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await fetch(`${API_URL}/api/transactions/repeat`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setRepeatData(data);
        }
      } catch (error) {
        console.error("Error fetching top purchases:", error);
      } finally {
        setIsLoading(false);
      }
    };


  console.log(topData)
  
  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const totalBudget = budgetData?.totalIncome || 1200;
  const activeSplit = budgetData?.splitStrategy || { needs: 0.75, wants: 0.15, savings: 0.10 };
  
  const needs = totalBudget * activeSplit.needs;
  const wants = totalBudget * activeSplit.wants;
  const savings = totalBudget * activeSplit.savings;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRightSide} />
        <TouchableOpacity style={styles.headerDateContainer}>
          <Text style={styles.headerDate}>{budgetData?.month || "October 2025"}</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.headerRightSide, { alignItems: "flex-end" }]} onPress={onNavigateToSettings}>
          <Ionicons name="settings-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.chartWrapper}>
          <LargePieChart 
            total={totalBudget}
            needs={needs}
            wants={wants}
            savings={savings}
            showLegend={true}
          />
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <List title="Needs" items={budgetData?.needsItems || []} />

        <View style={styles.viewSwitch}>
          <View style={[styles.dotView, styles.dotViewActive]} />
          <View style={styles.dotView} />
          <View style={styles.dotView} />
        </View>

        <View style={styles.spendingHeader}>
           <Text style={styles.spendingTitle}>Spending</Text>
        </View>

        
        { repeatData.length == 0 ?(
         <>
            <Text style={[styles.description, { textAlign: 'center', marginTop: 40 }]}>
              No transactions yet.
            </Text>
          </>
        ) : (
            <Card
              header="Reoccuring Charges"
              body={(repeatData ?? [] ).map((item) => ({
                title: item.name,
                desc: `average $${item.totalAmount/ item.count} per exchange`,
                value: item.totalAmount.toFixed(),
              }))}
              isAdd={true}
            />
        )}

        { topData.length == 0 ?(
         <>
            <Text style={[styles.description, { textAlign: 'center', marginTop: 40 }]}>
              No transactions yet.
            </Text>
          </>
        ) : (
             <Card
              header="Top Largest Purchases"
              body={(topData).map((item) => ({
                title: item.name,
                desc: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                value: `+$${item.amount.toFixed(2)}`,
              }))}
              isAdd={true}
            />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.background,
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
  scrollViewContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  chartWrapper: {
    alignItems: 'center',
    position: 'relative',
    marginVertical: 20,
  },
  editButton: {
    position: 'absolute', 
    bottom: 40, 
    right: 0, 
    backgroundColor: Colors.background,
    width: 35, 
    height: 35, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: Colors.primary,
  },
  viewSwitch: {
    flexDirection: "row",
    marginBottom: 20,
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
  spendingHeader: {
    width: '100%',
    paddingHorizontal: 4,
    marginBottom: 10,
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  spendingTitle: {
    fontSize: 18,
    ...Fonts.regular,
    color: Colors.text,
  },
   description: {
    alignItems: "flex-start", 
    fontSize: 15,
    paddingRight: 20,
    ...Fonts.regular,
  },
});