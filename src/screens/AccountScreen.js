import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import useAuth from '../hooks/useAuth';
import { colors, shadow } from '../theme';

export default function AccountScreen({ navigation }) {
  const { user, isLoggedIn, logout } = useAuth();

  const confirmLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đăng xuất', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Tài khoản" />

      {!isLoggedIn ? (
        <View style={{ flex: 1 }}>
          <EmptyState
            icon="person-outline"
            title="Bạn chưa đăng nhập"
            message="Đăng nhập để thanh toán, đánh giá và theo dõi đơn hàng."
          />
          <View style={styles.actions}>
            <Button title="Đăng nhập" onPress={() => navigation.navigate('Login')} />
            <Button title="Đăng ký" variant="outline" onPress={() => navigation.navigate('Register')} />
          </View>
        </View>
      ) : (
        <View style={{ padding: 16 }}>
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{(user?.name || '?').trim().charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            {user?.phone ? <Text style={styles.email}>{user.phone}</Text> : null}
          </View>
          <Button title="Đăng xuất" variant="outline" onPress={confirmLogout} style={{ marginTop: 20 }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  actions: { padding: 16, gap: 10 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', ...shadow },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.indigo,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 30, fontWeight: '800' },
  name: { fontSize: 18, fontWeight: '800', color: colors.text },
  email: { fontSize: 14, color: colors.muted, marginTop: 2 },
});
