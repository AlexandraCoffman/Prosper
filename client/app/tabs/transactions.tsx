import { View, Text, StyleSheet,ScrollView, TouchableOpacity} from "react-native";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";
import { Ionicons } from '@expo/vector-icons';
import Card from "../../components/card";

const Transactions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
       
        <TouchableOpacity style={styles.headerDateContainer}>
          <Text style={styles.headerDate}>October 2025</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.headerRightSide, { alignItems: 'flex-end' }]}>
          <Ionicons name="settings-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>
         
        <ScrollView>
          <Text style={styles.title}>Transactions</Text>
          <Text style={styles.description}>
            "Check out how you're doing this month compared to previous ones!"
          </Text>
          <Card header= "Transactions" 
          body= {[{title: "Expense", desc: "date, time", value: "100"}, 
            {title: "Expense", desc: "date, time", value: "100"},
            {title: "Expense", desc: "date, time", value: "100"},
            {title: "Expense", desc: "date, time", value: "100"},
            {title: "Expense", desc: "date, time", value: "100"},
            {title: "Expense", desc: "date, time", value: "100"},
            {title: "Expense", desc: "date, time", value: "100"},
            {title: "Expense", desc: "date, time", value: "100"},
            {title: "Expense", desc: "date, time", value: "100"},
          ]}
          isNav={false}
          />
       </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 10
  },
  headerRightSide: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    ...Fonts.bold,
    color: Colors.text,
  },
  description: {
    fontSize: 15,
    marginBottom: 16,
    ...Fonts.regular,
  },
   headerDateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
   headerDate: {
    flex: 2,
    fontSize: 18,
    ...Fonts.regular,
    color: Colors.text,
    marginRight: 4,
  },
});

export default Transactions;
