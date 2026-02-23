import { View, Text, StyleSheet, ScrollView } from "react-native";
import MeterCard from "../../../components/meter-card";
import LargePieChart from "../../../components/large-pie-chart";

const SavingsGoals = () => {
  return (
    <View style={styles.container}>
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
  scrollContent: {
    padding: 16,
    paddingTop: 48,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    marginBottom: 16,
  },
  pieChartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
});
export default SavingsGoals;
