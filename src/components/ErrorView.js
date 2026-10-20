import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { colors } from '../theme';

export default function ErrorView({ message, onRetry }) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="cloud-offline-outline" size={48} color={colors.danger} />
      <Text style={styles.title}>Đã có lỗi xảy ra</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? <Button title="Thử lại" onPress={onRetry} style={styles.btn} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  title: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 12 },
  message: { fontSize: 14, color: colors.muted, textAlign: 'center', marginTop: 6 },
  btn: { marginTop: 16, minWidth: 140 },
});
