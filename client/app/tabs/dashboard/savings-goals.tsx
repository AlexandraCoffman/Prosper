import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MeterCard from "../../../components/meter-card";
import LargePieChart from "../../../components/large-pie-chart";
import { Fonts } from "../../../styles/fonts";
import { Colors } from "../../../styles/colors";
import { SavingsGoal } from "../../_layout";

interface SavingsGoalsProps {
  onBack?: () => void;
  savingsGoals?: SavingsGoal[];
  onRenameGoal?: (oldTitle: string, newTitle: string) => void;
  onDeleteGoal?: (title: string) => void;
}

const SavingsGoals = ({ onBack, savingsGoals = [], onRenameGoal, onDeleteGoal }: SavingsGoalsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {onBack ? (
            <Pressable onPress={onBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </Pressable>
          ) : null}
        </View>
        <TouchableOpacity style={[styles.headerRight, { alignItems: "flex-end" }]}>
          <Ionicons name="settings-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Savings Goals</Text>
        <Text style={styles.description}>
          Great job, ____! You're getting one step closer to achieving your
          savings goals every month!
        </Text>
        <LargePieChart
          showLegend={true}
          showCenterText={false}
          centerImage={require("../../../assets/plant-full.png")}
          savingsGoals={savingsGoals}
        />
        {savingsGoals.map((goal, index) => (
          <MeterCard
            key={index}
            title={goal.title}
            accountName={goal.accountName}
            monthlyDeposit={goal.monthlyDeposit}
            amountSaved={goal.amountSaved}
            amountRemaining={goal.amountRemaining}
            projectedCompletionDate={goal.projectedCompletionDate}
            onRename={(newTitle) => onRenameGoal?.(goal.title, newTitle)}
            onDelete={() => onDeleteGoal?.(goal.title)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "500",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    ...Fonts.bold,
  },
  description: {
    fontSize: 15,
    marginBottom: 16,
    ...Fonts.regular,
  },
  pieChartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
});
export default SavingsGoals;
