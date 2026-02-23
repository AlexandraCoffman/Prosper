import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MeterCard from "../../../components/meter-card";
import LargePieChart from "../../../components/large-pie-chart";
import { Fonts } from "../../../styles/fonts";
import { Colors } from "../../../styles/colors";

interface SavingsGoalsProps {
  onBack?: () => void;
}

const SavingsGoals = ({ onBack }: SavingsGoalsProps) => {
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
        />
        {/* 
        This will eventually be an interable going over all the users' savings goals 
        Props will be populated from db
      */}
        <MeterCard
          title="Emergency Funds"
          accountName="Morgan Stanley HYSA"
          monthlyDeposit={50}
          amountSaved={500}
          amountRemaining={500}
          projectedCompletionDate="04/09/2026"
        />
        <MeterCard
          title="Vacation Funds"
          accountName="BoFa Savings Personal"
          monthlyDeposit={20}
          amountSaved={20}
          amountRemaining={500}
          projectedCompletionDate="02/20/2026"
        />
        <MeterCard
          title="Concert Funds"
          accountName="BoFa Savings Personal"
          monthlyDeposit={25}
          amountSaved={50}
          amountRemaining={100}
          projectedCompletionDate="12/30/2025"
        />
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
