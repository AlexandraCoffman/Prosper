import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";
import LargePieChart from "../../components/large-pie-chart";
import { CreateBudgetButton } from "../../components/button";
import Card from "../../components/card";
import { useAuth } from "@clerk/clerk-expo";

const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

interface BudgetData {
  month: string;
  totalIncome: number;
  totalBills: number;
  splitStrategy: { needs: number; wants: number; savings: number };
  needsItems: { title: string; subtitle: string; amount: string }[];
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

interface BudgetProps {
  onNavigateToSettings?: () => void;
}

export default function Budget({ onNavigateToSettings }: BudgetProps) {
  const { getToken, isSignedIn } = useAuth();
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [topData, setTopData] = useState<Transaction[]>([]);
  const [repeatData, setRepeatData] = useState<RepeatTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      setIsLoading(false);
      return;
    }
    const fetchBudget = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await fetch(`${API_BASE}/api/budget/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setBudgetData(data);
        }
      } catch (error) {
        console.error("Error fetching budget:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTopPurchases = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await fetch(`${API_BASE}/api/transaction/top`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setTopData(data);
        }
      } catch (error) {
        console.error("Error fetching top purchases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRepeatPurchases = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await fetch(`${API_BASE}/api/transaction/repeat`, {
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
    fetchBudget();
    fetchTopPurchases();
    fetchRepeatPurchases();
  }, [isSignedIn]);

  const totalBudget = budgetData?.totalIncome ?? 0;
  const split = budgetData?.splitStrategy ?? { needs: 1, wants: 0, savings: 0 };
  const needs = totalBudget * split.needs;
  const wants = totalBudget * split.wants;
  const savings = totalBudget * split.savings;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRightSide} />

        <TouchableOpacity style={styles.headerDateContainer}>
          <Text style={styles.headerDate}>{budgetData?.month ?? "Budget"}</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.headerRightSide, { alignItems: "flex-end" }]}
          onPress={onNavigateToSettings}
        >
          <Ionicons name="settings-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
        ) : !budgetData ? (
          <>
            <LargePieChart showLegend={true} />
            <CreateBudgetButton />
          </>
        ) : (
          <>
            <LargePieChart
              total={totalBudget}
              needs={needs}
              wants={wants}
              savings={savings}
              showLegend={true}
            />

            <Card
              header="Needs"
              body={(budgetData.needsItems ?? []).map((item) => ({
                title: item.title,
                desc: item.subtitle,
                value: item.amount,
              }))}
              isAdd={true}
            />          

            <View style={styles.viewSwitch}>
              <View style={[styles.dotView, styles.dotViewActive]} />
              <View style={styles.dotView} />
              <View style={styles.dotView} />
            </View>
          </>
        )}

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
  description: {
    alignItems: "flex-start", 
    fontSize: 15,
    paddingRight: 20,
    ...Fonts.regular,
  },
});
