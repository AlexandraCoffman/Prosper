import { Pressable, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

interface ProsperButtonProps {
  onPress: () => void;
  text?: string;
  borderRadius?: number;
}
interface CreateBudgetButtonProps {
  onPress?: () => void;
}
interface ContinueButtonProps {
  onPress?: () => void;
}

const ProsperButton = ({ onPress, text, borderRadius }: ProsperButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, { borderRadius: borderRadius ?? 999 }]}>
      <Text style={styles.text}>{text || "Click me"}</Text>
    </Pressable>
  );
};

export default ProsperButton;

// Create Budget Button
export const CreateBudgetButton = ({ onPress }: CreateBudgetButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.createButton}>
      <Text style={styles.createButtonText}>Create Budget</Text>
    </TouchableOpacity>
  );
};

export const ContinueButton = ({ onPress }: ContinueButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.createButton}>
      <Text style={styles.createButtonText}>Continue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 999,
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
    alignSelf: "center",
  },
  createButtonText: {
    fontSize: 16,
    ...Fonts.regular,
    color: Colors.text,
  },
});
