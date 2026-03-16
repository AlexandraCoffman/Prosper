import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

export interface CardMonthlyProps {
  id: string;
  title?: string;
  amount?: string;
  desc: string;
  recommended?: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export default function CardMonthly({
  title,
  amount,
  desc,
  recommended,
  isSelected,
  onSelect,
}: CardMonthlyProps) {
  return (
    <Pressable
      onPress={onSelect}
      style={[styles.card, isSelected && styles.selectedCard]}
    >
      <View style={styles.cardTextContent}>
        <View style={styles.cardHeader}>
          {title && <Text style={styles.cardTitle}>{title}</Text>}
          {recommended && (
            <View style={styles.recommendedAmount}>
              <View style={styles.greenDot} />
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
          )}
        </View>
        {amount && <Text style={styles.cardAmount}>{amount}</Text>}
        <Text style={styles.cardDescription}>{desc}</Text>
      </View>

      <View
        style={[
          styles.selectButtonOuter,
        ]}
      >
        {isSelected && <View style={styles.selectButtonInner} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: Colors.text,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTextContent: {
    flex: 1,
    paddingRight: 16,
  },
  cardHeader: {
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    ...Fonts.regular,
    color: Colors.text,
  },
  cardAmount: {
    fontSize: 18,
    ...Fonts.bold,
    color: Colors.text,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 13,
    ...Fonts.regular,
    color: Colors.text,
    lineHeight: 18,
  },
  recommendedAmount: {
    top: 0,
    right: -35,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4A7A59",
    marginRight: 6,
  },
  recommendedText: {
    fontSize: 12,
    ...Fonts.regular,
    color: Colors.text,
  },
  selectButtonOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: Colors.text,
    justifyContent: "center",
    alignItems: "center",
  },
  selectButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.text,
  },
});
