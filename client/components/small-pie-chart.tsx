import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

type SmallPieChartProps = {
  amountSaved: number;
  amountRemaining: number;
};

const SmallPieChart = ({ amountSaved, amountRemaining }: SmallPieChartProps) => {
  const size = 80;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const total = amountSaved + amountRemaining;
  const percentage = total > 0 ? amountSaved / total : 0;
  const percentageDisplay = Math.round(percentage * 100);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={4}
          fill="none"
          stroke={Colors.secondary}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={Colors.primary}
          strokeDasharray={`${circumference * percentage} ${circumference}`}
          strokeDashoffset={0}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.centerLabel}>
        <Text style={styles.percentText}>{percentageDisplay}%</Text>
      </View>
    </View>
  );
};

export default SmallPieChart;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  centerLabel: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  percentText: {
    fontSize: 13,
    ...Fonts.bold,
    color: Colors.text,
  },
});
