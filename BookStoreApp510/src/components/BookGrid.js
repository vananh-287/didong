import React from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import BookCard from './BookCard';

const SIDE = 16;

// Lưới 2 cột dùng chung cho Home (và các màn danh sách sách khác)
export default function BookGrid({
  books,
  onPressBook,
  onAddToCart,
  ListEmptyComponent,
  ListHeaderComponent,
}) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - SIDE * 3) / 2;

  return (
    <FlatList
      data={books}
      keyExtractor={(b) => String(b.id)}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: SIDE }}
      contentContainerStyle={{ paddingTop: 4, paddingBottom: 110, flexGrow: 1 }}
      renderItem={({ item }) => (
        <BookCard book={item} width={cardWidth} onPress={onPressBook} onAddToCart={onAddToCart} />
      )}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    />
  );
}
