import { View, Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface CollapsibleMenuProps {
  label?: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  acctType?: string;
  value?: string;
}

const CollapsibleMenu = ({
  label,
  icon,
  acctType,
  value,
}: CollapsibleMenuProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <Pressable
      onPress={() => setIsCollapsed(!isCollapsed)}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          {icon && (
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={24} color={Colors.text} />
            </View>
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{label}</Text>
            <Text style={styles.subheaderText}>{acctType}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.value}>${value}</Text>
          <Ionicons
            name={isCollapsed ? "chevron-down" : "chevron-up"}
            size={24}
            color={Colors.text}
          />
        </View>
      </View>
      {!isCollapsed && (
        <View style={styles.expandedContentContainer}>
          <Text style={styles.text}>Sample Text</Text>
        </View>
      )}
    </Pressable>
  );
};

export default CollapsibleMenu;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: Colors.accent,
    borderRadius: 16,
    ...Fonts.regular,
  },
  expandedContentContainer: {
    height: 100,
    backgroundColor: Colors.accent2,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 15,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    gap: 10,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  headerText: {
    fontSize: 16,
    ...Fonts.regular,
    color: Colors.text,
  },
  subheaderText: {
    fontSize: 12,
    ...Fonts.regular,
    color: Colors.text,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  text: {
    color: Colors.text,
    fontSize: 14,
    ...Fonts.regular,
  },
  value: {
    color: Colors.text,
    fontSize: 16,
    ...Fonts.regular,
    marginBottom: 4,
  },
});
