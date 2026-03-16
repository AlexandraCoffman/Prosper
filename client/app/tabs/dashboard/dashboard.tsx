import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import SpendGraph, { SpendingDataPoint } from "../../../components/spend-graph";
import { Ionicons } from "@expo/vector-icons";
import GoalCard from "../../../components/goal-card";

// Mock spending data for spend graph
// TODO: Reformat to follow DB schema
const MOCK_SPENDING: SpendingDataPoint[] = [
  { day: 1, amount: 85 },
  { day: 8, amount: 210 },
  { day: 15, amount: 145 },
  { day: 22, amount: 310 },
  { day: 29, amount: 275 },
];

interface DashboardProps {
  onNavigateToSavingsGoals?: () => void;
}

export default function Dashboard({
  onNavigateToSavingsGoals,
}: DashboardProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Hello _____</Text>
          <Text style={styles.description}>
            You're hitting your goals with budgeting this month!
          </Text>
        </View>
      </View>
      <View style={styles.hero}>
        <Text style={styles.sectionTitle}>INSIGHTS & TRANSACTIONS</Text>
        <SpendGraph totalSpending={789} data={MOCK_SPENDING} />
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
        <GoalCard
          label="Emergency Funds"
          value={1000}
          onPress={() => onNavigateToSavingsGoals?.()}
        />
        <GoalCard
          label="Vacation Funds"
          value={500}
          onPress={() => onNavigateToSavingsGoals?.()}
        />
        <GoalCard
          label="Concert Funds"
          value={50}
          onPress={() => onNavigateToSavingsGoals?.()}
        />
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
