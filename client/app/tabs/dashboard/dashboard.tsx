import { StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity } from "react-native";
import ProsperButton from "../../../components/button";
import Slider from "../../../components/slider";
import CalendarPicker from "../../../components/calendar-picker";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import SpendGraph from "../../../components/spend-graph";
import { Ionicons } from "@expo/vector-icons";

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
        <SpendGraph />
      </View>
      <View style={styles.hero}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={styles.sectionTitle}>SAVING GOALS</Text>
          <Pressable style={{ marginLeft: 8 }}>
            <Ionicons name="add-circle-outline" size={16} color={Colors.text} />
          </Pressable>
        </View>
        <ProsperButton onPress={() => onNavigateToSavingsGoals?.()} />
        <ProsperButton onPress={() => onNavigateToSavingsGoals?.()} />
        <ProsperButton onPress={() => onNavigateToSavingsGoals?.()} />
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
    paddingBottom: 16,
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
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: 12,
    ...Fonts.regular,
    alignSelf: "flex-start",
  },
});
