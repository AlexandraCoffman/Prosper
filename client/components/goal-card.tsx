import { View, Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import ProgressBar from "./progress-bar";
import { Ionicons } from "@expo/vector-icons";

interface GoalCardProps {
  onPress: () => void;
  label?: string;
  value?: number;
}

const GoalCard = ({ onPress, label, value }: GoalCardProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.button]}>
      <Text style={[styles.text]}>{label}</Text>
      <Text style={[styles.value]}>${value}</Text>
      <ProgressBar progress={value ? (value / 1000) * 100 : 0} />
      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={24} color={Colors.text} />
      </View>
    </Pressable>
  );
};

export default GoalCard;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 16,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    ...Fonts.regular,
  },
  text: {
    color: Colors.text,
    fontSize: 14,
    ...Fonts.regular,
    marginBottom: 16,
  },
  value: {
    color: Colors.text,
    fontSize: 16,
    ...Fonts.bold,
    marginBottom: 4,
  },
  iconContainer: {
    position: "absolute",
    right: 16,
    top: "50%",
  },
});
