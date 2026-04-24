import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import SpendGraph, { SpendingDataPoint } from "../../../components/spend-graph";
import { Ionicons } from "@expo/vector-icons";
import GoalCard from "../../../components/goal-card";
import AppModal from "../../../components/modal";
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
  onAddGoal?: (goal: SavingsGoal) => void;
}

const EMPTY_FORM = {
  title: "",
  accountName: "",
  monthlyDeposit: "",
  goalAmount: "",
  amountSaved: "",
};

export default function Dashboard({
  savingsGoals,
  firstName,
  spendingFromAccount,
  onNavigateToSavingsGoals,
  onAddGoal,
}: DashboardProps) {
  const { isSignedIn } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmitGoal = () => {
    if (!form.title.trim()) {
      setFormError("Goal name is required.");
      return;
    }
    const monthly = parseFloat(form.monthlyDeposit);
    const total = parseFloat(form.goalAmount);
    const saved = form.amountSaved === "" ? 0 : parseFloat(form.amountSaved);
    if (isNaN(monthly) || monthly <= 0) {
      setFormError("Enter a valid monthly deposit.");
      return;
    }
    if (isNaN(total) || total <= 0) {
      setFormError("Enter a valid goal amount.");
      return;
    }
    if (isNaN(saved) || saved < 0) {
      setFormError("Enter a valid amount saved.");
      return;
    }
    if (saved > total) {
      setFormError("Amount saved cannot exceed the goal amount.");
      return;
    }
    const remaining = total - saved;
    const monthsLeft = remaining > 0 ? Math.ceil(remaining / monthly) : 0;
    const completion = new Date();
    completion.setMonth(completion.getMonth() + monthsLeft);
    const pad = (n: number) => String(n).padStart(2, "0");
    const projectedDate = `${pad(completion.getMonth() + 1)}/${pad(completion.getDate())}/${completion.getFullYear()}`;

    const newGoal: SavingsGoal = {
      title: form.title.trim(),
      accountName: form.accountName.trim(),
      monthlyDeposit: monthly,
      amountSaved: saved,
      amountRemaining: remaining,
      projectedCompletionDate: projectedDate,
    };
    onAddGoal?.(newGoal);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalVisible(false);
  };

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
          <Pressable
            testID="dashboard-add-goal-button"
            style={{ marginLeft: 8 }}
            onPress={() => setModalVisible(true)}
          >
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

      <AppModal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          setForm(EMPTY_FORM);
          setFormError(null);
        }}
        header="New Savings Goal"
        subheader={
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <TextInput
              style={styles.input}
              placeholder="Goal name"
              placeholderTextColor={Colors.textSecondary}
              value={form.title}
              onChangeText={(v) => setForm((f) => ({ ...f, title: v }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Account name (optional)"
              placeholderTextColor={Colors.textSecondary}
              value={form.accountName}
              onChangeText={(v) => setForm((f) => ({ ...f, accountName: v }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Monthly deposit ($)"
              placeholderTextColor={Colors.textSecondary}
              keyboardType="decimal-pad"
              value={form.monthlyDeposit}
              onChangeText={(v) =>
                setForm((f) => ({ ...f, monthlyDeposit: v }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Total goal amount ($)"
              placeholderTextColor={Colors.textSecondary}
              keyboardType="decimal-pad"
              value={form.goalAmount}
              onChangeText={(v) => setForm((f) => ({ ...f, goalAmount: v }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount already saved ($ optional)"
              placeholderTextColor={Colors.textSecondary}
              keyboardType="decimal-pad"
              value={form.amountSaved}
              onChangeText={(v) => setForm((f) => ({ ...f, amountSaved: v }))}
            />
            {formError ? (
              <Text style={styles.errorText}>{formError}</Text>
            ) : null}
          </KeyboardAvoidingView>
        }
        buttons={[
          {
            label: "Cancel",
            ghost: true,
            onPress: () => {
              setModalVisible(false);
              setForm(EMPTY_FORM);
              setFormError(null);
            },
          },
          {
            label: isSignedIn ? "Save" : "Add",
            onPress: handleSubmitGoal,
          },
        ]}
      />
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
  input: {
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
    fontSize: 14,
    ...Fonts.regular,
    color: Colors.text,
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: "#c0392b",
    ...Fonts.regular,
  },
});
