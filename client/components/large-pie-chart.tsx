import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

type DonutChartProps = {
  showCenterText?: boolean;
  centerImage?: ImageSourcePropType;
};

// Donut budget chart
const DonutChart = ({
  showCenterText = true,
  centerImage,
}: DonutChartProps) => {
  return (
    <View style={styles.donutContainer}>
      <View style={styles.budgetRingOuter}>
        <View style={styles.budgetRingInner}>
          {centerImage ? (
            <Image
              source={centerImage}
              style={styles.centerImage}
              resizeMode="contain"
            />
          ) : showCenterText ? (
            <>
              <Text style={styles.budgetDonutText}>Budget</Text>
              <Text style={styles.budgetDonutAmount}>$0</Text>
            </>
          ) : null}
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
  showCenterText?: boolean;
  centerImage?: ImageSourcePropType;
};

export default function LargePieChart({
  showLegend = true,
  showCenterText = true,
  centerImage,
}: LargePieChartProps) {
  return (
    <>
      <DonutChart showCenterText={showCenterText} centerImage={centerImage} />
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
    alignItems: "center",
    marginVertical: 20,
  },
  budgetRingOuter: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  budgetRingInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  centerImage: {
    width: 120,
    height: 120,
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
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
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
