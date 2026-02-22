import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import BottomNav from "./components/nav-bar"; 
import Budget from "./app/tabs/Budget";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Dashboard");
  const [message, setMessage] = useState("Loading...");

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
      default:
        return null;
    }
  };

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
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});