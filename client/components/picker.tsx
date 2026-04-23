import { Pressable, Text, StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";

interface ProsperPickerProps {
  items: ProsperPickerItemProps[];
  selectedValues?: string[];
}

interface ProsperPickerItemProps {
  label?: string;
  icon?: string;
  onPress?: () => void;
  selected?: boolean;
}

const ProsperPicker = ({ items, selectedValues }: ProsperPickerProps) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <ProsperPickerItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          onPress={item.onPress}
          selected={selectedValues?.includes(item.label ?? "") ?? item.selected ?? false}
        />
      ))}
    </View>
  );
};

const ProsperPickerItem = ({
  label,
  icon,
  onPress,
  selected,
}: ProsperPickerItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        selected && styles.buttonSelected,
        pressed && styles.buttonPressed,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon as React.ComponentProps<typeof Ionicons>["name"]}
          size={20}
          color={selected ? "#ffffff" : Colors.text}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, selected && styles.textSelected]}>
        {label}
      </Text>
    </Pressable>
  );
};

export { ProsperPicker, ProsperPickerItem };

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 8,
  },
  button: {
    backgroundColor: Colors.accent2,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  buttonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
    ...Fonts.regular,
  },
  textSelected: {
    color: "#ffffff",
  },
});
