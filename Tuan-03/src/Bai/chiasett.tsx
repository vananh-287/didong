import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

// 1. Tạo UserContext
const UserContext = createContext<any>(null);

// 2. Component ProfileScreen
function ProfileScreen() {
  // 3. Lấy dữ liệu từ Context
  const user = useContext(UserContext);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Nếu đã đăng xuất
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.logoutText}>
          Bạn đã đăng xuất
        </Text>

        <Button
          title="Đăng nhập lại"
          onPress={() => setIsLoggedIn(true)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Trang cá nhân
      </Text>

      {/* 4. Hiển thị tên */}
      <Text style={styles.greeting}>
        Xin chào, {user.name}
      </Text>

      {/* Email */}
      <Text style={styles.info}>
        Email: {user.email}
      </Text>

      {/* 5. Nút đăng xuất */}
      <Button
        title="Đăng xuất"
        onPress={() => setIsLoggedIn(false)}
      />

    </View>
  );
}

// Component App
export default function BaiThongTinNguoiDung() {
  // Thông tin người dùng
  const [user, setUser] = useState({
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@gmail.com',
  });

  return (
    // 6. Cung cấp dữ liệu cho component con
    <UserContext.Provider value={user}>
      <ProfileScreen />
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },

  greeting: {
    fontSize: 22,
    color: '#000000',
    marginBottom: 15,
  },

  info: {
    fontSize: 18,
    color: '#555555',
    marginBottom: 25,
  },

  logoutText: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 20,
  },
});