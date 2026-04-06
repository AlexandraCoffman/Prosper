import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

export const MultiSelectButtons = ({title, button1, button2, button3, isSelected, onSelect,}: 
    {title:string, button1:string, button2:string, button3:string, isSelected: string, onSelect: (x:string) => void}) => {
    return(
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.buttonRow}>
                <Pressable onPress={() => onSelect(button1)} style={[styles.createButton, isSelected=== button1 && styles.selectedButton]}>
                    <Text style={styles.createButtonText}>{button1}</Text>
                </Pressable>
                <Pressable  onPress={() => onSelect(button2)} style={[styles.createButton, isSelected=== button2 && styles.selectedButton]}>
                    <Text style={styles.createButtonText}>{button2}</Text>
                </Pressable>
                <Pressable onPress={() => onSelect(button3)} style={[styles.createButton, isSelected=== button3 && styles.selectedButton]}>
                    <Text style={styles.createButtonText}>{button3}</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default MultiSelectButtons;

const styles = StyleSheet.create({
    header:{
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "flex-start",
        padding:20,
        paddingTop: 5,
        paddingBottom: 5
    },
    title: {
        fontSize: 18,
        ...Fonts.bold,
        color: Colors.text,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "flex-start",
        padding: 20,
        paddingTop: 5,
        paddingBottom: 15
    },
  createButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    borderRadius: 30,
    width: "30%",
    alignItems: "center",
    alignSelf: "center",
  },
  createButtonText: {
    fontSize: 14,
    ...Fonts.regular,
    color: Colors.text,
  },
  selectedButton: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.text,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
})