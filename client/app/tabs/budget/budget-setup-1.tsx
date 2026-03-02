import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Fonts } from "../../../styles/fonts";
import { Colors } from "../../../styles/colors";
import Card from "../../../components/card";
import Button, { ContinueButton } from "../../../components/button";
import ProgressHeader from "../../../components/progress-header";

interface MonthlyEarningsProps {
  onNavigateToPickMonthly?: () => void;
  onBack?: () => void;
  onExit?: () => void;
  progress?: number;
}

export default function MonthlyEarnings({ 
  onBack, 
  onExit, 
  progress = 20, 
  onNavigateToPickMonthly 
}: MonthlyEarningsProps) {
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
        <Text style={styles.title}>Monthly Earnings</Text>
        <Text style={styles.description}>
          If you’ve had an seasonal or irregular income, click the earnings from
          each month and we’ll handle the division
        </Text>
        <Card
          header="October"
          isAdd={true}
          body={[
            {
              title: "University of Pittsburgh",
              desc: "October 30",
              value: "+$1500.81",
            },
            {
              title: "University of Pittsburgh",
              desc: "October 12",
              value: "+$1500.81",
            },
          ]}
        />
        <Card
          header="September"
          isAdd={true}
          body={[
            {
              title: "University of Pittsburgh",
              desc: "September 30",
              value: "+$1500.81",
            },
            {
              title: "University of Pittsburgh",
              desc: "September 12",
              value: "+$1286.81",
            },
          ]}
        />
        <ContinueButton onPress={onNavigateToPickMonthly} />
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
  },
});