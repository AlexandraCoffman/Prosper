import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";

const ProsperButton = () => {
  return (
    <Pressable onPress={() => {}} style={styles.button}>
      <Text style={styles.text}>Click me</Text>
    </Pressable>
  );
};

export default ProsperButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 8,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
});
