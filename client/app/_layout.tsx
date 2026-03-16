import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Colors } from "../styles/colors";
import SignInScreen from "./auth/sign-in";
import SignUpScreen from "./auth/sign-up";
import BottomNav from "../components/nav-bar";
import SavingsGoals from "./tabs/dashboard/savings-goals";
import Dashboard from "./tabs/dashboard/dashboard";
import Budget from "./tabs/budget/budget-not-setup";
import Accounts from "./tabs/accounts";
import Transactions from "./tabs/transactions";
import Learn from "./tabs/learn";
import MonthlyEarnings from "./tabs/budget/budget-setup-1";
import PickMonthly from "./tabs/budget/budget-setup-2";
import Bills from "./tabs/budget/budget-setup-3";
import IncomeSplit from "./tabs/budget/budget-setup-4";
import BudgetPlan from "./tabs/budget/budget-setup-5";
import BudgetCreated from "./tabs/budget/budget-created";
import { Ionicons } from "@expo/vector-icons";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.warn(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add it to your .env or app config.",
  );
}

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState("Dashboard");
  const [screen, setScreen] = useState<"home" | "savings-goals" | "sign-in">(
    "home",
  );

  const [isBudgetCreated, setIsBudgetCreated] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        await fetch("http://localhost:3000/api/test");
      } catch {
        // server unreachable in dev
      }
    };
    fetchMessage();
  }, []);
  const handleNavChange = (newScreen : string) => {
      if(newScreen === "Budget" && isBudgetCreated) {
        setCurrentScreen("BudgetCreated");
      } else {
        setCurrentScreen(newScreen);
      }
    };
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
            onNavigateToEstimateMonthlyEarnings={() =>
              setCurrentScreen("MonthlyEarnings")
            }
          />
        );
      case "MonthlyEarnings":
        return (
          <MonthlyEarnings
            progress={20}
            onBack={() => setCurrentScreen("Budget")}
            onExit={() => setCurrentScreen("Budget")}
            onNavigateToPickMonthly={() => setCurrentScreen("PickMonthly")}
          />
        );
      case "PickMonthly":
        return (
          <PickMonthly
            progress={40}
            onBack={() => setCurrentScreen("MonthlyEarnings")}
            onExit={() => setCurrentScreen("Budget")}
            onNavigateToBills={() => setCurrentScreen("Bills")}
          />
        );
      case "Bills":
        return (
          <Bills
            progress={60}
            onBack={() => setCurrentScreen("PickMonthly")}
            onExit={() => setCurrentScreen("Budget")}
            onNavigateToIncomeSplit={() => setCurrentScreen("IncomeSplit")}
          />
        );
      case "IncomeSplit":
        return (
          <IncomeSplit
            progress={80}
            onBack={() => setCurrentScreen("Bills")}
            onExit={() => setCurrentScreen("Budget")}
            onNavigateToBudgetPlan={() => setCurrentScreen("BudgetPlan")}
          />
        );
      case "BudgetPlan":
        return (
          <BudgetPlan
            progress={90}
            onBack={() => setCurrentScreen("IncomeSplit")}
            onExit={() => setCurrentScreen("Budget")}
            onNavigateToBudgetCreated={() => {
              setIsBudgetCreated(true);
              setCurrentScreen("BudgetCreated");
            }}
          />
        );
      case "BudgetCreated":
        return (
          <BudgetCreated
            progress={100}
            onBack={() => setCurrentScreen("BudgetPlan")}
            onExit={() => setCurrentScreen("BudgetCreated")}
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

  if (screen === "sign-in") {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.signInClose}
          onPress={() => setScreen("home")}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.screenContent}>
          <SignInScreen onSwitchToSignUp={() => {}} />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (screen === "savings-goals") {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.signIn}
          onPress={() => setScreen("sign-in")}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.screenContent}>
          <SavingsGoals onBack={() => setScreen("home")} />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.signIn}
        onPress={() => setScreen("sign-in")}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.content}>{renderScreen()}</View>
      <BottomNav currentScreen={currentScreen} setScreen={handleNavChange} />
      <StatusBar style="auto" />
    </View>
  );
}

function SignedOutFallback() {
  const [mode, setMode] = useState<"sign-in" | "sign-up" | "dev-home">(
    "sign-in",
  );

  if (mode === "dev-home") {
    return <AppContent />;
  }

  const renderContent = () => {
    if (mode === "sign-in") {
      return (
        <SignInScreen
          onSwitchToSignUp={() => {
            setMode("sign-up");
          }}
        />
      );
    }

    return (
      <SignUpScreen
        onSwitchToSignIn={() => {
          setMode("sign-in");
        }}
      />
    );
  };

  return (
    <View style={styles.centered}>
      {renderContent()}
      <TouchableOpacity
        onPress={() => setMode("dev-home")}
        style={styles.skipButton}
      >
        <Text style={styles.skipButtonText}>Skip for now (dev)</Text>
      </TouchableOpacity>
    </View>
  );
}

function ClerkAuthLayout() {
  return (
    <>
      <ClerkLoading>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.subtitle}>Loading…</Text>
        </View>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <AppContent />
        </SignedIn>
        <SignedOut>
          <SignedOutFallback />
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}

export default function RootLayoutInner() {
  const [fontsLoaded] = useFonts({
    "Libre Caslon Text": require("../styles/LibreCaslonText-Regular.ttf"),
    "Libre Caslon Text Bold": require("../styles/LibreCaslonText-Bold.ttf"),
    "Libre Caslon Text Italic": require("../styles/LibreCaslonText-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!publishableKey) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>
          Clerk is not configured. Set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY.
        </Text>
      </View>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkAuthLayout />
    </ClerkProvider>
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
  signIn: {
    position: "absolute",
    top: 48,
    right: 24,
    zIndex: 10,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  signInText: {
    color: Colors.text,
    fontFamily: "Libre Caslon Text Bold",
    fontSize: 15,
  },
  signInClose: {
    position: "absolute",
    top: 64,
    left: 24,
    zIndex: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  signInCloseText: {
    color: Colors.text,
    fontSize: 22,
    fontFamily: "Libre Caslon Text Bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  error: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  skipButton: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    backgroundColor: "rgba(0,0,0,0.02)",
  },
  skipButtonText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
