import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";
import { Ionicons } from '@expo/vector-icons';
import Card from "../../components/card";
import { CreateTransactionButton } from "../../components/button";
import { MultiSelectButtons } from "../../components/multi-select-buttons";
import React, { useState, useEffect } from 'react';
import { useAuth } from "@clerk/clerk-expo";

const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

interface Transaction {
  _id: string;
  name: string;
  date: string;
  amount: number;
  type: string;
  category: string;
}

interface TransactionsProps {
  onNavigateToSettings?: () => void;
}

const Transactions = ({ onNavigateToSettings }: TransactionsProps) => {
  const { getToken, isSignedIn } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [nameText, onChangeNameText] = useState('Name*');
  const [amount, onChangeAmount] = useState('');
  const [date, onChangeDate] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function SubmitTransaction() {
  }

  useEffect(() => {
    if (!isSignedIn) {
      setIsLoading(false);
      return;
    }
    const fetchTransactions = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await fetch(`${API_BASE}/api/transactions/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setTransactions(data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [isSignedIn]);

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

        <TouchableOpacity style={[styles.headerRightSide, { alignItems: 'flex-end' }]} onPress={onNavigateToSettings}>
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
         
        <ScrollView>
          <Text style={styles.title}>Transactions</Text>
            <Text style={[styles.description, {flex: 1}]}>
              Check out how you're doing this month compared to previous ones!
            </Text>

          <View style={[{flexDirection: "row", justifyContent: 'flex-end', alignItems: 'flex-end'}]}>
           <TouchableOpacity style={{paddingRight: 5}} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle-outline" size={26} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={{paddingRight: 5}}>
              <Ionicons name="funnel-outline" size={26} color={Colors.text} />
            </TouchableOpacity>
           </View>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
          ) : transactions.length === 0 ? (
            <Text style={[styles.description, { textAlign: 'center', marginTop: 40 }]}>
              No transactions yet.
            </Text>
          ) : (
            <Card
              header="Transactions"
              body={transactions.map((t) => ({
                title: t.name,
                desc: new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                value: t.type === "Credit"
                  ? `+$${t.amount.toFixed(2)}`
                  : `-$${t.amount.toFixed(2)}`,
              }))}
              isNav={false}
            />
          )}
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
