// Alexandra Coffman - Budget Tab
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";
import LargePieChart from "../../components/large-pie-chart";
import List from "../../components/list";
import { CreateBudgetButton } from "../../components/button";
import Card from "../../components/card";

export default function Budget() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRightSide} />

        {/* Date */}
        <TouchableOpacity style={styles.headerDateContainer}>
          <Text style={styles.headerDate}>October 2025</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.text} />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          style={[styles.headerRightSide, { alignItems: "flex-end" }]}
        >
          <Ionicons name="settings-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <LargePieChart showLegend={true} />

        {/* Needs */}
        {/*<List
          title="Needs"
          items={[
            { title: 'XXXXXX', subtitle: 'XXX% of paycheck', amount: '$XXX' },
            { title: 'XXXXX', subtitle: 'XX% of paycheck', amount: '$XX' },
            { title: 'XXXX', subtitle: 'X% of paycheck', amount: '$X' },
          ]}
        />
        */}
        <Card
          header="Needs"
          body={[
            {
              title: "XXXXXX",
              desc: "XXX% of paycheck",
              value: "$XXX",
            },
            {
              title: "XXXXX",
              desc: "XX% of paycheck",
              value: "$XX",
            },
            {
              title: "XXXX",
              desc: "X% of paycheck",
              value: "$X",
            },
          ]}
          onPress={() => {}}
          isAdd={true}
        />

        {/* Needs/Wants/Savings View */}
        <View style={styles.viewSwitch}>
          <View style={[styles.dotView, styles.dotViewActive]} />
          <View style={styles.dotView} />
          <View style={styles.dotView} />
        </View>

        {/* Create Budget Button */}
        <CreateBudgetButton />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 10,
  },
  headerRightSide: {
    flex: 1,
  },
  headerDateContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerDate: {
    fontSize: 18,
    ...Fonts.regular,
    color: Colors.text,
    marginRight: 4,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  viewSwitch: {
    flexDirection: "row",
    marginBottom: 15,
  },
  dotView: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: Colors.accent,
    marginHorizontal: 4,
  },
  dotViewActive: {
    backgroundColor: Colors.primary,
  },
});
