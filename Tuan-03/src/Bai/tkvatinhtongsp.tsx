import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
} from 'react-native';

const products = [
  { id: '1', name: 'Áo thun', price: 200000 },
  { id: '2', name: 'Quần jean', price: 450000 },
  { id: '3', name: 'Giày thể thao', price: 800000 },
];

export default function BaiTimKiemSanPham() {
  const [keyword, setKeyword] = useState('');

  // Lọc sản phẩm
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword]);

  // Tính tổng giá
  const totalPrice = useMemo(() => {
    return filteredProducts.reduce(
      (total, product) => total + product.price,
      0
    );
  }, [filteredProducts]);

  // Chọn sản phẩm
  const handleSelect = useCallback((product: any) => {
    console.log('Đã chọn:', product.name);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm sản phẩm</Text>

      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập tên sản phẩm..."
        placeholderTextColor="#888888"
      />

      <Text style={styles.total}>
        Tổng giá: {totalPrice.toLocaleString('vi-VN')}đ
      </Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text style={styles.productName}>{item.name}</Text>

            <Text style={styles.price}>
              {item.price.toLocaleString('vi-VN')}đ
            </Text>

            <Button
              title="Chọn"
              onPress={() => handleSelect(item)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Không tìm thấy sản phẩm
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 5,
    padding: 12,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },

  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },

  product: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
  },

  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },

  price: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },

  empty: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    marginTop: 30,
  },
});