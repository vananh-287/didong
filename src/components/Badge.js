import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Badge tròn hiển thị số (count) hoặc nhãn chữ (label). Vị trí do component cha quyết định.
export default function Badge({ count, label, color = colors.danger, style }) {
  if (label == null && !count) return null;
  const text = label != null ? label : count > 99 ? '99+' : String(count);
  return (
    <View style={[styles.badge, { backgroundColor: color }, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
