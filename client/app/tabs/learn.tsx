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

export default function Learn() {
  const { getToken, isSignedIn, isLoaded } = useAuth();

  const [data, setData] = useState<LearnData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    (async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("No auth token");
        const result = await fetchLearnData(token);
        setData(result);
      } catch (e: any) {
        console.error("Learn fetch error:", e);
        setError(e.message ?? "Something went wrong");
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

  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error ?? "Could not load Learn data."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LearnHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Hello {data.userName}!</Text>
        <RecommendationCard recommendation={data.recommendation} />
        <LearnStreakTracker streak={data.streak} />
        <LearnLessonsSection lessons={data.lessons} />
        <LearnVideosCarousel videos={data.videos} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  greeting: {
    fontSize: 20,
    ...Fonts.regular,
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
