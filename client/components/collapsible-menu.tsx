import { View, Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface CollapsibleMenuProps {
  label?: string;
}

const CollapsibleMenu = ({ label }: CollapsibleMenuProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <Pressable
      onPress={() => setIsCollapsed(!isCollapsed)}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.text}>Sample Text</Text>
        <Ionicons
          name={isCollapsed ? "chevron-down" : "chevron-up"}
          size={24}
          color={Colors.text}
        />
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
    ...Fonts.bold,
    marginBottom: 4,
  },
});
