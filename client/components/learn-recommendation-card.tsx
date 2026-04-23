import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import type { Recommendation } from "../app/(tabs)/learn";

type Props = {
  recommendation: Recommendation;
};

export default function RecommendationCard({ recommendation }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Recommendation</Text>
      <View style={styles.row}>
        <View style={styles.iconCircle}>
          <Ionicons
            name={recommendation.icon as any}
            size={18}
            color={Colors.text}
          />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.lessonTitle}>{recommendation.title}</Text>
          <Text style={styles.duration}>{recommendation.duration}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.accent2,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    ...Fonts.regular,
    color: Colors.text,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textBlock: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
  },
  duration: {
    fontSize: 12,
    ...Fonts.regular,
    color: Colors.text,
    marginTop: 4,
  },
});
