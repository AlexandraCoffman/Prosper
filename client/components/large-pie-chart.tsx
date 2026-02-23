import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

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

type LargePieChartProps = {
  showLegend?: boolean;
};

export default function LargePieChart({ showLegend = true }: LargePieChartProps) {
  return (
    <>
      <DonutChart />
      {/* Legend */}
      {showLegend && (
        <View style={styles.legendContainer}>
          <LegendItem color={Colors.primary} label="Needs" />
          <LegendItem color={Colors.secondary} label="Wants" />
          <LegendItem color={Colors.accent} label="Savings" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
});
