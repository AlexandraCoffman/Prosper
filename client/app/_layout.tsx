import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
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
import App from "../App";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.warn(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add it to your .env or app config.",
  );
}

function SignedOutFallback() {
  const [mode, setMode] = useState<"sign-in" | "sign-up" | "dev-home">(
    "sign-in",
  );

  const renderContent = () => {
    if (mode === "dev-home") {
      return <App />;
    }

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
      {mode !== "dev-home" && (
        <TouchableOpacity
          onPress={() => setMode("dev-home")}
          style={styles.skipButton}
        >
          <Text style={styles.skipButtonText}>Skip for now (dev)</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function ClerkAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkLoading>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.subtitle}>Loading…</Text>
        </View>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>{children}</SignedIn>
        <SignedOut>
          <SignedOutFallback />
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}

function RootLayoutInner({ children }: { children: React.ReactNode }) {
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
      <ClerkAuthLayout>{children}</ClerkAuthLayout>
    </ClerkProvider>
  );
}

export default RootLayoutInner;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "Libre Caslon Text Bold",
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  link: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: "Libre Caslon Text Bold",
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
