import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../styles/colors";
import { Fonts } from "../styles/fonts";
import { Ionicons, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface CardBodyItem {
  title: string;
  desc: string;
  value: string;
  iconName?: any; 
  iconType?: 'Ionicons' | 'Octicons' | 'MaterialCommunityIcons';
}

interface CardProps {
  header?: string;
  body: CardBodyItem[];
  isNav?: boolean;
  isAdd?: boolean;
  onItemPress?: (index: number) => void;
  selectedIndexes?: number[];
  isCentered?: boolean;
}

const Card = ({ 
  header, 
  body, 
  isNav, 
  isAdd, 
  onItemPress, 
  selectedIndexes = [],
  isCentered = false 
}: CardProps) => {
  return (
    <View style={styles.container}>
      {header && (
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{header}</Text>
          {isNav && <Ionicons name="chevron-forward" size={18} color={Colors.text} />}
          {isAdd && <Ionicons name="add-circle-outline" size={25} color={Colors.text} />}
        </View>
      )}

      <View style={styles.bodyContainer}>
        {body.map((item: CardBodyItem, index: number) => {
          const isChecked = selectedIndexes.includes(index);
          
          return (
            <View key={index}>
              <View style={styles.itemContainer}>
                <View style={styles.itemHeaderContainer}>
                  <View style={styles.iconContainer}>
                    {item.iconType === 'Octicons' ? (
                      <Octicons name={item.iconName} size={22} color={Colors.text} />
                    ) : item.iconType === 'MaterialCommunityIcons' ? (
                      <MaterialCommunityIcons name={item.iconName} size={25} color={Colors.text} />
                    ) : (
                      <Ionicons name={item.iconName || "cash-outline"} size={25} color={Colors.text} />
                    )}
                  </View>
                  
                  <View style={[
                    styles.itemContentContainer, 
                    isCentered && { justifyContent: 'center' }
                  ]}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    {!isCentered && item.desc ? (
                      <Text style={styles.itemDesc}>{item.desc}</Text>
                    ) : null}
                  </View>
                </View>

                <View style={styles.itemValueContainer}>
                  <Text style={styles.itemValue}>{item.value}</Text>
                  {isAdd && (
                    <Pressable onPress={() => onItemPress?.(index)}>
                      <Ionicons
                        name={isChecked ? "checkbox" : "square-outline"}
                        size={22}
                        color={Colors.text}
                      />
                    </Pressable>
                  )}
                </View>
              </View>
              {index < body.length - 1 && <View style={styles.separator} />}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    backgroundColor: Colors.background,
    borderRadius: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "100%",
    overflow: "hidden",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: Colors.accent2,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 18,
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
    width: "100%",
    minHeight: 45,
  },
  itemHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
  itemContentContainer: {
    flexDirection: "column",
    flex: 1,
    height: '100%',
  },
  itemTitle: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
  },
  itemDesc: {
    fontSize: 12,
    ...Fonts.regular,
    color: Colors.text,
    opacity: 0.8,
  },
  itemValue: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
  },
  itemValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  separator: {
    height: 2,
    backgroundColor: Colors.background,
    marginVertical: 12,
  },
});

export default Card;