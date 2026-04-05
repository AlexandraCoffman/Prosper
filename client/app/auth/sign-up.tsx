import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSignUp, useAuth } from "@clerk/clerk-expo";
import { Colors } from "../../styles/colors";
import ProsperButton from "../../components/button";
import { ProsperPicker } from "../../components/picker";
import ProgressHeader from "../../components/progress-header";

type SignUpScreenProps = {
  onSwitchToSignIn: () => void;
};

type SignUpStep =
  | "name"
  | "email"
  | "password"
  | "info"
  | "support"
  | "goals"
  | "verify";

const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSwitchToSignIn }) => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { getToken } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [supportNeed, setSupportNeed] = useState<string | null>(null);
  const [primaryGoal, setPrimaryGoal] = useState<string | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<SignUpStep>("name");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const STEP_ORDER: SignUpStep[] = [
    "name",
    "email",
    "password",
    "info",
    "support",
    "goals",
    "verify",
  ];

  const stepProgress = () => {
    const idx = STEP_ORDER.indexOf(step);
    return Math.round(((idx + 1) / STEP_ORDER.length) * 100);
  };

  const handleBack = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx <= 0) {
      onSwitchToSignIn();
    } else {
      goToNext(STEP_ORDER[idx - 1]);
    }
  };

  const goToNext = (next: SignUpStep) => {
    setError(null);
    setStep(next);
  };

  const handleCollectName = () => {
    if (!firstName.trim()) {
      setError("Enter your first name to continue.");
      return;
    }
    if (!lastName.trim()) {
      setError("Enter your last name to continue.");
      return;
    }
    goToNext("email");
  };

  const handleCollectEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Enter your email to continue.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (email !== confirmEmail) {
      setError("Email addresses do not match.");
      return;
    }
    goToNext("password");
  };

  const handleCollectPassword = () => {
    if (!password) {
      setError("Enter a password to continue.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    goToNext("info");
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    );
  };

  const handleStartSignUp = async () => {
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
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      goToNext("verify");
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

  const handleVerifyOtp = async () => {
    if (!isLoaded || loading) return;
    if (!otpCode) {
      setError("Enter the verification code to continue.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });

      if (result.status !== "complete" || !result.createdSessionId) {
        throw new Error("Verification incomplete. Please try again.");
      }

      await setActive({ session: result.createdSessionId });

      const token = await getToken();
      if (!token)
        throw new Error("Failed to retrieve auth token after sign up.");

      const res = await fetch(`${API_BASE}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          goals: selectedGoals,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `Server error ${res.status}`);
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.message ||
        "Unable to verify. Please try again.";
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
              autoCapitalize="words"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name*"
              autoCapitalize="words"
              value={lastName}
              onChangeText={setLastName}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <ProsperButton
              text="Continue"
              onPress={handleCollectName}
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
              onPress={handleCollectEmail}
            />
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
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password*"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <ProsperButton
              text="Continue"
              onPress={handleCollectPassword}
            />
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
                  onPress: () => toggleGoal("Build an emergency fund"),
                },
                {
                  label: "Pay off debt",
                  onPress: () => toggleGoal("Pay off debt"),
                },
                {
                  label: "Save for a large purchase",
                  onPress: () => toggleGoal("Save for a large purchase"),
                },
                {
                  label: "Save for a small purchase",
                  onPress: () => toggleGoal("Save for a small purchase"),
                },
                {
                  label: "Plan a trip",
                  onPress: () => toggleGoal("Plan a trip"),
                },
                {
                  label: "Manage my finances",
                  onPress: () => toggleGoal("Manage my finances"),
                },
                {
                  label: "Something else",
                  onPress: () => toggleGoal("Something else"),
                },
              ]}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <ProsperButton
              text={loading ? "Sending code…" : "Continue"}
              onPress={handleStartSignUp}
            />
          </>
        );
      case "verify":
        return (
          <>
            <Text style={styles.title}>Check your email</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code we sent to {email}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Verification Code*"
              autoCapitalize="none"
              keyboardType="number-pad"
              value={otpCode}
              onChangeText={setOtpCode}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <ProsperButton
              text={loading ? "Verifying…" : "Complete Sign Up"}
              onPress={handleVerifyOtp}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ProgressHeader
        progress={stepProgress()}
        onBack={handleBack}
        onExit={onSwitchToSignIn}
      />
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
