import React from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import useCart from '../hooks/useCart';
import { formatPrice } from '../utils/format';
import { colors, shadow } from '../theme';

export default function CartScreen({ navigation }) {
  const { items, totalQuantity, totalPrice, updateQuantity, removeFromCart } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.thumb} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.qtyRow}>
          <Pressable
            style={[styles.qtyBtn, item.quantity <= 1 && { opacity: 0.4 }]}
            disabled={item.quantity <= 1}
            onPress={() => updateQuantity(item.bookId, item.quantity - 1)}
          >
            <Ionicons name="remove" size={16} color={colors.text} />
          </Pressable>
          <Text style={styles.qty}>{item.quantity}</Text>
          <Pressable
            style={[styles.qtyBtn, item.quantity >= item.stock && { opacity: 0.4 }]}
            disabled={item.quantity >= item.stock}
            onPress={() => updateQuantity(item.bookId, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color={colors.text} />
          </Pressable>
        </View>
      </View>
      <Pressable onPress={() => removeFromCart(item.bookId)} hitSlop={8} style={{ padding: 4 }}>
        <Ionicons name="trash-outline" size={20} color={colors.danger} />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Giỏ hàng" />
      {items.length === 0 ? (
        <EmptyState
          icon="cart-outline"
          title="Giỏ hàng của bạn đang trống"
          message="Hãy chọn vài cuốn sách yêu thích nhé!"
          actionLabel="Khám phá sách"
          onAction={() => navigation.navigate('Home')}
        />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => String(i.bookId)}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16 }}
          />
          <View style={styles.summary}>
            <View style={styles.sumRow}>
              <Text style={styles.sumLabel}>Tổng ({totalQuantity} sản phẩm)</Text>
              <Text style={styles.sumTotal}>{formatPrice(totalPrice)}</Text>
            </View>
            <Button
              title="Thanh toán"
              onPress={() => navigation.navigate('Checkout', { total: totalPrice })}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    ...shadow,
  },
  thumb: { width: 60, height: 80, borderRadius: 8, backgroundColor: colors.border },
  title: { fontSize: 14, fontWeight: '700', color: colors.text },
  price: { fontSize: 14, fontWeight: '800', color: colors.indigo, marginTop: 4 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 12 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { fontSize: 15, fontWeight: '700', minWidth: 20, textAlign: 'center' },
  summary: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...shadow,
  },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sumLabel: { fontSize: 14, color: colors.muted },
  sumTotal: { fontSize: 18, fontWeight: '800', color: colors.text },
});
