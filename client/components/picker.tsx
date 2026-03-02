import { Pressable, Text, StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";

interface ProsperPickerProps {
  items: ProsperPickerItemProps[];
}

interface ProsperPickerItemProps {
  label?: string;
  icon?: string;
  onPress?: () => void;
}

const ProsperPicker = ({ items }: ProsperPickerProps) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <ProsperPickerItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};

const ProsperPickerItem = ({
  label,
  icon,
  onPress,
}: ProsperPickerItemProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      {icon && (
        <Ionicons
          name={icon as React.ComponentProps<typeof Ionicons>["name"]}
          size={20}
          color={Colors.text}
        />
      )}
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

export { ProsperPicker, ProsperPickerItem };

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    margin: 8,
  },
  button: {
    backgroundColor: Colors.accent2,
    padding: 10,
    borderRadius: 999,
    alignItems: "center",
    margin: 8,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
    ...Fonts.regular,
  },
});
