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

type ForgotPasswordScreenProps = {
  onBack: () => void;
};

type Step = "request" | "verify" | "reset";

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
}) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestCode = async () => {
    if (!isLoaded || loading) return;
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setStep("verify");
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.message ||
        "Could not send reset email. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!isLoaded || loading) return;
    if (!code) {
      setError("Please enter the verification code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
      });

      if (result.status === "needs_new_password") {
        setStep("reset");
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.message ||
        "Invalid code. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!isLoaded || loading) return;
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signIn!.resetPassword({ password: newPassword });
      if (result.createdSessionId) {
        await setActive!({ session: result.createdSessionId });
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.message ||
        "Could not reset password. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (step === "request") {
      return (
        <>
          <Text style={styles.subtitle}>
            Enter the email address associated with your account and we'll send
            you a reset code.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address*"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <ProsperButton
              text={loading ? "Sending…" : "Send Reset Code"}
              onPress={handleRequestCode}
            />
          </View>
        </>
      );
    }

    if (step === "verify") {
      return (
        <>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{" "}
            <Text style={styles.emailHighlight}>{email}</Text>. Enter it below.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Verification Code*"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <ProsperButton
              text={loading ? "Verifying…" : "Verify Code"}
              onPress={handleVerifyCode}
            />
          </View>
          <TouchableOpacity onPress={handleRequestCode} disabled={loading}>
            <Text style={styles.resendLink}>Resend code</Text>
          </TouchableOpacity>
        </>
      );
    }

    return (
      <>
        <Text style={styles.subtitle}>
          Choose a new password for your account.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="New Password*"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password*"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.buttonContainer}>
          <ProsperButton
            text={loading ? "Saving…" : "Reset Password"}
            onPress={handleResetPassword}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Reset password</Text>
      {renderStep()}
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 64,
    backgroundColor: Colors.background,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 15,
    color: Colors.textSecondary,
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
  emailHighlight: {
    color: Colors.text,
    fontFamily: "Libre Caslon Text Bold",
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
    marginTop: 4,
    marginBottom: 12,
  },
  resendLink: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
    textDecorationLine: "underline",
  },
  error: {
    color: "#DC2626",
    fontSize: 13,
    marginBottom: 4,
  },
});
