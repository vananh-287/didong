import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { colors } from '../theme';

export default function EmptyState({ icon = 'search-outline', title, message, actionLabel, onAction }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={36} color={colors.indigo} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel ? <Button title={actionLabel} onPress={onAction} variant="outline" style={styles.btn} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.indigoLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: { fontSize: 17, fontWeight: '700', color: colors.text, textAlign: 'center' },
  message: { fontSize: 14, color: colors.muted, textAlign: 'center', marginTop: 6 },
  btn: { marginTop: 16, minWidth: 160 },
});
