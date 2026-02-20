import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";

const SmallPieChart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Small Pie Chart</Text>
    </View>
  );
};

export default SmallPieChart;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
    marginLeft: 24,
    marginRight: 24,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 150,
    borderRadius: 10,
    backgroundColor: Colors.accent,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
