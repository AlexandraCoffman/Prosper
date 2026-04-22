import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import LargePieChart from "../../../components/large-pie-chart";
import { CreateBudgetButton } from "../../../components/button";
import Card from "../../../components/card";
import List from "../../../components/list";
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
  _id: string;
  count: number;
  totalAmount: number;
}

interface BudgetProps {
  onNavigateToSettings?: () => void;
  onEditBudget?: () => void;
  onNavigateToEstimateMonthlyEarnings?: () => void;
}

export default function Budget({ onNavigateToSettings, onEditBudget, onNavigateToEstimateMonthlyEarnings }: BudgetProps) {
  const { getToken, isSignedIn } = useAuth();
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [topData, setTopData] = useState<Transaction[]>([]);
  const [repeatData, setRepeatData] = useState<RepeatTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth - 40;

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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
      }
    };

    fetchBudget();
    fetchTopPurchases();
    fetchRepeatPurchases();
  }, [isSignedIn]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / cardWidth);
    setActiveIndex(index);
  };

  const totalBudget = budgetData?.totalIncome ?? 0;
  const split = budgetData?.splitStrategy ?? { needs: 0.5, wants: 0.3, savings: 0.2 };
  const needs = totalBudget * split.needs;
  const wants = totalBudget * split.wants;
  const savings = totalBudget * split.savings;

  const getPercentOfPaycheck = (categoryAmount: number) => {
    if (!totalBudget || totalBudget === 0) return "0% of paycheck";
    return `${((categoryAmount / totalBudget) * 100).toFixed(0)}% of paycheck`;
  };

  const slides = [
    {
      title: "Needs",
      data: [
        { title: "Rent", subtitle: getPercentOfPaycheck(needs * 0.6), amount: `$${(needs * 0.6).toFixed(0)}`, iconName: "home-outline", iconType: "Ionicons" },
        { title: "Groceries", subtitle: getPercentOfPaycheck(needs * 0.3), amount: `$${(needs * 0.3).toFixed(0)}`, iconName: "basket-outline", iconType: "Ionicons" },
        { title: "Utilities", subtitle: getPercentOfPaycheck(needs * 0.1), amount: `$${(needs * 0.1).toFixed(0)}`, iconName: "construct-outline", iconType: "Ionicons" },
      ]
    },
    {
      title: "Wants",
      data: [
        { title: "Shopping", subtitle: getPercentOfPaycheck(wants * 0.5), amount: `$${(wants * 0.5).toFixed(0)}`, iconName: "bag-outline", iconType: "Ionicons" },
        { title: "Entertainment", subtitle: getPercentOfPaycheck(wants * 0.3), amount: `$${(wants * 0.3).toFixed(0)}`, iconName: "film-outline", iconType: "Ionicons" },
        { title: "Travel", subtitle: getPercentOfPaycheck(wants * 0.2), amount: `$${(wants * 0.2).toFixed(0)}`, iconName: "airplane-outline", iconType: "Ionicons" },
      ]
    },
    {
      title: "Savings",
      data: [
        { title: "Savings Account", subtitle: getPercentOfPaycheck(savings * 0.5), amount: `$${(savings * 0.5).toFixed(0)}`, iconName: "bank", iconType: "MaterialCommunityIcons" },
        { title: "HYSA Emergency Fund", subtitle: getPercentOfPaycheck(savings * 0.3), amount: `$${(savings * 0.3).toFixed(0)}`, iconName: "cash", iconType: "MaterialCommunityIcons" },
        { title: "Investment Account", subtitle: getPercentOfPaycheck(savings * 0.2), amount: `$${(savings * 0.2).toFixed(0)}`, iconName: "trending-up", iconType: "Ionicons" },
      ]
    }
  ];

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRightSide} />

        <TouchableOpacity style={styles.headerDateContainer}>
          <Text style={styles.headerDate}>{budgetData?.month ?? "Budget"}</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          testID="settings-button"
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
        {!budgetData ? (
          <>
            <View style={styles.chartWrapper}>
              <LargePieChart total={0} needs={0} wants={0} savings={0} showLegend={true} />
            </View>
            <CreateBudgetButton onPress={onNavigateToEstimateMonthlyEarnings} />
          </>
        ) : (
          <>
            <View style={styles.chartWrapper}>
              <LargePieChart
                total={totalBudget}
                needs={needs}
                wants={wants}
                savings={savings}
                showLegend={true}
              />
              <TouchableOpacity style={styles.editButton} onPress={onEditBudget}>
                <Ionicons name="create-outline" size={20} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <View style={{ width: cardWidth }}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ alignItems: 'flex-start' }}
              >
                {slides.map((slide, index) => (
                  <View key={index} style={{ width: cardWidth }}>
                    <List title={slide.title} items={slide.data as any} />
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.viewSwitch}>
              {slides.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dotView,
                    activeIndex === i && styles.dotViewActive
                  ]}
                />
              ))}
            </View>
          </>
        )}

        <View style={styles.spendingHeader}>
          <Text style={styles.spendingTitle}>Spending</Text>
        </View>

        {repeatData.length === 0 ? (
          <Text style={[styles.description, { textAlign: 'center', marginTop: 10, marginBottom: 40 }]}>
            No transactions yet.
          </Text>
        ) : (
          <Card
            header="Reoccuring Charges"
            body={repeatData.map((item) => ({
              title: item._id,
              desc: `Average $${(item.totalAmount / item.count).toFixed(2)} per exchange`,
              value: `$${item.totalAmount.toFixed(2)}`,
            }))}
            isAdd={false}
          />
        )}

        {topData.length === 0 ? (
          <Text style={[styles.description, { textAlign: 'center', marginTop: 10, marginBottom: 40 }]}>
            No transactions yet.
          </Text>
        ) : (
          <Card
            header="Top Largest Purchases"
            body={topData.map((item) => ({
              title: item.name,
              desc: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              value: `$${item.amount.toFixed(2)}`,
            }))}
            isAdd={false}
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
    paddingBottom: 40,
  },
  chartWrapper: {
    alignItems: 'center',
    position: 'relative',
    marginVertical: 20,
    width: "100%",
  },
  editButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
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
    marginTop: 10,
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
    color: Colors.textSecondary,
  },
});