import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Budget() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Budget</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontFamily: "serif",
  },
});