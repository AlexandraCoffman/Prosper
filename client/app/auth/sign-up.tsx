import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Colors } from "../../styles/colors";
import ProsperButton from "../../components/button";
import { ProsperPicker } from "../../components/picker";

type SignUpScreenProps = {
  onSwitchToSignIn: () => void;
};

type SignUpStep = "name" | "email" | "password" | "info" | "support" | "goals";

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSwitchToSignIn }) => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [supportNeed, setSupportNeed] = useState<string | null>(null);
  const [primaryGoal, setPrimaryGoal] = useState<string | null>(null);
  const [step, setStep] = useState<SignUpStep>("name");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goToNext = (next: SignUpStep) => {
    setError(null);
    setStep(next);
  };

  const handleCollectEmail = () => {
    if (!email) {
      setError("Enter your email to continue.");
      return;
    }
    goToNext("password");
  };

  const handleCollectPassword = () => {
    if (!password) {
      setError("Enter a password to continue.");
      return;
    }
    goToNext("info");
  };

  const handleSignUp = async () => {
    if (!isLoaded || loading) return;
    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Attempt an email verification, flesh out later
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // If Clerk has created an active session already, grab it
      const { createdSessionId } = signUp;
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.message ||
        "Unable to sign up. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case "name":
        return (
          <>
            <Text style={styles.title}>Enter your name</Text>
            <Text style={styles.subtitle}>
              Please enter your full legal name below
            </Text>
            <TextInput
              style={styles.input}
              placeholder="First Name*"
              autoCapitalize="none"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name*"
              autoCapitalize="none"
              value={lastName}
              onChangeText={setLastName}
            />
            <ProsperButton
              text="Continue"
              onPress={() => {
                setStep("email");
              }}
            />
          </>
        );
      case "email":
        return (
          <>
            <Text style={styles.title}>Enter your email?</Text>
            <Text style={styles.subtitle}>
              Please enter your email address below
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
              placeholder="Confirm Email Address*"
              autoCapitalize="none"
              keyboardType="email-address"
              value={confirmEmail}
              onChangeText={setConfirmEmail}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <ProsperButton
              text="Continue"
              onPress={() => {
                setStep("password");
              }}
            />
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => goToNext("name")}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          </>
        );
      case "password":
        return (
          <>
            <Text style={styles.title}>Set your password</Text>
            <Text style={styles.subtitle}>
              Please set a secure password that you'll remember
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Password*"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password*"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <ProsperButton
              text="Continue"
              onPress={() => {
                handleCollectPassword();
              }}
            />
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => goToNext("email")}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          </>
        );
      case "info":
        return (
          <>
            <Text style={styles.title}>Tell us a little about yourself</Text>
            <Text style={styles.subtitle}>
              Select all of the options below that apply to you
            </Text>
            <ProsperPicker
              items={[
                {
                  label: "I currently rent",
                  onPress: () => setPrimaryGoal("I currently rent"),
                },
                {
                  label: "I am married",
                  onPress: () => setPrimaryGoal("I am married"),
                },
                {
                  label: "I have kids",
                  onPress: () => setPrimaryGoal("I have kids"),
                },
                {
                  label: "I have a car",
                  onPress: () => setPrimaryGoal("I have a car"),
                },
                {
                  label: "I pay student loans",
                  onPress: () => setPrimaryGoal("I pay student loans"),
                },
                {
                  label: "I am a dependent",
                  onPress: () => setPrimaryGoal("I am a dependent"),
                },
              ]}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <ProsperButton
              text="Continue"
              onPress={() => {
                goToNext("support");
              }}
            />
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => goToNext("password")}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          </>
        );
      case "support":
        return (
          <>
            <Text style={styles.title}>How do you support yourself?</Text>
            <Text style={styles.subtitle}>
              Select all of the options below that apply to you
            </Text>
            <ProsperPicker
              items={[
                {
                  label: "Full-time job",
                  onPress: () => setSupportNeed("Full-time job"),
                },
                {
                  label: "Part-time job",
                  onPress: () => setSupportNeed("Part-time job"),
                },
                {
                  label: "Paid internship",
                  onPress: () => setSupportNeed("Paid internship"),
                },
                {
                  label: "Scholarships/Grants",
                  onPress: () => setSupportNeed("Scholarships/Grants"),
                },
                { label: "Loans", onPress: () => setSupportNeed("Loans") },
                {
                  label: "Parent/Guardian assistance",
                  onPress: () => setSupportNeed("Parent/Guardian assistance"),
                },
                {
                  label: "Government assistance",
                  onPress: () => setSupportNeed("Government assistance"),
                },
              ]}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <ProsperButton
              text="Continue"
              onPress={() => {
                goToNext("goals");
              }}
            />
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => goToNext("info")}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          </>
        );
      case "goals":
        return (
          <>
            <Text style={styles.title}>How can Prosper help?</Text>
            <Text style={styles.subtitle}>
              Select the financial goals you would like to achieve
            </Text>
            <ProsperPicker
              items={[
                {
                  label: "Build an emergency fund",
                  onPress: () => setPrimaryGoal("Build an emergency fund"),
                },
                {
                  label: "Pay off debt",
                  onPress: () => setPrimaryGoal("Pay off debt"),
                },
                {
                  label: "Save for a large purchase",
                  onPress: () => setPrimaryGoal("Save for a large purchase"),
                },
                {
                  label: "Save for a small purchase",
                  onPress: () => setPrimaryGoal("Save for a small purchase"),
                },
                {
                  label: "Plan a trip",
                  onPress: () => setPrimaryGoal("Plan a trip"),
                },
                {
                  label: "Manage my finances",
                  onPress: () => setPrimaryGoal("Manage my finances"),
                },
                {
                  label: "Something else",
                  onPress: () => setPrimaryGoal("Something else"),
                },
              ]}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => goToNext("support")}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      <TouchableOpacity onPress={onSwitchToSignIn}>
        <Text style={styles.link}>
          Already have an account?{" "}
          <Text style={styles.linkEmphasis}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

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
  button: {
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.textSecondary,
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
  secondaryButtonText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontFamily: "Libre Caslon Text",
  },
  summaryCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    backgroundColor: "#ffffff",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 15,
    color: Colors.text,
    fontFamily: "Libre Caslon Text Bold",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#ffffff",
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: "#ffffff",
  },
});
