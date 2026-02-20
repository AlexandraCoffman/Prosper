import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";

interface MeterCardProps {
  title: string;
  accountName: string;
  monthlyDeposit: number;
  amountSaved: number;
  amountRemaining: number;
  projectedCompletionDate: string;
}

const MeterCard = ({
  title,
  accountName,
  monthlyDeposit,
  amountSaved,
  amountRemaining,
  projectedCompletionDate,
}: MeterCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.accountName}>{accountName}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.amountSaved}>{amountSaved}</Text>
        <Text style={styles.amountRemaining}>{amountRemaining}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    margin: 8,
    marginLeft: 24,
    marginRight: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accountName: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountSaved: {
    fontSize: 14,
    fontWeight: "bold",
  },
  amountRemaining: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  projectedCompletionDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default MeterCard;
