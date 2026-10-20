import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useAuth from '../hooks/useAuth';
import { formatPrice } from '../utils/format';
import { colors, shadow } from '../theme';

// Khung tối giản (hoàn thiện form địa chỉ + đặt hàng ở Tuần 9).
// Màn này được BẢO VỆ: chưa đăng nhập → sang Login, đăng nhập xong quay lại đúng Checkout.
export default function CheckoutScreen({ navigation, route }) {
  const { isLoggedIn } = useAuth();
  const total = route.params?.total ?? 0;

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace('Login', {
        redirectTo: { name: 'Checkout', params: route.params },
      });
    }
  }, [isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isLoggedIn) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Tổng tiền thanh toán</Text>
        <Text style={styles.total}>{formatPrice(total)}</Text>
      </View>
      <Text style={styles.note}>Form địa chỉ giao hàng và phương thức thanh toán sẽ hoàn thiện ở Tuần 9.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.bg },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', ...shadow },
  label: { fontSize: 14, color: colors.muted },
  total: { fontSize: 30, fontWeight: '800', color: colors.indigo, marginTop: 6 },
  note: { marginTop: 16, textAlign: 'center', color: colors.muted, fontSize: 13 },
});
