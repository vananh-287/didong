import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

type CustomError = {
  message: string;
  status?: number;
};

export default function Bai12() {
  const handleRequest = async () => {
    try {
      // Cố tình dùng URL sai để tạo lỗi
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/abcxyz"
      );

      if (!response.ok) {
        throw {
          message: "Không thể lấy dữ liệu từ API",
          status: response.status,
        };
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      const customError = error as CustomError;

      Alert.alert(
        "Lỗi API",
        `Mã lỗi: ${customError.status ?? "Không xác định"}\n${
          customError.message
        }`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài tập 12</Text>

      <Text style={styles.subtitle}>
        Xử lý lỗi API
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRequest}
      >
        <Text style={styles.buttonText}>
          Gọi API
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "red",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
