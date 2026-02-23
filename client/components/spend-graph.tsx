import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

const SpendGraph = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spend Graph</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 24,
  },
  title: {
    fontSize: 16,
  },
});

export default SpendGraph;
