import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

// Needs Card
const NeedsItem = ({ title, subtitle, amount }: { title: string; subtitle: string; amount: string }) => (
  <View style={styles.needsItem}>
    <View style={styles.needsHelpIcons}>
      <Ionicons name="help" size={16} color={Colors.text} />
    </View>
    <View style={styles.amountNeedsText}>
      <Text style={styles.classificationTitleNeeds}>{title}</Text>
      <Text style={styles.percentPaycheckNeeds}>{subtitle}</Text>
    </View>
    <Text style={styles.needsItemAmount}>{amount}</Text>
  </View>
);

export type NeedsListItem = {
  title: string;
  subtitle: string;
  amount: string;
};

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

      {/* Needs Breakdown */}
      <View style={styles.needsCardBody}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <View style={styles.separator} />}
            <NeedsItem title={item.title} subtitle={item.subtitle} amount={item.amount} />
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
    width: '90%',
    marginBottom: 10,
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
  needsHelpIcons: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  amountNeedsText: {
    flex: 1,
  },
  classificationTitleNeeds: {
    fontSize: 14,
    ...Fonts.regular,
    color: Colors.text,
  },
  percentPaycheckNeeds: {
    fontSize: 12,
    ...Fonts.regular,
    color: Colors.text,
    marginTop: 2,
  },
  needsItemAmount: {
    fontSize: 14,
    ...Fonts.regular,
    color: Colors.text,
  },
  separator: {
    height: 3,
    backgroundColor: '#FFFF',
    borderRadius: 100,
  },
});
