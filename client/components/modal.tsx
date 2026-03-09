import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import ProsperButton from "./button";

export interface ModalButton {
  label: string;
  onPress: () => void;
  ghost?: boolean;
}

interface AppModalProps {
  visible: boolean;
  header: React.ReactNode;
  subheader?: React.ReactNode;
  buttons: ModalButton[];
  onDismiss?: () => void;
}

const AppModal = ({
  visible,
  header,
  subheader,
  buttons,
  onDismiss,
}: AppModalProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.content}>
                {typeof header === "string" ? (
                  <Text style={styles.headerText}>{header}</Text>
                ) : (
                  <View>{header}</View>
                )}
                {subheader != null &&
                  (typeof subheader === "string" ? (
                    <Text style={styles.subheaderText}>{subheader}</Text>
                  ) : (
                    <View style={styles.subheaderContainer}>{subheader}</View>
                  ))}
              </View>
              <View style={styles.buttonRow}>
                {buttons.map((btn, i) => (
                  <View key={i} style={styles.buttonWrapper}>
                    <ProsperButton
                      text={btn.label}
                      onPress={btn.onPress}
                      ghost={btn.ghost}
                    />
                  </View>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(27, 106, 74, 0.30)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  card: {
    width: "100%",
    backgroundColor: Colors.background,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  content: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 17,
    ...Fonts.bold,
    color: Colors.text,
    textAlign: "center",
    lineHeight: 24,
  },
  subheaderContainer: {
    marginTop: 8,
  },
  subheaderText: {
    fontSize: 13,
    ...Fonts.regular,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 1,
  },
});
