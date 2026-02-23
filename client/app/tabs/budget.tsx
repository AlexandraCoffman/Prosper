// Alexandra Coffman - Budget Tab
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

// Donut budget chart
const DonutChart = () => {
  return (
    <View style={styles.donutContainer}>
      <View style={styles.budgetRingOuter}>
        <View style={styles.budgetRingInner}>
          <Text style={styles.budgetDonutText}>Budget</Text>
          <Text style={styles.budgetDonutAmount}>$0</Text>
        </View>
      </View>
    </View>
  );
};
// Donut Chart Legend
const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);
// Needs Card
const NeedsItem = ({ title, subtitle, amount }: { title: string; subtitle: string; amount: string }) => (
  <View style={styles.needsItem}>
    <View style={styles.needsHelpIcons}>
      <Ionicons name="help" size={16} color={Colors.text} />
    </View>
    <View style={styles.amountNeedsText}>
      <Text style={styles.classificationTitleNeeds}>{title}</Text>
      <Text style={styles.percentPaycheckNeeds}>{subtitle}</Text>
    </View>
    <Text style={styles.needsItemAmount}>{amount}</Text>
  </View>
);

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
        <TouchableOpacity style={[styles.headerRightSide, { alignItems: 'flex-end' }]}>
          <Ionicons name="settings-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <DonutChart />

        {/* Legend */}
        <View style={styles.legendContainer}>
          <LegendItem color={Colors.primary} label="Needs" />
          <LegendItem color={Colors.secondary} label="Wants" />
          <LegendItem color={Colors.accent} label="Savings" />
        </View>

        {/* Needs */}
        <View style={styles.needsCardExpand}>
          <TouchableOpacity style={styles.needsCardHeader}>
            <Text style={styles.needsCardTitle}>Needs</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.text} />
          </TouchableOpacity>
          
          {/* Needs Breakdown */}
          <View style={styles.needsCardBody}>
            <NeedsItem title="XXXXXX" subtitle="XXX% of paycheck" amount="$XXX" />
            <View style={styles.separator} />
            <NeedsItem title="XXXXX" subtitle="XX% of paycheck" amount="$XX" />
            <View style={styles.separator} />
            <NeedsItem title="XXXX" subtitle="X% of paycheck" amount="$X" />
          </View>
        </View>

        {/* Needs/Wants/Savings View */}
        <View style={styles.viewSwitch}>
          <View style={[styles.dotView, styles.dotViewActive]} />
          <View style={styles.dotView} />
          <View style={styles.dotView} />
        </View>

        {/* Create Budget Button */}
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Budget</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginTop: 35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60, 
    paddingBottom: 10,
  },
  headerRightSide: {
    flex: 1,
  },
  headerDateContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerDate: {
    fontSize: 18,
    ...Fonts.regular,
    color: Colors.text,
    marginRight: 4,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  donutContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  budgetRingOuter: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetRingInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetDonutText: {
    fontSize: 16,
    ...Fonts.regular,
    color: Colors.text,
  },
  budgetDonutAmount: {
    fontSize: 25,
    ...Fonts.regular,
    color: Colors.text,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 100,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 12,
    ...Fonts.regular,
    color: Colors.text,
  },
  needsCardExpand: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    width: '90%',
    marginBottom: 10,
    overflow: 'hidden',
  },
  needsCardHeader: {
    backgroundColor: Colors.accent2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  needsCardBody: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  needsCardTitle: {
    fontSize: 16,
    ...Fonts.regular,
    color: Colors.text,
  },
  needsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  needsHelpIcons: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  amountNeedsText: {
    flex: 1,
  },
  classificationTitleNeeds: {
    fontSize: 14,
    ...Fonts.regular,
    color: Colors.text,
  },
  percentPaycheckNeeds: {
    fontSize: 12,
    ...Fonts.regular,
    color: Colors.text,
    marginTop: 2,
  },
  needsItemAmount: {
    fontSize: 14,
    ...Fonts.regular,
    color: Colors.text,
  },
  separator: {
    height: 3,
    backgroundColor: '#FFFF',
    borderRadius: 100,
  },
  viewSwitch: {
    flexDirection: 'row',
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
  createButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    ...Fonts.regular,
    color: Colors.text,
  },
});