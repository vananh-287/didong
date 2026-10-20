import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

// selectedId = null nghĩa là "Tất cả"
export default function CategoryChips({ categories, selectedId, onSelect }) {
  const all = [{ id: null, name: 'Tất cả' }, ...categories];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.scroll}
    >
      {all.map((c) => {
        const active = c.id === selectedId;
        return (
          <Pressable
            key={String(c.id)}
            onPress={() => onSelect(c.id)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{c.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  text: { color: colors.text, fontSize: 13, fontWeight: '600' },
  textActive: { color: '#fff' },
});
