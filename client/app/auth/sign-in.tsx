import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Colors } from "../../styles/colors";
import ProsperButton from "../../components/button";

type SignInScreenProps = {
  onSwitchToSignUp: () => void;
};

const SignInScreen: React.FC<SignInScreenProps> = ({ onSwitchToSignUp }) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!isLoaded || loading) return;
    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.message ||
        "Unable to sign in. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <Text style={styles.subtitle}>
        Please enter your email and password that you used to create your
        Prosper account.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address*"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password*"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={onSwitchToSignUp}>
        <Text style={styles.linkEmphasis}>Forgot your password?</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <ProsperButton text="Sign In" onPress={() => {/* TODO: Handle sign in */}} />
      </View>

      <TouchableOpacity>
        <Text style={styles.link}>
          Don&apos;t have an account?{" "}
          <Text style={styles.linkEmphasis} onPress={() => onSwitchToSignUp()}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 64,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontFamily: "Libre Caslon Text",
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Libre Caslon Text Bold",
  },
  link: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  linkEmphasis: {
    color: Colors.text,
    fontFamily: "Libre Caslon Text Bold",
  },
  error: {
    color: "#DC2626",
    fontSize: 13,
    marginBottom: 4,
  },
});
