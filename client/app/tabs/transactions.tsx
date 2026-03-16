import { View, Text, TextInput, StyleSheet,ScrollView, TouchableOpacity, Modal} from "react-native";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";
import { Ionicons } from '@expo/vector-icons';
import Card from "../../components/card";
import { CreateTransactionButton } from "../../components/button";
import { MultiSelectButtons } from "../../components/multi-select-buttons";
import React, {useState} from 'react';

const Transactions = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [nameText, onChangeNameText] = React.useState('Name*');
  const [amount, onChangeAmount] = React.useState('');
  const [date, onChangeDate] = React.useState('');

  function SubmitTransaction(){
  }

  return (
    
    <View style={styles.container}>
      <Modal
          animationType="slide"
          transparent={false}
          backdropColor ={"#c8e0c420"}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style = {styles.centeredPopUp}>
            <View style = {styles.modalView}>
              <View style={[styles.header, {paddingTop : 5, alignItems: "flex-start"}]}>
                <Text style={styles.title }>Add Transaction</Text>
                <TouchableOpacity style={{paddingLeft: 90}}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Ionicons name="close-outline" size={24} color={Colors.text}  />
                </TouchableOpacity>
              </View>
                <TextInput
                  onChangeText={onChangeNameText}
                  value={nameText}
                  style = {styles.textInputBox}
                />
                <TextInput
                  onChangeText={onChangeAmount}
                  value={amount}
                  placeholder="Amount*"
                  keyboardType="numeric"
                  style = {styles.textInputBox}
                />
                <TextInput
                  onChangeText={onChangeDate}
                  value={date}
                  placeholder="Date*"
                  style = {styles.textInputBox}
                />
                <MultiSelectButtons title = "Transaction Type" button1="Debit" button2 ="Credit" button3 = "Savings"/>
                <MultiSelectButtons title = "Category" button1="Need" button2 ="Want" button3 = "Saving"/>
              <CreateTransactionButton onPress={() => {}} />
            </View>
          </View>
        </Modal>
      <View style={styles.header}>
      
        <TouchableOpacity style={styles.headerDateContainer}>
          <Text style={styles.headerDate}>October 2025</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.headerRightSide, { alignItems: 'flex-end' }]}>
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
         
        <ScrollView>
          <Text style={styles.title}>Transactions</Text>
            <Text style={[styles.description, {flex: 1}]}>
              "Check out how you're doing this month compared to previous ones!"
            </Text>

          <View style = {[{flexDirection: "row",justifyContent: 'flex-end',  alignItems: 'flex-end'}]}> 
           <TouchableOpacity style={{paddingRight: 5}} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle-outline"  size={26} color={Colors.text} flex={2}/>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingRight: 5}}>
              <Ionicons name="funnel-outline" size={26} color={Colors.text} flex={2}/>
            </TouchableOpacity>
           </View>
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
    alignItems: "flex-start",
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
    alignItems: "flex-start", 
    fontSize: 15,
    paddingRight: 20,
    ...Fonts.regular,
  },
   headerDateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
   headerDate: {
    flex: .75,
    fontSize: 18,
    ...Fonts.regular,
    color: Colors.text,
    marginRight: 4,
  },
  descContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "flex-start",
    paddingTop: 10,
  },
  centeredPopUp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInputBox: {
    height: 45,
    width: 300,
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.accent,
  },
});

export default Transactions;
