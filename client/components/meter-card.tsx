import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import SmallPieChart from "./small-pie-chart";
import AppModal from "./modal";

interface MeterCardProps {
  title: string;
  accountName: string;
  monthlyDeposit: number;
  amountSaved: number;
  amountRemaining: number;
  projectedCompletionDate: string;
  onRename?: (newTitle: string) => void;
  onDelete?: () => void;
}

const MeterCard = ({
  title,
  accountName,
  monthlyDeposit,
  amountSaved,
  amountRemaining,
  projectedCompletionDate,
  onRename,
  onDelete,
}: MeterCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmRename = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== title) {
      onRename?.(trimmed);
    } else {
      setEditText(title);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(title);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SmallPieChart
          amountSaved={amountSaved}
          amountRemaining={amountRemaining}
        />
        <View style={styles.titleRow}>
          {isEditing ? (
            <TextInput
              style={styles.titleInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              onSubmitEditing={handleConfirmRename}
              returnKeyType="done"
            />
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
        </View>
        <View style={styles.actions}>
          {isEditing ? (
            <>
              <TouchableOpacity
                onPress={handleConfirmRename}
                style={styles.actionButton}
              >
                <Ionicons name="checkmark" size={20} color={Colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancelEdit}
                style={styles.actionButton}
              >
                <Ionicons name="close" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  setEditText(title);
                  setIsEditing(true);
                }}
                style={styles.actionButton}
              >
                <Ionicons
                  name="pencil-outline"
                  size={17}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowDeleteModal(true)}
                style={styles.actionButton}
              >
                <Ionicons
                  name="trash-outline"
                  size={17}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.details}>
          <Text style={styles.detailText}>{accountName}</Text>
          <Text style={styles.detailText}>
            Monthly Deposit: ${monthlyDeposit}
          </Text>
          <Text style={styles.detailText}>Amount Saved: ${amountSaved}</Text>
          <Text style={styles.detailText}>
            Amount Remaining: ${amountRemaining}
          </Text>
          <Text style={styles.detailText}>
            Projected: {projectedCompletionDate}
          </Text>
        </View>
      </View>

      <AppModal
        visible={showDeleteModal}
        onDismiss={() => setShowDeleteModal(false)}
        header={
          <Text style={styles.modalHeader}>
            Are you sure you want to{" "}
            <Text style={styles.modalHeaderBold}>delete</Text> your savings
            goal?
          </Text>
        }
        subheader="This action cannot be undone"
        buttons={[
          {
            label: "Cancel",
            ghost: true,
            onPress: () => setShowDeleteModal(false),
          },
          {
            label: "Delete",
            onPress: () => {
              setShowDeleteModal(false);
              onDelete?.();
            },
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    padding: 16,
    margin: 8,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  titleRow: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    ...Fonts.bold,
  },
  titleInput: {
    fontSize: 18,
    ...Fonts.bold,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingVertical: 2,
    color: Colors.text,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionButton: {
    padding: 4,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    flex: 1,
    gap: 4,
    marginRight: 12,
  },
  detailText: {
    fontSize: 13,
    color: Colors.text,
    ...Fonts.regular,
  },
  modalHeader: {
    fontSize: 17,
    ...Fonts.regular,
    color: Colors.text,
    textAlign: "center",
    lineHeight: 24,
  },
  modalHeaderBold: {
    ...Fonts.bold,
    color: Colors.text,
  },
});

export default MeterCard;
