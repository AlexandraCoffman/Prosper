import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";
import { ScrollView } from "react-native";
import CollapsibleMenu from "../../components/collapsible-menu";

const Accounts = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Accounts</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.accountContainer}>
          <Text>CASH</Text>
          <CollapsibleMenu
            label="Jane's Checking"
            icon="business-outline"
            acctType="Checking"
            value="600"
          />
          <CollapsibleMenu
            label="Jane's Savings"
            icon="cash-outline"
            acctType="Savings"
            value="1000"
          />
        </View>
        <View style={styles.accountContainer}>
          <Text>CREDIT CARD</Text>
          <CollapsibleMenu
            label="Quicksilver"
            icon="card-outline"
            acctType="Credit"
            value="500"
          />
          <CollapsibleMenu
            label="Travel Rewards"
            icon="card-outline"
            acctType="Credit"
            value="0"
          />
          <CollapsibleMenu
            label="PNC"
            icon="card-outline"
            acctType="Credit"
            value="100"
          />
        </View>
        <View style={styles.accountContainer}>
          <Text>INVESTMENTS</Text>
          <CollapsibleMenu
            label="Roth IRA"
            icon="trending-up-outline"
            acctType="Robinhood"
            value="15000"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 24,
  },
  header: {
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  accountContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    ...Fonts.bold,
    color: Colors.text,
  },
});

export default Accounts;
