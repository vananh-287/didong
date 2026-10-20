import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from './Badge';
import { colors, shadow } from '../theme';
import { formatPrice } from '../utils/format';

export default function BookCard({ book, width, onPress, onAddToCart }) {
  const [imgError, setImgError] = useState(false);
  const soldOut = book.stock <= 0;

  return (
    <Pressable onPress={() => onPress?.(book)} style={[styles.card, { width }]}>
      <View style={styles.coverWrap}>
        {imgError ? (
          <View style={[styles.cover, styles.coverFallback]}>
            <Ionicons name="book-outline" size={36} color={colors.muted} />
          </View>
        ) : (
          <Image
            source={{ uri: book.image }}
            style={styles.cover}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        )}
        {soldOut ? <Badge label="Hết hàng" color={colors.muted} style={styles.badge} /> : null}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>{formatPrice(book.price)}</Text>
          {onAddToCart ? (
            <Pressable
              onPress={() => onAddToCart(book)}
              hitSlop={6}
              style={[styles.addBtn, soldOut && { opacity: 0.4 }]}
              disabled={soldOut}
            >
              <Ionicons name="add" size={18} color="#fff" />
            </Pressable>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 14, marginBottom: 14, overflow: 'hidden', ...shadow },
  coverWrap: { position: 'relative' },
  cover: { width: '100%', aspectRatio: 3 / 4, backgroundColor: colors.border },
  coverFallback: { alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 8, left: 8, height: 20, borderRadius: 10 },
  info: { padding: 10 },
  title: { fontSize: 14, fontWeight: '700', color: colors.text, minHeight: 38 },
  author: { fontSize: 12, color: colors.muted, marginTop: 2 },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  price: { fontSize: 14, fontWeight: '800', color: colors.indigo },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
