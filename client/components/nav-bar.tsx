// Alexandra Coffman - Bottom Nav Bar Component
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather, Octicons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
interface BottomNavProps {
  currentScreen: string;
  setScreen: (screen: string) => void;
}

export default function BottomNav({ currentScreen, setScreen }: BottomNavProps) {
  // Use ReactNative Vector Icons for nav icons
  const navItems = [
    { 
      name: "Dashboard", 
      IconFamily: Feather, 
      iconName: "home" 
    },
    { 
      name: "Accounts", 
      IconFamily: Octicons, 
      iconName: "stack" 
    },
    { 
      name: "Transactions", 
      IconFamily: Ionicons,
      iconName: "receipt-outline" 
    },
    { 
      name: "Budget", 
      IconFamily: FontAwesome, 
      iconName: "bar-chart-o"
    },
    { 
      name: "Learn", 
      IconFamily: Feather, 
      iconName: "book-open" 
    },
  ];

  return (
    <View style={styles.navBar}>
      {navItems.map((item) => {
        const isActive = currentScreen === item.name;
        return (
          <TouchableOpacity 
            key={item.name} 
            style={styles.navItem} 
            onPress={() => setScreen(item.name)}
          >
            <item.IconFamily 
              name={item.iconName as any} 
              size={24} 
              color={isActive ? Colors.text : Colors.textSecondary} // switch color based on active state
              style={styles.icon}
            />
            <Text style={[
              styles.label, 
              { color: isActive ? Colors.text : Colors.textSecondary } // switch color based on active state
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.accent2,
    padding: 10,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderColor: Colors.accent2,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: "Libre Caslon Text",
  },
});