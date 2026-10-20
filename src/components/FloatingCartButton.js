import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from './Badge';
import useCart from '../hooks/useCart';
import { colors, shadow } from '../theme';

// Nút giỏ hàng nổi, badge lấy tổng số lượng từ store
export default function FloatingCartButton({ onPress }) {
  const { totalQuantity } = useCart();
  return (
    <Pressable onPress={onPress} style={styles.fab}>
      <Ionicons name="cart" size={26} color="#fff" />
      <Badge count={totalQuantity} style={styles.badge} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.indigo,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  badge: { position: 'absolute', top: -2, right: -2, borderWidth: 2, borderColor: colors.bg },
});
