import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  Image,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

const SEGMENT_COLORS = [Colors.primary, Colors.secondary, Colors.accent];

type SavingsGoalSegment = {
  title: string;
  amountSaved: number;
};

type DonutChartProps = {
  needs?: number;
  wants?: number;
  savings?: number;
  total?: number;
  showLegend?: boolean;
  showCenterText?: boolean;
  centerImage?: ImageSourcePropType;
  savingsGoals?: SavingsGoalSegment[];
};

export default function DonutChart({
  needs = 0,
  wants = 0,
  savings = 0,
  total = 0,
  showLegend = true,
  showCenterText = true,
  centerImage,
  savingsGoals,
}: DonutChartProps) {
  const size = 270;
  const width = 30;
  const radius = (size - width) / 2;
  const circumference = radius * 2 * Math.PI;

  const hasSavingsGoals = savingsGoals && savingsGoals.length > 0;

  const segments: { label: string; percentage: number; color: string }[] =
    (() => {
      if (hasSavingsGoals) {
        const totalSaved = savingsGoals!.reduce(
          (sum, g) => sum + g.amountSaved,
          0,
        );
        return savingsGoals!.map((g, i) => ({
          label: g.title,
          percentage:
            totalSaved > 0
              ? g.amountSaved / totalSaved
              : 1 / savingsGoals!.length,
          color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
        }));
      }
      const totalAmount = total || needs + wants + savings;
      return [
        {
          label: "Needs",
          percentage: totalAmount > 0 ? needs / totalAmount : 1,
          color: Colors.primary,
        },
        {
          label: "Wants",
          percentage: totalAmount > 0 ? wants / totalAmount : 0,
          color: Colors.secondary,
        },
        {
          label: "Savings",
          percentage: totalAmount > 0 ? savings / totalAmount : 0,
          color: Colors.accent,
        },
      ];
    })();

  const totalAmount = hasSavingsGoals
    ? savingsGoals!.reduce((sum, g) => sum + g.amountSaved, 0)
    : total || needs + wants + savings;

  const circleSize = {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    strokeWidth: width,
    fill: "none" as const,
    rotation: "-90",
    origin: `${size / 2}, ${size / 2}`,
  };

  let cumulativePercentage = 0;

  return (
    <View style={styles.container}>
      <View style={[styles.chartContainer, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((seg, i) => {
            const offset = circumference * cumulativePercentage;
            cumulativePercentage += seg.percentage;
            return (
              <Circle
                key={i}
                {...circleSize}
                stroke={seg.color}
                strokeDasharray={`${circumference * seg.percentage} ${circumference}`}
                strokeDashoffset={-offset}
              />
            );
          })}
        </Svg>

        <View style={styles.centerContent}>
          {centerImage ? (
            <Image
              source={centerImage}
              style={styles.centerImage}
              resizeMode="contain"
            />
          ) : showCenterText ? (
            <>
              <Text style={styles.budgetDonutText}>Budget</Text>
              <Text style={styles.budgetDonutAmount}>${totalAmount}</Text>
            </>
          ) : null}
        </View>
      </View>

      {showLegend && (
        <View style={styles.legendContainer}>
          {segments.map((seg) => (
            <LegendItem key={seg.label} color={seg.color} label={seg.label} />
          ))}
        </View>
      )}
    </View>
  );
}

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  chartContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  centerContent: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  centerImage: {
    width: 80,
    height: 80,
  },
  budgetDonutText: {
    fontSize: 14,
    ...Fonts.regular,
    color: Colors.text,
  },
  budgetDonutAmount: {
    fontSize: 24,
    ...Fonts.bold,
    color: Colors.text,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    marginBottom: 24,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 14,
    ...Fonts.regular,
    color: Colors.text,
  },
});
