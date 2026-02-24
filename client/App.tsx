import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import SavingsGoals from "./app/tabs/dashboard/savings-goals";
import Dashboard from "./app/tabs/dashboard/dashboard";
import Budget from "./app/tabs/budget/budget";
import Accounts from "./app/tabs/accounts";
import Transactions from "./app/tabs/transactions";
import Learn from "./app/tabs/learn";
import { Colors } from "./styles/colors";
import BottomNav from "./components/nav-bar";
import MonthlyEarnings from "./app/tabs/budget/monthly-earnings";
import PickMonthly from "./app/tabs/budget/pick-monthly";

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
  // Bottom nav bar → tab components (client/app/tabs/)
  const renderScreen = () => {
    switch (currentScreen) {
      case "Dashboard":
        return (
          <Dashboard
            onNavigateToSavingsGoals={() => setScreen("savings-goals")}
          />
        );
      case "Accounts":
        return <Accounts />;
      case "Transactions":
        return <Transactions />;
      case "Budget":
        return (
          <Budget 
            onNavigateToEstimateMonthlyEarnings={() => setCurrentScreen("MonthlyEarnings")} 
          />
        );
      case "MonthlyEarnings":
        return (
          <MonthlyEarnings 
            progress={20}
            onBack={() => setCurrentScreen("Budget")} 
            onExit={() => setCurrentScreen("Budget")} 
            onNavigateToIncomeSplit={() => setCurrentScreen("PickMonthly")}
          />
        );
      case "PickMonthly":
        return (
          <PickMonthly
          progress={40}
          onBack={() => setCurrentScreen("MonthlyEarnings")} 
          onExit={() => setCurrentScreen("Budget")} 
        />
        )
      case "Learn":
        return <Learn />;
      default:
        return (
          <Dashboard
            onNavigateToSavingsGoals={() => setScreen("savings-goals")}
          />
        );
    }
  };

  if (screen === "savings-goals") {
    return (
      <View style={styles.container}>
        <View style={styles.screenContent}>
          <SavingsGoals onBack={() => setScreen("home")} />
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
      <View style={styles.content}>{renderScreen()}</View>
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  screenContent: {
    flex: 1,
    width: "100%",
    paddingTop: 48,
  },
});
