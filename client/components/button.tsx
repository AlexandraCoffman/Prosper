import { Pressable, Text, StyleSheet } from "react-native";

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
    backgroundColor: "#DAF5C3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
});
