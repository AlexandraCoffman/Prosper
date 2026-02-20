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
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text>{accountName}</Text>
        <Text>Monthly Deposit: {monthlyDeposit}</Text>
        <Text>Amount Saved: {amountSaved}</Text>
        <Text>Amount Remaining: {amountRemaining}</Text>
        <Text>Projected Completion Date: {projectedCompletionDate}</Text>
      </View>
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
  content: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
});

export default MeterCard;
