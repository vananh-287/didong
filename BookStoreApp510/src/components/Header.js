import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function Header({ title = 'BookStore', onSearchPress, searchActive, searchDisabled }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <Text style={styles.title}>{title}</Text>
      {onSearchPress ? (
        <Pressable
          onPress={onSearchPress}
          disabled={searchDisabled}
          hitSlop={10}
          style={[styles.iconBtn, searchActive && styles.iconBtnActive, searchDisabled && { opacity: 0.4 }]}
        >
          <Ionicons name={searchActive ? 'close' : 'search'} size={20} color="#fff" />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.navy,
    paddingHorizontal: 16,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: 0.3 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnActive: { backgroundColor: colors.indigo },
});
