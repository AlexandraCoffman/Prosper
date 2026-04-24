import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";
import LearnHeader from "../../components/learn-header";
import LearnStreakTracker from "../../components/learn-streak-tracker";
import RecommendationCard from "../../components/learn-recommendation-card";
import LearnLessonsSection from "../../components/learn-lessons-section";
import LearnVideosCarousel from "../../components/learn-videos-carousel";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

const FALLBACK_DATA: LearnData = {
  userName: "",
  streak: {
    count: 0,
    days: ["Su","Mo","Tu","We","Th","Fr","Sa"].map((label) => ({ label, completed: false })),
  },
  recommendation: { icon: "wallet-outline", title: "Budgeting 101", duration: "5 min" },
  lessons: [
    { icon: "wallet-outline",      title: "Budgeting 101",               duration: "5 min" },
    { icon: "trending-up-outline", title: "Building an Emergency Fund",  duration: "7 min" },
    { icon: "card-outline",        title: "Understanding Credit Scores", duration: "6 min" },
    { icon: "pie-chart-outline",   title: "The 50/30/20 Rule",           duration: "4 min" },
  ],
  videos: [
    { title: "How to Stop Living Paycheck to Paycheck" },
    { title: "Investing for Beginners" },
    { title: "How to Pay Off Debt Fast" },
  ],
};

export type Lesson = {
  icon: string;
  title: string;
  duration: string;
};

export type Video = {
  title: string;
  thumbnailUrl?: string;
};

export type StreakData = {
  count: number;
  days: { label: string; completed: boolean }[];
};

export type Recommendation = {
  icon: string;
  title: string;
  duration: string;
};

type LearnData = {
  userName: string;
  streak: StreakData;
  recommendation: Recommendation;
  lessons: Lesson[];
  videos: Video[];
};

async function fetchLearnData(token: string): Promise<LearnData> {
  const res = await fetch(`${BASE_URL}/api/learn`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch learn data: ${res.status}`);
  return res.json();
}

async function postCompleteLesson(token: string): Promise<{ streakCount: number }> {
  const res = await fetch(`${BASE_URL}/api/learn/complete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Failed to complete lesson: ${res.status}`);
  return res.json();
}

interface LearnProps {
  onNavigateToSettings?: () => void;
  firstName?: string | null;
}

export default function Learn({ onNavigateToSettings, firstName }: LearnProps) {
  const { getToken, isSignedIn, isLoaded } = useAuth();

  const [data, setData] = useState<LearnData | null>(null);
  const [loading, setLoading] = useState(true);

  const handleComplete = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const { streakCount } = await postCompleteLesson(token);
      setData((prev) =>
        prev
          ? {
              ...prev,
              streak: {
                ...prev.streak,
                count: streakCount,
                days: prev.streak.days.map((d, i) =>
                  i === prev.streak.days.length - 1 ? { ...d, completed: true } : d
                ),
              },
            }
          : prev
      );
    } catch (e) {
      console.error("Complete lesson error:", e);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("No auth token");
        const result = await fetchLearnData(token);
        setData(result);
      } catch (e: any) {
        console.error("Learn fetch error:", e);
        setData(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    })();
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isSignedIn) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Sign in to view your learning progress.</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Could not load Learn data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LearnHeader onNavigateToSettings={onNavigateToSettings} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Hello {firstName ?? data.userName}!</Text>
        <RecommendationCard recommendation={data.recommendation} />
        <LearnStreakTracker streak={data.streak} />
        <LearnLessonsSection lessons={data.lessons} onComplete={handleComplete} />
        <LearnVideosCarousel videos={data.videos} />
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
    paddingBottom: 40,
  },
  greeting: {
    fontSize: 24,
    ...Fonts.bold,
    color: Colors.text,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
  },
});
