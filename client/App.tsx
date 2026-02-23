import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import ProsperButton from "./components/button";
import CalendarPicker from "./components/calendar-picker";
import Slider from "./components/slider";
import SavingsGoals from "./app/tabs/dashboard/savings-goals";
import { Colors } from "./styles/colors";
import BottomNav from "./components/nav-bar";
import Budget from "./app/tabs/budget";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Dashboard");
  const [message, setMessage] = useState("Loading...");
  const [screen, setScreen] = useState<"home" | "savings-goals">("home");
  // Set global font for app
  const [fontsLoaded] = useFonts({
    "Libre Caslon Text": require("./styles/LibreCaslonText-Regular.ttf"),
    "Libre Caslon Text Bold": require("./styles/LibreCaslonText-Bold.ttf"),
    "Libre Caslon Text Italic": require("./styles/LibreCaslonText-Italic.ttf"),
  });

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/test");
        const data = await response.json();
        setMessage(data.message);
      } catch (error: any) {
        setMessage(`Error: ${error.message}`);
      }
    };

    fetchMessage();
  }, []);
  // Bottom nav bar links
  const renderScreen = () => {
    switch (currentScreen) {
      case "Budget":
        return <Budget />;
      case "Dashboard":
      default:
        return (
          <>
            <ProsperButton />
            <Pressable
              style={styles.navButton}
              onPress={() => setScreen("savings-goals")}
            >
              <Text style={styles.navButtonText}>Savings Goals</Text>
            </Pressable>
            <Slider />
            <CalendarPicker />
          </>
        );
    }
  };

  if (screen === "savings-goals") {
    return (
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => setScreen("home")}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <View style={styles.screenContent}>
          <SavingsGoals />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <BottomNav currentScreen={currentScreen} setScreen={setCurrentScreen} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  navButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: 16,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "500",
  },
  screenContent: {
    flex: 1,
    width: "100%",
    paddingTop: 48,
  },
});
