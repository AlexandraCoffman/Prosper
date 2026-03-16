import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

export const MultiSelectButtons = ({title, button1, button2, button3}: {title:string, button1:string, button2:string, button3:string}) => {
    return(
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity  style={styles.createButton}>
                    <Text style={styles.createButtonText}>{button1}</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.createButton}>
                    <Text style={styles.createButtonText}>{button2}</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.createButton}>
                    <Text style={styles.createButtonText}>{button3}</Text>
                </TouchableOpacity>
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
})