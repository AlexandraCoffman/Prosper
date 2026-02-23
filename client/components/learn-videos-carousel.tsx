import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";

const VIDEOS = [
  {
    image: require("../assets/video_thumbnail_1.png"),
    title: "Budgeting your summer internship for the year",
  },
  {
    image: require("../assets/video_thumbnail_2.png"),
    title: "Setting up your first investment account",
  },
  {
    image: require("../assets/video_thumbnail_3.png"),
    title: "Ways to save for those short term goals",
  },
  {
    image: require("../assets/video_thumbnail_4.png"),
    title: "Budgeting your paycheck for healthy grocery costs",
  },
  {
    image: require("../assets/video_thumbnail_5.png"),
    title: "Best way to manage school and work",
  },
];

export default function LearnVideosCarousel() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Videos</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {VIDEOS.map((video, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Image source={video.image} style={styles.thumbnail} />
            <View style={styles.cardBody}>
              <Ionicons
                name="play-circle-outline"
                size={22}
                color={Colors.text}
                style={styles.playIcon}
              />
              <Text style={styles.videoTitle}>{video.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Carousel dots */}
      <View style={styles.dotsRow}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    ...Fonts.regular,
    color: Colors.text,
    marginLeft: 30,
    marginBottom: 10,
  },
  scrollContent: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  card: {
    backgroundColor: Colors.accent2,
    borderRadius: 20,
    width: 160,
    marginRight: 12,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardBody: {
    padding: 8,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  playIcon: {
    marginRight: 6,
    marginTop: 1,
  },
  videoTitle: {
    flex: 1,
    fontSize: 13,
    ...Fonts.regular,
    color: Colors.text,
    lineHeight: 18,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: Colors.primary,
  },
});
