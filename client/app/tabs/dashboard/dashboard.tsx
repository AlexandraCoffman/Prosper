import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import ProsperButton from "../../../components/button";
import Slider from "../../../components/slider";
import CalendarPicker from "../../../components/calendar-picker";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";

interface DashboardProps {
  onNavigateToSavingsGoals?: () => void;
}

export default function Dashboard({ onNavigateToSavingsGoals }: DashboardProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ProsperButton />
      {onNavigateToSavingsGoals && (
        <Pressable style={styles.navButton} onPress={onNavigateToSavingsGoals}>
          <Text style={styles.navButtonText}>Savings Goals</Text>
        </Pressable>
      )}
      <Slider />
      <CalendarPicker />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});
