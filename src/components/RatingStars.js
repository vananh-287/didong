import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Hiển thị sao (hỗ trợ nửa sao). Truyền onChange để dùng làm ô chọn sao.
export default function RatingStars({ value = 0, size = 16, onChange, color = colors.star, style }) {
  return (
    <View style={[styles.row, style]}>
      {[1, 2, 3, 4, 5].map((i) => {
        let name = 'star-outline';
        if (value >= i - 0.25) name = 'star';
        else if (value >= i - 0.75) name = 'star-half';
        const icon = <Ionicons name={name} size={size} color={color} />;
        return onChange ? (
          <Pressable key={i} onPress={() => onChange(i)} hitSlop={4}>
            {icon}
          </Pressable>
        ) : (
          <View key={i}>{icon}</View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 2, alignItems: 'center' },
});
