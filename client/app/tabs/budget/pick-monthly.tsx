import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../styles/colors";
import { Fonts } from "../../../styles/fonts";
import LargePieChart from "../../../components/large-pie-chart";
import List from "../../../components/list";
import { CreateBudgetButton } from "../../../components/button";
import ProgressHeader from "../../../components/progress-header";

interface PickMonthlyProps {
  onNavigateToIncomeSplit?: () => void;
  onBack?: () => void;
  onExit?: () => void;
  progress?: number;
}

export default function PickMonthly({ 
  onBack, 
  onExit, 
  progress = 40,
  onNavigateToIncomeSplit
}: PickMonthlyProps) {
  return (
    <View style={styles.container}>
      <ProgressHeader 
        onBack={onBack} 
        onExit={onExit} 
        progress={progress} 
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
         <Text style={styles.title}>Estimate Monthly Earnings</Text>
            <Text style={styles.description}>
                The selected amount will be the total that you have to set your budget
            </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 25,
    ...Fonts.regular,
    color: Colors.text,
    marginTop: 10,
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  description: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
    marginBottom: 24, 
    lineHeight: 22,
  },
});