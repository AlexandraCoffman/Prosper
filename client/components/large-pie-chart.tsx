import React from "react";
import { StyleSheet, Text, View, ImageSourcePropType, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

type DonutChartProps = {
  needs?: number;
  wants?: number;
  savings?: number;
  total?: number;
  showLegend?: boolean;
  showCenterText?: boolean;
  centerImage?: ImageSourcePropType;
};

export default function DonutChart({
  needs = 0,
  wants = 0,
  savings = 0,
  total = 0,
  showLegend = true,
  showCenterText = true,
  centerImage,
}: DonutChartProps) {

  const size = 270; 
  const width = 30; 
  const radius = (size - width) / 2;
  const circumference = radius * 2 * Math.PI;

  const totalAmount = total || (needs + wants + savings);
  
  const needsPercentage = totalAmount > 0 ? needs / totalAmount : 1; 
  const wantsPercentage = totalAmount > 0 ? wants / totalAmount : 0;
  const savingsPercentage = totalAmount > 0 ? savings / totalAmount : 0;

  const needsOffset = 0;
  const wantsOffset = circumference * needsPercentage;
  const savingsOffset = circumference * (needsPercentage + wantsPercentage);

  const circleSize = {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    strokeWidth: width,
    fill: "none" as const,
    rotation: "-90",
    origin: `${size / 2}, ${size / 2}`,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.chartContainer, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            {...circleSize}
            stroke={Colors.primary}
            strokeDasharray={`${circumference * needsPercentage} ${circumference}`}
            strokeDashoffset={-needsOffset}
          />
          <Circle
            {...circleSize}
            stroke={Colors.secondary}
            strokeDasharray={`${circumference * wantsPercentage} ${circumference}`}
            strokeDashoffset={-wantsOffset}
          />
          <Circle
            {...circleSize}
            stroke={Colors.accent}
            strokeDasharray={`${circumference * savingsPercentage} ${circumference}`}
            strokeDashoffset={-savingsOffset}
          />
        </Svg>

        <View style={styles.centerContent}>
          {centerImage ? (
            <Image source={centerImage} style={styles.centerImage} resizeMode="contain" />
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
          <LegendItem color={Colors.primary} label="Needs" />
          <LegendItem color={Colors.secondary} label="Wants" />
          <LegendItem color={Colors.accent} label="Savings" />
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
  },
  centerContent: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  centerImage: { 
    width: 80, 
    height: 80 
  },
  budgetDonutText: { 
    fontSize: 14, 
    ...Fonts.regular, 
    color: Colors.text 
  },
  budgetDonutAmount: { 
    fontSize: 24, 
    ...Fonts.bold, 
    color: Colors.text 
  },
  legendContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: 20 
  },
  legendItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginHorizontal: 12 
  },
  legendDot: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    marginRight: 6 
  },
  legendLabel: { 
    fontSize: 12, 
    ...Fonts.regular, 
    color: Colors.text 
  },
});