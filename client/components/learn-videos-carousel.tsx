import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import type { Video } from "../app/tabs/learn";

const CARD_WIDTH = 168;
const CARD_GAP = 20;

type Props = {
  videos: Video[];
};

export default function LearnVideosCarousel({ videos }: Props) {
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    const page = Math.round(x / (CARD_WIDTH + CARD_GAP));
    setActivePage(page);
  };

  const totalDots = Math.min(3, videos.length);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videos</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_GAP}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {videos.map((video, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.thumbnail} />
            <Text style={styles.videoTitle} numberOfLines={2}>
              {video.title}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsRow}>
        {Array.from({ length: totalDots }).map((_, dot) => (
          <View
            key={dot}
            style={[styles.dot, activePage === dot && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    ...Fonts.regular,
    color: Colors.text,
    marginBottom: 12,
    marginLeft: 4,
  },
  scrollContent: {
    paddingRight: 20,
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.accent,
  },
  thumbnail: {
    width: CARD_WIDTH,
    height: 110,
    backgroundColor: Colors.accent2,
    borderRadius: 12,
  },
  videoTitle: {
    fontSize: 13,
    ...Fonts.regular,
    color: Colors.text,
    padding: 8,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent2,
  },
  dotActive: {
    backgroundColor: Colors.primary,
  },
});
