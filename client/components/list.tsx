import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

export type NeedsListItem = {
  title: string;
  subtitle: string;
  amount: string;
  iconName?: any;
  iconType?: 'Ionicons' | 'Octicons' | 'MaterialCommunityIcons';
};

const NeedsItem = ({ 
  title, 
  subtitle, 
  amount, 
  iconName, 
  iconType = 'Ionicons' 
}: NeedsListItem) => (
  <View style={styles.needsItem}>
    <View style={styles.iconCircle}>
      {iconType === 'Octicons' ? (
        <Octicons name={iconName} size={18} color={Colors.text} />
      ) : iconType === 'MaterialCommunityIcons' ? (
        <MaterialCommunityIcons name={iconName} size={20} color={Colors.text} />
      ) : (
        <Ionicons name={iconName || "help"} size={20} color={Colors.text} />
      )}
    </View>
    <View style={styles.amountNeedsText}>
      <Text style={styles.classificationTitleNeeds}>{title}</Text>
      <Text style={styles.percentPaycheckNeeds}>{subtitle}</Text>
    </View>
    <Text style={styles.needsItemAmount}>{amount}</Text>
  </View>
);

type ListProps = {
  title?: string;
  items: NeedsListItem[];
};

export default function List({ title = 'Needs', items }: ListProps) {
  return (
    <View style={styles.needsCardExpand}>
      <TouchableOpacity style={styles.needsCardHeader}>
        <Text style={styles.needsCardTitle}>{title}</Text>
        <Ionicons name="chevron-forward" size={18} color={Colors.text} />
      </TouchableOpacity>

      <View style={styles.needsCardBody}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <View style={styles.separator} />}
            <NeedsItem 
              title={item.title} 
              subtitle={item.subtitle} 
              amount={item.amount} 
              iconName={item.iconName}
              iconType={item.iconType}
            />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  needsCardExpand: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    width: '100%',
    marginBottom: 25,
    overflow: 'hidden',
  },
  needsCardHeader: {
    backgroundColor: Colors.accent2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  needsCardBody: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  needsCardTitle: {
    fontSize: 16,
    ...Fonts.regular,
    color: Colors.text,
  },
  needsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  amountNeedsText: {
    flex: 1,
  },
  classificationTitleNeeds: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
  },
  percentPaycheckNeeds: {
    fontSize: 13,
    ...Fonts.regular,
    color: Colors.text,
    opacity: 0.7,
    marginTop: 2,
  },
  needsItemAmount: {
    fontSize: 15,
    ...Fonts.regular,
    color: Colors.text,
  },
  separator: {
    height: 2,
    backgroundColor: Colors.background,
    marginVertical: 4,
  },
});