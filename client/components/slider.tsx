import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../styles/colors";

const Slider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>TOOLTIP</Text>
        </View>
        <View style={styles.thumb} />
      </View>
      <View style={styles.labels}>
        <Text style={styles.leftLabel}>MIN_VALUE</Text>
        <Text style={styles.rightLabel}>MAX_VALUE</Text>
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "80%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  slider: {
    height: 10,
    width: "100%",
    backgroundColor: Colors.accent,
    borderRadius: 10,
    justifyContent: "center",
  },
  tooltip: {
    width: 60,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    position: "absolute",
    top: -30,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: "center",
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  leftLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "left",
  },
  rightLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "right",
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
});
