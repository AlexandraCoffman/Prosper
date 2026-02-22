import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

interface BottomNavProps {
  currentScreen: string;
  setScreen: (screen: string) => void;
}

export default function BottomNav({ currentScreen, setScreen }: BottomNavProps) {
  const navItems = [
    { name: "Dashboard", icon: require("../assets/Dashboard.png") },
    { name: "Accounts", icon: require("../assets/Accounts.png") },
    { name: "Transactions", icon: require("../assets/Transactions.png") },
    { name: "Budget", icon: require("../assets/Budget.png") },
    { name: "Learn", icon: require("../assets/Learn.png") },
  ];

  return (
    <View style={styles.navBar}>
      {navItems.map((item) => (
        <TouchableOpacity 
          key={item.name} 
          style={styles.navItem} 
          onPress={() => setScreen(item.name)}
        >
          <Image 
            source={item.icon} 
          />
          <Text style={styles.label}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F6F5F0",
    padding: 10,
    borderColor: "#F6F5F0",
    width: "100%",
  },
  navItem: {
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 4,
    resizeMode: "contain",
  },
  label: {
    fontSize: 13,
    color: "#333",
  },
});