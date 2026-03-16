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
          <CollapsibleMenu />
          <CollapsibleMenu />
        </View>
        <View style={styles.accountContainer}>
          <Text>CREDIT CARD</Text>
          <CollapsibleMenu />
          <CollapsibleMenu />
          <CollapsibleMenu />
        </View>
        <View style={styles.accountContainer}>
          <Text>INVESTMENTS</Text>
          <CollapsibleMenu />
          <CollapsibleMenu />
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
