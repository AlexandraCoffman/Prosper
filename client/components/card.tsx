import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";

interface CardBodyItem {
  title: string;
  desc: string;
  value: string;
}

interface CardProps {
  header: string;
  body: CardBodyItem[];
  isNav?: boolean;
  isAdd?: boolean;
  onPress?: () => void;
}

const Card = ({ header, body, isNav, isAdd, onPress }: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{header}</Text>
        {isNav && (
          <Ionicons name="chevron-forward" size={18} color={Colors.text} />
        )}
        {isAdd && (
          <Ionicons name="add-circle-outline" size={18} color={Colors.text} />
        )}
      </View>
      <View style={styles.bodyContainer}>
        {body.map((item: CardBodyItem, index: number) => (
          <>
            <View style={styles.itemContainer}>
              <View style={styles.itemHeaderContainer}>
                <View style={styles.iconContainer}>
                  <Ionicons name="help" size={18} color={Colors.text} />
                </View>
                <View style={styles.itemContentContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
              </View>
              <View style={styles.itemValueContainer}>
                <Text style={styles.itemValue}>{item.value}</Text>
                {isAdd && (
                  <Pressable onPress={onPress}>
                    <Ionicons
                      name="square-outline"
                      size={18}
                      color={Colors.text}
                    />
                  </Pressable>
                )}
              </View>
            </View>
            {index < body.length - 1 && <View style={styles.separator} />}
          </>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: Colors.background,
    borderRadius: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "90%",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: Colors.accent2,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 16,
    ...Fonts.regular,
    color: Colors.text,
  },
  bodyContainer: {
    backgroundColor: Colors.accent,
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemContentContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: 16,
    ...Fonts.regular,
    color: Colors.text,
  },
  itemDesc: {
    fontSize: 14,
    ...Fonts.regular,
    color: Colors.text,
  },
  itemValue: {
    fontSize: 14,
    ...Fonts.regular,
    color: Colors.text,
  },
  itemValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  separator: {
    height: 3,
    backgroundColor: Colors.background,
    marginVertical: 16,
  },
});

export default Card;
