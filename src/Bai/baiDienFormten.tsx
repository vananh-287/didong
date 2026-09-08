import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

export default function BaiDienForm() {
  // Lưu họ tên
  const [fullName, setFullName] = useState('');

  // Lưu tuổi
  const [age, setAge] = useState('');

  // Hàm xóa toàn bộ dữ liệu
  const clearData = () => {
    setFullName('');
    setAge('');
  };

  return (
    <View style={styles.container}>

      {/* Tiêu đề */}
      <Text style={styles.title}>
        Form nhập họ tên
      </Text>

      {/* Ô nhập họ tên */}
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nhập họ tên"
        placeholderTextColor="#888"
      />

      {/* Lời chào */}
      <Text style={styles.greeting}>
        {fullName
          ? `Xin chào, ${fullName}!`
          : 'Vui lòng nhập họ tên'}
      </Text>

      {/* Ô nhập tuổi */}
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Nhập tuổi"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      {/* Thông báo nếu dưới 18 tuổi */}
      {age !== '' && Number(age) < 18 && (
        <Text style={styles.warning}>
          Bạn chưa đủ 18 tuổi
        </Text>
      )}

      {/* Nút xóa */}
      <Button
        title="XÓA DỮ LIỆU"
        onPress={clearData}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  // Màn hình chính
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  // Tiêu đề
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },

  // Ô nhập
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    color: '#000',
    backgroundColor: '#fff',
  },

  // Lời chào
  greeting: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
  },

  // Cảnh báo
  warning: {
    fontSize: 16,
    marginBottom: 20,
    color: 'red',
  },
});