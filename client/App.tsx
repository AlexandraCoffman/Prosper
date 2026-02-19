import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import ProsperButton from "./components/button";
import CalendarPicker from "./components/calendar-picker";
import Slider from "./components/slider";

export default function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/test");
        const data = await response.json();
        setMessage(data.message);
      } catch (error: any) {
        setMessage(`Error: ${error.message}`);
      }
    };

    fetchMessage();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <ProsperButton />
      <Slider />
      <CalendarPicker />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
