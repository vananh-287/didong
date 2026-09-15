import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type Post = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Bai9() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data as Post[]);
      })
      .catch((error) => {
        console.log("Lỗi:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách tin tức</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.id}>ID: {item.id}</Text>

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.status}>
              Trạng thái:{" "}
              {item.completed
                ? "Đã hoàn thành"
                : "Chưa hoàn thành"}
            </Text>
          </View>
        )}
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
    textAlign: "center",
    marginBottom: 20,
    color: "blue",
  },

  item: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  id: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },

  title: {
    fontSize: 17,
    fontWeight: "500",
    color: "#222",
  },

  status: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
