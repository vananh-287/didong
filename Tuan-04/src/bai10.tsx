import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export default function Bai10() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((data) => {
        setUser(data as User);
      })
      .catch((error) => {
        console.log("Lỗi:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.card}>
          <Text style={styles.title}>Thông tin người dùng</Text>

          <Text style={styles.text}>
            ID: {user?.id}
          </Text>

          <Text style={styles.text}>
            Họ tên: {user?.name}
          </Text>

          <Text style={styles.text}>
            Username: {user?.username}
          </Text>

          <Text style={styles.text}>
            Email: {user?.email}
          </Text>

          <Text style={styles.text}>
            Điện thoại: {user?.phone}
          </Text>

          <Text style={styles.text}>
            Website: {user?.website}
          </Text>
        </View>
      )}
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

  card: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 20,
    textAlign: "center",
  },

  text: {
    fontSize: 17,
    marginBottom: 12,
    color: "#333",
  },
});
