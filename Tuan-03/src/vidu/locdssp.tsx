import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

const ProductItem = memo(function ProductItem({ item, onSelect }) {
  return (
    <Button
      title={`${item.name} - ${item.price.toLocaleString('vi-VN')}đ`}
      onPress={() => onSelect(item)}
    />
  );
});

export default function ProductScreen() {
  const [keyword, setKeyword] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const products = useMemo(
    () => [
      { id: '1', name: 'Điện thoại', price: 12000000 },
      { id: '2', name: 'Máy tính bảng', price: 9000000 },
      { id: '3', name: 'Tai nghe', price: 1500000 },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return products.filter(product =>
      product.name.toLowerCase().includes(normalizedKeyword)
    );
  }, [keyword, products]);

  const handleSelectProduct = useCallback(product => {
    setSelectedName(product.name);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm sản phẩm"
        style={styles.input}
      />

      <Text>Sản phẩm đã chọn: {selectedName || 'Chưa chọn'}</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={handleSelectProduct} />
        )}
        ListEmptyComponent={<Text>Không tìm thấy sản phẩm</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 24,
    backgroundColor: '#fff',

  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    padding: 12,
  },
});
