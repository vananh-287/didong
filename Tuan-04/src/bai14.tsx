import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}

type Product = {
  id: number;
  name: string;
  price: number;
};

const allProducts: Product[] = [
  { id: 1, name: "iPhone 15", price: 999 },
  { id: 2, name: "Samsung Galaxy S24", price: 899 },
  { id: 3, name: "Xiaomi 14", price: 699 },
  { id: 4, name: "Google Pixel 8", price: 799 },
  { id: 5, name: "Oppo Find X7", price: 599 },
  { id: 6, name: "MacBook Air", price: 1099 },
  { id: 7, name: "iPad Pro", price: 899 },
  { id: 8, name: "Dell XPS 15", price: 1299 },
  { id: 9, name: "Lenovo ThinkPad", price: 999 },
  { id: 10, name: "Asus ROG", price: 1499 },
];

function getProducts(
  page: number,
  limit: number
): ApiResponse<Product> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const products = allProducts.slice(startIndex, endIndex);

  return {
    data: products,
    total: allProducts.length,
    page: page,
  };
}

export default function Bai14() {
  const [page, setPage] = useState(1);

  const limit = 3;

  const result: ApiResponse<Product> = getProducts(page, limit);

  const totalPages = Math.ceil(result.total / limit);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Danh sách sản phẩm
      </Text>

      <Text style={styles.info}>
        Trang {result.page} / {totalPages}
      </Text>

      <FlatList
        data={result.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.price}>
              Giá: ${item.price}
            </Text>
          </View>
        )}
      />

      <View style={styles.pagination}>
        <TouchableOpacity
          style={[
            styles.button,
            page === 1 && styles.disabled,
          ]}
          disabled={page === 1}
          onPress={() => setPage(page - 1)}
        >
          <Text style={styles.buttonText}>
            Trước
          </Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          {page}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            page === totalPages && styles.disabled,
          ]}
          disabled={page === totalPages}
          onPress={() => setPage(page + 1)}
        >
          <Text style={styles.buttonText}>
            Sau
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
  },

  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
    marginBottom: 10,
  },

  info: {
    textAlign: "center",
    marginBottom: 15,
    color: "#666",
  },

  item: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  disabled: {
    backgroundColor: "#aaa",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  pageText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 25,
  },
});
