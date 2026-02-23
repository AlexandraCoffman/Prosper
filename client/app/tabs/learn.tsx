import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import LearnHeader from "../../components/learn-header";
import RecommendationCard from "../../components/learn-recommendation-card";
import LearnStreakTracker from "../../components/learn-streak-tracker";
import LearnLessonsSection from "../../components/learn-lessons-section";
import LearnVideosCarousel from "../../components/learn-videos-carousel";

export default function Learn() {
  return (
    <View style={styles.container}>
      <LearnHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <RecommendationCard />
        <LearnStreakTracker />
        <LearnLessonsSection />
        <LearnVideosCarousel />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
});
