import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import SpendGraph, { SpendingDataPoint } from "../../../components/spend-graph";
import { Ionicons } from "@expo/vector-icons";
import GoalCard from "../../../components/goal-card";
import type { SavingsGoal } from "../../_layout";

// Mock spending when signed out in dev preview
const MOCK_SPENDING: SpendingDataPoint[] = [
  { day: 1, amount: 85 },
  { day: 8, amount: 210 },
  { day: 15, amount: 145 },
  { day: 22, amount: 310 },
  { day: 29, amount: 275 },
];

// Flatline when signed in but no bank data yet
const ZERO_SPENDING_SERIES: SpendingDataPoint[] = [
  { day: 1, amount: 0 },
  { day: 29, amount: 0 },
];

interface DashboardProps {
  savingsGoals: SavingsGoal[];
  firstName?: string | null;
  // TODO: implement this when we connect up a bank API.
  spendingFromAccount?: { totalSpending: number; data: SpendingDataPoint[] };
  onNavigateToSavingsGoals?: () => void;
}

export default function Dashboard({
  savingsGoals,
  firstName,
  spendingFromAccount,
  onNavigateToSavingsGoals,
}: DashboardProps) {
  const { isSignedIn } = useAuth();

  let totalSpending: number;
  let spendingData: SpendingDataPoint[];

  if (
    spendingFromAccount &&
    spendingFromAccount.data.length >= 2 &&
    Number.isFinite(spendingFromAccount.totalSpending)
  ) {
    totalSpending = spendingFromAccount.totalSpending;
    spendingData = spendingFromAccount.data;
  } else if (isSignedIn) {
    totalSpending = 0;
    spendingData = ZERO_SPENDING_SERIES;
  } else {
    totalSpending = MOCK_SPENDING.reduce((s, p) => s + p.amount, 0);
    spendingData = MOCK_SPENDING;
  }
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Hello {firstName ?? "there"}!</Text>
          <Text style={styles.description}>
            You're hitting your goals with budgeting this month!
          </Text>
        </View>
      </View>
      <View style={styles.hero}>
        <Text style={styles.sectionTitle}>INSIGHTS & TRANSACTIONS</Text>
        <SpendGraph totalSpending={totalSpending} data={spendingData} />
      </View>
      <View style={styles.hero}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.sectionTitle}>SAVING GOALS</Text>
          <Pressable style={{ marginLeft: 8 }}>
            <Ionicons name="add-circle-outline" size={16} color={Colors.text} />
          </Pressable>
        </View>
        {savingsGoals.map((goal) => (
          <GoalCard
            key={goal.title}
            label={goal.title}
            value={goal.amountSaved}
            onPress={() => onNavigateToSavingsGoals?.()}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 24,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  navButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  navButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    paddingTop: 48,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    ...Fonts.bold,
  },
  description: {
    fontSize: 15,
    ...Fonts.regular,
  },
  hero: {
    width: "100%",
    paddingHorizontal: 24,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  sectionTitle: {
    fontSize: 12,
    ...Fonts.regular,
    alignSelf: "flex-start",
  },
});
