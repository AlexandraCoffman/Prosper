// Component architecture and path calculations generated with the help of Claude Sonnet 4.6
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

export interface SpendingDataPoint {
  day: number; // takes 1–31
  amount: number;
}

interface SpendGraphProps {
  data: SpendingDataPoint[];
  totalSpending?: number;
}

// Least-squares linear regression → { slope, intercept }
function computeRegression(points: { x: number; y: number }[]): {
  slope: number;
  intercept: number;
} {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: points[0]?.y ?? 0 };
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

// Jagged polyline path through an array of {x,y} SVG coords
function jaggedPath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return "";
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}

const PADDING = { top: 24 };

const SpendGraph = ({ data, totalSpending = 0 }: SpendGraphProps) => {
  const height = 160;
  const { width: screenWidth } = useWindowDimensions();
  // Account for the parent's horizontal padding (24 each side in dashboard)
  const svgWidth = screenWidth - 48;
  const chartW = svgWidth;
  const chartH = height - PADDING.top;

  if (!data || data.length < 2) {
    return (
      <View style={[styles.container, { height: 160 }]}>
        <Text style={styles.empty}>No spending data</Text>
      </View>
    );
  }

  const sorted = [...data].sort((a, b) => a.day - b.day);
  const minDay = sorted[0].day;
  const maxDay = sorted[sorted.length - 1].day;
  const amounts = sorted.map((d) => d.amount);
  const minAmt = Math.min(...amounts);
  const maxAmt = Math.max(...amounts);
  const amtRange = maxAmt - minAmt || 1;

  // Map data → SVG coordinates
  const toSvgX = (day: number) =>
    ((day - minDay) / (maxDay - minDay || 1)) * chartW;
  const toSvgY = (amt: number) =>
    PADDING.top + (1 - (amt - minAmt) / amtRange) * chartH;

  const svgPts = sorted.map((d) => ({ x: toSvgX(d.day), y: toSvgY(d.amount) }));

  // Linear regression in SVG-x space
  const regPts = sorted.map((d) => ({ x: toSvgX(d.day), y: d.amount }));
  const { slope, intercept } = computeRegression(regPts);
  const regY = (svgX: number) => {
    // svgX → original amount domain via regression, then → svgY
    const amt = slope * svgX + intercept;
    return toSvgY(amt);
  };

  const x0 = toSvgX(minDay);
  const x1 = toSvgX(maxDay);
  const baseline = PADDING.top + chartH;

  // Spending area (closed path down to baseline)
  const spendLinePath = jaggedPath(svgPts);
  const spendAreaPath =
    spendLinePath +
    ` L ${x1.toFixed(2)} ${baseline.toFixed(2)}` +
    ` L ${x0.toFixed(2)} ${baseline.toFixed(2)} Z`;

  // Regression area (straight line closed down to baseline)
  const ry0 = regY(x0);
  const ry1 = regY(x1);
  const regAreaPath =
    `M ${x0.toFixed(2)} ${ry0.toFixed(2)}` +
    ` L ${x1.toFixed(2)} ${ry1.toFixed(2)}` +
    ` L ${x1.toFixed(2)} ${baseline.toFixed(2)}` +
    ` L ${x0.toFixed(2)} ${baseline.toFixed(2)} Z`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Current spent this month</Text>
        <Text style={styles.headerValue}>${totalSpending}</Text>
      </View>
      <Svg width={svgWidth} height={160}>
        <Defs>
          <LinearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={Colors.accent} stopOpacity="1" />
            <Stop offset="100%" stopColor={Colors.accent} stopOpacity="0.6" />
          </LinearGradient>
          <LinearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#67AE7A" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#67AE7A" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>

        {/* Layer 1: accent fill — spending area (above regression will be visible) */}
        <Path d={spendAreaPath} fill="url(#accentGrad)" />

        {/* Layer 2: primary fill — regression area (covers below-regression portion) */}
        <Path d={regAreaPath} fill="url(#primaryGrad)" />

        {/* Spending line */}
        <Path
          d={spendLinePath}
          stroke={Colors.primary}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <Circle
          cx={svgPts[svgPts.length - 1].x}
          cy={svgPts[svgPts.length - 1].y}
          r={5}
          fill={Colors.background}
          stroke={Colors.primary}
          strokeWidth={3}
        />
      </Svg>

      <TouchableOpacity style={styles.footer} activeOpacity={0.7}>
        <Text style={styles.footerText}>View all transactions</Text>
        <Ionicons
          name="chevron-forward"
          size={14}
          color={Colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 24,
    backgroundColor: Colors.accent,
  },
  empty: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 32,
  },
  yLabels: {
    position: "absolute",
    right: 0,
    top: 0,
    justifyContent: "space-between",
    pointerEvents: "none",
  },
  yLabel: {
    ...Fonts.regular,
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: "right",
  },
  header: {
    position: "absolute",
    top: 16,
    left: 20,
  },
  headerText: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.text,
  },
  headerValue: {
    ...Fonts.bold,
    fontSize: 20,
    color: Colors.text,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.accent2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  footerText: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.text,
  },
});

export default SpendGraph;
