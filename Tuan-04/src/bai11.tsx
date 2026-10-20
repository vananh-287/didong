import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const fetchProducts = async (
  keyword: string,
  limit: number
): Promise<Product[]> => {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`
  );

  const data = await response.json();

  return data.products as Product[];
};

export default function Bai11() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setProducts([]);
      return;
    }

    try {
      const data = await fetchProducts(keyword, 10);
      setProducts(data);
    } catch (error) {
      console.log("Lỗi:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tìm kiếm sản phẩm</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên sản phẩm..."
          value={keyword}
          onChangeText={setKeyword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSearch}
        >
          <Text style={styles.buttonText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.price}>
              Giá: ${item.price}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Chưa có sản phẩm
          </Text>
        }
      />
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
    marginBottom: 20,
  },

  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  item: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  price: {
    fontSize: 16,
    color: "green",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#555",
  },

  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
  },
});
