import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { Fonts } from "../styles/fonts";
import { Colors } from "../styles/colors";

interface SettingsProps {
  onBack?: () => void;
}

const Settings = ({ onBack }: SettingsProps) => {
  const { signOut } = useClerk();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {onBack ? (
            <Pressable onPress={onBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: Colors.secondary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: Colors.text, fontSize: 18, ...Fonts.bold }}>
              JD
            </Text>
          </View>
          <View style={styles.profileContainer}>
            <Text style={{ ...Fonts.regular, fontSize: 18 }}>Jane Doe</Text>
            <Text style={{ ...Fonts.regular, fontSize: 14 }}>
              jane.doe@example.com
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 8,
            margin: 16,
          }}
          onPress={() => { signOut(); onBack?.(); }}
        >
          <Text
            style={{
              color: Colors.text,
              fontSize: 18,
              textAlign: "center",
              ...Fonts.bold,
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "500",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    ...Fonts.bold,
  },
  description: {
    fontSize: 15,
    marginBottom: 16,
    ...Fonts.regular,
  },
  pieChartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
  },
  profileContainer: {
    marginLeft: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
export default Settings;
