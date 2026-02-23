import { Pressable, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

interface ProsperButtonProps {
  onPress: () => void;
  text?: string;
}

const ProsperButton = ({ onPress, text }: ProsperButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text || "Click me"}</Text>
    </Pressable>
  );
};

export default ProsperButton;

// Create Budget Button
export function CreateBudgetButton() {
  return (
    <TouchableOpacity style={styles.createButton}>
      <Text style={styles.createButtonText}>Create Budget</Text>
    </TouchableOpacity>
  );
}

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
  createButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  createButtonText: {
    fontSize: 16,
    ...Fonts.regular,
    color: Colors.text,
  },
});
