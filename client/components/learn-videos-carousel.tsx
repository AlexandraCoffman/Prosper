import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import type { Video } from "../app/tabs/learn";

const CARD_WIDTH = 168;
const CARD_GAP = 20;

const THUMBNAILS = [
  require("../assets/video_thumbnail_1.png"),
  require("../assets/video_thumbnail_2.png"),
  require("../assets/video_thumbnail_3.png"),
  require("../assets/video_thumbnail_4.png"),
  require("../assets/video_thumbnail_5.png"),
];

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
            <Image
              source={THUMBNAILS[index % THUMBNAILS.length]}
              style={styles.thumbnail}
            />
            <View style={styles.titleRow}>
              <Text style={styles.videoTitle}>
                {video.title}
              </Text>
              <Image source={require("../assets/play.png")} style={styles.playIcon} />
            </View>
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
    backgroundColor: Colors.accent2,
  },
  thumbnail: {
    width: CARD_WIDTH,
    height: 110,
    backgroundColor: Colors.accent2,
    borderRadius: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  playIcon: {
    width: 16,
    height: 16,
  },
  videoTitle: {
    flex: 1,
    fontSize: 13,
    ...Fonts.regular,
    color: Colors.text,
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
