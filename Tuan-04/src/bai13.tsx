import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

// Generic function
function filterByName<T extends { name: string }>(
  data: T[],
  keyword: string
): T[] {
  return data.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );
}

type User = {
  id: number;
  name: string;
  email: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

const users: User[] = [
  {
    id: 1,
    name: "Nguyen Van An",
    email: "an@gmail.com",
  },
  {
    id: 2,
    name: "Tran Thi Binh",
    email: "binh@gmail.com",
  },
  {
    id: 3,
    name: "Nguyen Thi Lan",
    email: "lan@gmail.com",
  },
  {
    id: 4,
    name: "Le Van Nam",
    email: "nam@gmail.com",
  },
];

export default function Bai13() {
  const [keyword, setKeyword] = useState("");

  const filteredUsers = filterByName(users, keyword);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bộ lọc danh sách</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tên cần tìm..."
        value={keyword}
        onChangeText={setKeyword}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Không tìm thấy dữ liệu
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

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
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

  email: {
    marginTop: 5,
    color: "#666",
  },

  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
  },
});
